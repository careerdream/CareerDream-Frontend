import fs from 'fs';

let code = fs.readFileSync('routes/auth.js', 'utf8');

// 1. Add express-validator import
if (!code.includes('express-validator')) {
  code = code.replace("import express from 'express';", "import express from 'express';\nimport { body, validationResult } from 'express-validator';");
}

// 2. Helper to send cookie
const cookieHelper = `
function setAuthCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
}
`;
if (!code.includes('function setAuthCookie')) {
  code = code.replace('function generateToken(userId, rememberMe = false) {', cookieHelper + '\nfunction generateToken(userId, rememberMe = false) {');
}

// 3. Replace Register
const registerRegex = /\/\/ ──────────────────────────────────────────────\r?\n\/\/ REGISTER\r?\n\/\/ ──────────────────────────────────────────────\r?\nrouter\.post\('\/register', async \(req, res\) => \{[\s\S]*?\}\);/m;

const newRegister = `// ──────────────────────────────────────────────
// REGISTER
// ──────────────────────────────────────────────
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('email').trim().isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().matches(/^\\+?[1-9]\\d{1,14}$/).withMessage('Invalid phone number format')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: 'validation_error', errors: errors.array() });

  try {
    const { name, email, password, phone } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'email_exists', message: 'This email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const emailOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, phone, emailOtp, emailOtpExpiry, isEmailVerified: false },
    });

    // Send OTP Email
    try {
      await transporter.sendMail({
        from: \`"CareerDream" <\${process.env.SMTP_USER || 'noreply@careerdream.in'}>\`,
        to: email,
        subject: 'Verify your CareerDream Account',
        html: \`<p>Your verification OTP is: <strong>\${emailOtp}</strong></p><p>It expires in 10 minutes.</p>\`
      });
      console.log(\`OTP for \${email} is \${emailOtp}\`);
    } catch (e) {
      console.error('Email send error:', e);
    }

    res.status(201).json({
      message: 'Registration successful. Please verify your email with the OTP sent.',
      userId: user.id,
      requiresVerification: true
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'server_error', message: 'Unable to create account.' });
  }
});`;

code = code.replace(registerRegex, newRegister);

// 4. Replace Login
const loginRegex = /\/\/ ──────────────────────────────────────────────\r?\n\/\/ LOGIN\r?\n\/\/ ──────────────────────────────────────────────\r?\nrouter\.post\('\/login', async \(req, res\) => \{[\s\S]*?\}\);/m;

const newLogin = `// ──────────────────────────────────────────────
// LOGIN
// ──────────────────────────────────────────────
router.post('/login', [
  body('email').trim().isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: 'validation_error', errors: errors.array() });

  try {
    const { email, password, rememberMe } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) return res.status(401).json({ error: 'invalid_credentials', message: 'Invalid credentials.' });
    if (!user.isEmailVerified) return res.status(403).json({ error: 'unverified', message: 'Please verify your email first.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'invalid_credentials', message: 'Invalid credentials.' });

    if (user.mfaEnabled) {
      const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
      await prisma.user.update({
        where: { id: user.id },
        data: { emailOtp, emailOtpExpiry: new Date(Date.now() + 10 * 60 * 1000) }
      });
      try {
        await transporter.sendMail({
          from: \`"CareerDream" <\${process.env.SMTP_USER || 'noreply@careerdream.in'}>\`,
          to: email,
          subject: 'Your Login OTP',
          html: \`<p>Your login OTP is: <strong>\${emailOtp}</strong></p>\`
        });
        console.log(\`MFA OTP for \${email} is \${emailOtp}\`);
      } catch (e) { console.error('MFA Email error:', e); }

      return res.json({ mfaRequired: true, userId: user.id, message: 'MFA OTP sent to email.' });
    }

    const token = generateToken(user.id, !!rememberMe);
    setAuthCookie(res, token);
    await prisma.user.update({ where: { id: user.id }, data: { updatedAt: new Date() } });

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, token }); // Token returned for backward compatibility if needed, but cookie is set
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'server_error', message: 'Unable to log in.' });
  }
});`;

code = code.replace(loginRegex, newLogin);

// 5. Add new endpoints at the end before export default router
const newEndpoints = `
// ──────────────────────────────────────────────
// VERIFY EMAIL OTP
// ──────────────────────────────────────────────
router.post('/verify-email', [
  body('email').isEmail(),
  body('otp').isLength({ min: 6, max: 6 })
], async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'not_found' });
    if (user.isEmailVerified) return res.status(400).json({ message: 'Already verified' });
    if (user.emailOtp !== otp || new Date() > user.emailOtpExpiry) {
      return res.status(400).json({ error: 'invalid_otp', message: 'Invalid or expired OTP' });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { isEmailVerified: true, emailOtp: null, emailOtpExpiry: null }
    });
    // Auto login after verification
    const token = generateToken(user.id);
    setAuthCookie(res, token);
    res.json({ message: 'Email verified successfully.', token });
  } catch (e) { res.status(500).json({ error: 'server_error' }); }
});

// ──────────────────────────────────────────────
// MFA LOGIN
// ──────────────────────────────────────────────
router.post('/login/mfa', [
  body('email').isEmail(),
  body('otp').isLength({ min: 6, max: 6 })
], async (req, res) => {
  try {
    const { email, otp, rememberMe } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'not_found' });
    if (user.emailOtp !== otp || new Date() > user.emailOtpExpiry) {
      return res.status(400).json({ error: 'invalid_otp', message: 'Invalid or expired OTP' });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { emailOtp: null, emailOtpExpiry: null, updatedAt: new Date() }
    });
    const token = generateToken(user.id, !!rememberMe);
    setAuthCookie(res, token);
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, token });
  } catch (e) { res.status(500).json({ error: 'server_error' }); }
});

// ──────────────────────────────────────────────
// LOGOUT
// ──────────────────────────────────────────────
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

`;

code = code.replace('export default router;', newEndpoints + '\nexport default router;');

fs.writeFileSync('routes/auth.js', code);
console.log('Successfully patched routes/auth.js');

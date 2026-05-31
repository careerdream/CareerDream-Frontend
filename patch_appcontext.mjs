import fs from 'fs';

let code = fs.readFileSync('src/app/context/AppContext.tsx', 'utf8');

// 1. Update Context Type
code = code.replace(
  'login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;\n  signup: (name: string, email: string, password: string) => Promise<boolean>;',
  \`login: (email: string, password: string, rememberMe?: boolean) => Promise<any>;
  signup: (name: string, email: string, password: string) => Promise<any>;
  verifyEmail: (email: string, otp: string) => Promise<boolean>;
  verifyMfa: (email: string, otp: string, rememberMe?: boolean) => Promise<boolean>;\`
);

// 2. processAuthResponse token handling
code = code.replace(
  "localStorage.setItem('authToken', data.token);",
  "// No longer setting authToken in localStorage as HttpOnly cookies are used"
);

// 3. Update login implementation
const loginRegex = /const login = async \\(email: string, password: string, rememberMe = false\\): Promise<boolean> => \\{[\\s\\S]*?\\};/m;
const newLogin = \`const login = async (email: string, password: string, rememberMe = false): Promise<any> => {
    try {
      const data = await api.post('/auth/login', { email, password, rememberMe });
      if (data.mfaRequired || data.requiresVerification) return data;
      await processAuthResponse(data);
      return { success: true };
    } catch (error: any) {
      console.warn('Backend login failed', error);
      throw error;
    }
  };\`;
code = code.replace(loginRegex, newLogin);

// 4. Update signup implementation
const signupRegex = /const signup = async \\(name: string, email: string, password: string\\): Promise<boolean> => \\{[\\s\\S]*?\\};/m;
const newSignup = \`const signup = async (name: string, email: string, password: string): Promise<any> => {
    try {
      const data = await api.post('/auth/register', { name, email, password });
      if (data.requiresVerification) return data;
      await processAuthResponse(data);
      return { success: true };
    } catch (error: any) {
      throw error;
    }
  };\`;
code = code.replace(signupRegex, newSignup);

// 5. Add verifyEmail and verifyMfa
const forgotPasswordIndex = code.indexOf('const loginWithGoogle =');
const newMethods = \`
  const verifyEmail = async (email: string, otp: string): Promise<boolean> => {
    try {
      const data = await api.post('/auth/verify-email', { email, otp });
      await processAuthResponse(data);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const verifyMfa = async (email: string, otp: string, rememberMe = false): Promise<boolean> => {
    try {
      const data = await api.post('/auth/login/mfa', { email, otp, rememberMe });
      await processAuthResponse(data);
      return true;
    } catch (error) {
      throw error;
    }
  };

\`;
code = code.slice(0, forgotPasswordIndex) + newMethods + code.slice(forgotPasswordIndex);

// 6. Update logout implementation to hit backend
const logoutRegex = /const logout = \\(\\) => \\{[\\s\\S]*?\\};/m;
const newLogout = \`const logout = async () => {
    try { await api.post('/auth/logout', {}); } catch(e) {}
    localStorage.removeItem('careerdream-state');
    setState({ ...DEFAULT_STATE, isLoading: false });
    window.location.href = '/';
  };\`;
code = code.replace(logoutRegex, newLogout);

// 7. Expose verifyEmail and verifyMfa in Provider return value
code = code.replace(
  'loginWithGoogle,\n      loginWithGitHub',
  'loginWithGoogle,\n      loginWithGitHub,\n      verifyEmail,\n      verifyMfa'
);

fs.writeFileSync('src/app/context/AppContext.tsx', code);
console.log('Successfully patched src/app/context/AppContext.tsx');

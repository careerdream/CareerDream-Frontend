import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

let transporter;

async function createTransporter() {
  if (transporter) return transporter;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT == '465' || process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    let testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log("Created Ethereal test email account for development.");
  }
  
  return transporter;
}

export const sendThankYouEmail = async (email) => {
  try {
    const t = await createTransporter();
    
    // Point Unsubscribe to the FRONTEND React app
    const unsubscribeUrl = `${process.env.FRONTEND_URL || 'https://careerdream.in'}/unsubscribe?email=${encodeURIComponent(email)}`;
    
    const welcomeHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@300;400;600&display=swap" rel="stylesheet">
<style>
  body{font-family:'Roboto',Helvetica,Arial,sans-serif;background:#f4f4f5;margin:0;padding:0;}
  .container{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.05);}
  .header{background:linear-gradient(135deg,#3b82f6,#06b6d4);padding:40px 30px;text-align:center;}
  .logo-box{display:inline-block;width:80px;height:80px;border-radius:20px;background:rgba(255,255,255,0.2);text-align:center;line-height:80px;margin-bottom:16px;box-shadow:0 4px 10px rgba(0,0,0,0.15);}
  .logo-text{color:#fff;font-weight:bold;font-size:32px;font-family:'Montserrat',sans-serif;}
  .brand{color:#fff;font-size:34px;font-weight:bold;margin:0;letter-spacing:-0.5px;font-family:'Montserrat',sans-serif;}
  .content{padding:40px 30px;}
  .title{font-size:22px;font-weight:bold;color:#111827;margin-bottom:12px;font-family:'Montserrat',sans-serif;}
  .subtitle{color:#4b5563;font-size:15px;line-height:1.6;margin-bottom:32px;}
  .features{background:#f9fafb;border-radius:12px;padding:24px;margin-bottom:32px;}
  .feature{display:flex;align-items:flex-start;gap:12px;margin-bottom:16px;}
  .feature:last-child{margin-bottom:0;}
  .feature-icon{width:40px;height:40px;border-radius:12px;text-align:center;line-height:40px;flex-shrink:0;}
  .feature-text h4{margin:0 0 4px;font-size:14px;font-weight:bold;color:#111827;}
  .feature-text p{margin:0;font-size:13px;color:#6b7280;}
  .cta-btn{display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#3b82f6,#06b6d4);color:#fff;text-decoration:none;border-radius:10px;font-weight:bold;font-size:15px;}
  .footer{background:#f3f4f6;padding:24px 30px;text-align:center;border-top:1px solid #e5e7eb;}
  .footer-text{font-size:12px;color:#9ca3af;font-weight:300;}
</style></head><body>
<div style="background:#f4f4f5;padding:24px 0;">
  <div class="container">
    <div class="header">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center">
            <div class="logo-box" style="margin-bottom:0; display:inline-block; vertical-align:middle; margin-right:15px;"><span class="logo-text">CD</span></div>
            <p class="brand" style="display:inline-block; vertical-align:middle; margin:0;">CareerDream</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="content">
      <h2 class="title">You're on the list!</h2>
      <p class="subtitle">Welcome to the CareerDream newsletter. You'll be the first to know about exciting updates from India's fastest-growing IT career platform.</p>
      <div class="features">
        <div class="feature">
          <div class="feature-icon" style="background:#ecfdf5;"><img src="https://cdn-icons-png.flaticon.com/512/1043/1043305.png" alt="Blog" width="20" height="20" style="vertical-align:middle;border:none;" /></div>
          <div class="feature-text">
            <h4>Blog &amp; Articles</h4>
            <p>Expert career advice, IT industry insights, and how-to guides delivered to your inbox.</p>
          </div>
        </div>
        <div class="feature">
          <div class="feature-icon" style="background:#eff6ff;"><img src="https://cdn-icons-png.flaticon.com/512/2910/2910791.png" alt="Jobs" width="20" height="20" style="vertical-align:middle;border:none;" /></div>
          <div class="feature-text">
            <h4>New Job Alerts</h4>
            <p>Be the first to know about top remote, government, and global IT job opportunities.</p>
          </div>
        </div>
        <div class="feature">
          <div class="feature-icon" style="background:#faf5ff;"><img src="https://cdn-icons-png.flaticon.com/512/3362/3362095.png" alt="Courses" width="20" height="20" style="vertical-align:middle;border:none;" /></div>
          <div class="feature-text">
            <h4>New Courses</h4>
            <p>Get notified when new AI/ML, Cloud, Full Stack, and DevOps courses go live.</p>
          </div>
        </div>
      </div>
      <div style="text-align:center;margin-bottom:32px;">
        <a href="https://careerdream.in" class="cta-btn">Explore CareerDream</a>
      </div>
    </div>
    <div class="footer">
      <p class="footer-text" style="margin-bottom:20px;">If you have any questions, contact : <a href="mailto:info@careerdream.in" style="color:#3b82f6;text-decoration:none;">info@careerdream.in</a></p>
      <div style="border-top:1px solid #e5e7eb; margin:20px 0;"></div>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:0 8px;">
                  <a href="https://whatsapp.com/channel/0029VbCUhAq2kNFsL5vFwE1N" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <td style="padding:0 8px;">
                  <a href="mailto:info@careerdream.in" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://www.instagram.com/careerdream.in/" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://t.me/careerdream365" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png" alt="Telegram" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://www.facebook.com/profile.php?id=61572023950143" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://x.com/CDream85874" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://youtube.com/@careerdream365" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://linkedin.com/company/careerdream.in" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <p class="footer-text" style="margin-top:24px;">You subscribed with <strong>${email}</strong>.</p>
      <p class="footer-text" style="margin-top:8px;">
        <a href="${unsubscribeUrl}" style="color:#3b82f6;text-decoration:none;font-weight:400;">Unsubscribe from CareerDream updates</a>
      </p>
      <p class="footer-text" style="margin-top:8px;">© ${new Date().getFullYear()} CareerDream. All rights reserved.</p>
    </div>
  </div>
</div>
</body></html>`;
    
    let info = await t.sendMail({
      from: '"CareerDream" <noreply@careerdream.in>',
      to: email,
      subject: "You're on the list!",
      text: `You're on the list!\n\nWelcome to the CareerDream newsletter. You'll be the first to know about exciting updates from India's fastest-growing IT career platform.\n\nUnsubscribe: ${unsubscribeUrl}`,
      html: welcomeHtml,
    });

    console.log("Thank You email sent: %s", info.messageId);
    if (!process.env.SMTP_HOST) {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  } catch (error) {
    console.error("Error sending thank you email:", error);
  }
};

export const notifySubscribers = async (articleTitle, articleLink, articleExcerpt) => {
  try {
    const t = await createTransporter();
    const subscribers = await prisma.subscriber.findMany();
    
    if (!subscribers || subscribers.length === 0) return;

    let successCount = 0;
    const emailSubject = `New Article Published: ${articleTitle}`;

    for (const s of subscribers) {
      try {
        const unsubscribeUrl = `${process.env.FRONTEND_URL || 'https://careerdream.in'}/unsubscribe?email=${encodeURIComponent(s.email)}`;
        const notificationHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailSubject}</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Roboto', 'Open Sans', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #0078D7, #00A2ED); color: #ffffff; text-align: center; padding: 30px 20px; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; font-family: 'Montserrat', sans-serif; }
    .content { padding: 30px 40px; color: #333333; line-height: 1.6; font-weight: 400; }
    .content h2 { font-size: 18px; font-weight: 600; margin-bottom: 10px; }
    .content p { font-size: 15px; margin: 8px 0; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #777777; background-color: #f9f9f9; font-weight: 300; }
    .footer a { color: #0078D7; text-decoration: none; }
    .social-icons img { width: 24px; margin: 0 6px; vertical-align: middle; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>New Article Published!</h1>
    </div>
    <div class="content">
      <h2>Hi There,</h2>
      <p>We just published a new article that you might be interested in.</p>
      <p style="margin-top:20px;">
        Latest Article: <strong>${articleTitle}</strong>
      </p>
      <p>${articleExcerpt}</p>
      <p style="text-align:center; margin-top:20px;">
        <a href="${articleLink}" style="display:inline-block; background:#0078D7; color:#fff; padding:10px 20px; text-decoration:none; border-radius:4px; font-weight:600;">Read Full Article</a>
      </p>
    </div>
    <div class="footer">
      <div class="social-icons">
        <a href="https://www.facebook.com/profile.php?id=61572023950143"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook"></a>
        <a href="https://x.com/CDream85874"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter"></a>
        <a href="https://linkedin.com/company/careerdream.in"><img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn"></a>
      </div>
      <p style="margin-top:15px;">You are receiving this email because you subscribed to our newsletter.</p>
      <a href="${unsubscribeUrl}">Unsubscribe</a>
    </div>
  </div>
</body>
</html>`;
        
        await t.sendMail({
          from: '"CareerDream Updates" <news@careerdream.in>',
          to: s.email,
          subject: emailSubject,
          text: `We just published a new article: ${articleTitle}\n\n${articleExcerpt}\n\nRead it here: ${articleLink}\n\nUnsubscribe: ${unsubscribeUrl}`,
          html: notificationHtml,
        });
        successCount++;
      } catch (err) {
        console.error("Failed to notify subscriber:", s.email, err.message);
      }
    }

    console.log("Notification email sent to %d subscribers.", successCount);
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
};

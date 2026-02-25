export const getFeedbackConfirmationEmail = (name: string, message: string, rating: number) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const year = new Date().getFullYear();
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Feedback Received</title>
  <style>
    body { margin: 0; padding: 0; background-color: #000000; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #e5e5e5; -webkit-font-smoothing: antialiased; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #000000; padding-bottom: 60px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid #222222; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
    .header { text-align: center; padding: 40px 0; background-color: #0f0f0f; border-bottom: 1px solid #222; background-image: linear-gradient(to bottom, #151515, #0f0f0f); }
    .logo { font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: 3px; text-transform: uppercase; text-decoration: none; }
    .logo span { color: #10b981; }
    .content { padding: 40px 30px; }
    .greeting { font-size: 22px; font-weight: 400; color: #ffffff; margin-bottom: 24px; }
    .text-body { font-size: 16px; line-height: 1.7; color: #a3a3a3; margin-bottom: 24px; }
    .message-card { background-color: #111111; border: 1px solid #262626; border-radius: 12px; padding: 30px; margin: 30px 0; text-align: left; }
    .rating-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #525252; margin-bottom: 10px; font-weight: 700; }
    .stars { color: #10b981; font-size: 20px; letter-spacing: 2px; margin-bottom: 15px; }
    .user-quote { font-family: 'Unknown', serif; font-size: 16px; color: #d4d4d4; font-style: italic; border-left: 3px solid #10b981; padding-left: 15px; margin: 0; line-height: 1.6; }
    .button-container { text-align: center; margin-top: 40px; }
    .button { background-color: #ffffff; color: #000000; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; transition: all 0.3s ease; display: inline-block; }
    .footer { text-align: center; padding: 30px 20px; background-color: #050505; border-top: 1px solid #1a1a1a; }
    .footer-text { font-size: 12px; color: #525252; line-height: 1.5; margin: 5px 0; }
    .footer-link { color: #525252; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="wrapper">
    <br/>
    <div class="container">
      <div class="header">
        <div class="logo">Earth<span>Scape</span></div>
      </div>
      <div class="content">
        <h1 class="greeting">Hi ${name},</h1>
        <p class="text-body">
          We received your feedback! Thank you for helping us improve our planetary intelligence platform.
        </p>
        
        <div class="message-card">
          <div class="rating-label">Your Rating</div>
          <div class="stars">${stars}</div>
          <div class="rating-label" style="margin-top: 20px;">Your Message</div>
          <p class="user-quote">"${message}"</p>
        </div>

        <p class="text-body">
          Your insights have been securely transmitted to our team for review. We appreciate your contribution to the EarthScape community.
        </p>

        <div class="button-container">
          <a href="${appUrl}" class="button">Return to Dashboard</a>
        </div>
      </div>
      <div class="footer">
        <p class="footer-text">&copy; ${year} EarthScape Climate Prediction.</p>
        <p class="footer-text">Planetary Intelligence for a Sustainable Future.</p>
        <p class="footer-text">
            <a href="${appUrl}" class="footer-link">Unsubscribe</a> &bull; <a href="${appUrl}/privacy" class="footer-link">Privacy Policy</a>
        </p>
      </div>
    </div>
  </div>
</body>
    `;
};

export const getAdminAlertEmail = (message: string, priority: string) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const year = new Date().getFullYear();

  let priorityColor = "#10b981"; // Low - Emerald
  let priorityLabel = "Update";

  if (priority === "high") {
    priorityColor = "#ef4444"; // High - Red
    priorityLabel = "Urgent Alert";
  } else if (priority === "medium") {
    priorityColor = "#f59e0b"; // Medium - Amber
    priorityLabel = "Important Notice";
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${priorityLabel}: EarthScape System Message</title>
  <style>
    body { margin: 0; padding: 0; background-color: #000000; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #e5e5e5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid #222; border-radius: 16px; overflow: hidden; }
    .header { padding: 40px 0; text-align: center; background-color: #0f0f0f; border-bottom: 2px solid ${priorityColor}; }
    .logo { font-size: 24px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 2px; }
    .badge { display: inline-block; padding: 6px 12px; border-radius: 4px; background-color: ${priorityColor}20; color: ${priorityColor}; border: 1px solid ${priorityColor}40; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 15px; }
    .content { padding: 40px 30px; }
    .message-box { background-color: #111; border: 1px solid #262626; border-left: 4px solid ${priorityColor}; border-radius: 8px; padding: 25px; margin: 20px 0; line-height: 1.6; color: #d4d4d4; }
    .footer { text-align: center; padding: 30px; background-color: #050505; color: #525252; font-size: 12px; }
  </style>
</head>
<body>
  <br/>
  <div class="container">
    <div class="header">
      <div class="logo">Earth<span>Scape</span></div>
      <div class="badge">${priorityLabel}</div>
    </div>
    <div class="content">
      <h2 style="color: #fff; margin-top: 0;">System Notification</h2>
      <p style="color: #a3a3a3;">You have a new message from the platform administrators.</p>
      
      <div class="message-box">
        "${message}"
      </div>
      
      <p style="color: #a3a3a3; font-size: 14px;">
        Please log in to your dashboard for more details if required.
      </p>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="${appUrl}" style="background-color: #fff; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 14px;">Open Dashboard</a>
      </div>
    </div>
    <div class="footer">
      &copy; ${year} EarthScape Climate Prediction.<br/>
      This is an automated system alert. Please do not reply.
    </div>
  </div>
  <br/>
</body>
</html>
    `;
};

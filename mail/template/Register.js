export default function registerEmail({ URL, email }) {
    return `
<!DOCTYPE html>
<html lang="en" style="margin:0; padding:0; background:#e9eff6;">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome Email</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 40px 0;
      background: #e9eff6;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <table
      align="center"
      width="600"
      cellpadding="0"
      cellspacing="0"
      style="
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
      "
    >
      <!-- Logo Section -->
      <tr>
        <td align="center" style="padding: 40px 0 20px 0; border-bottom: 1px solid #eee;">
          <img
            src="https://i.imgur.com/bWf8d54.png"
            alt="Logo"
            width="80"
            style="border-radius: 6px"
          />
        </td>
      </tr>

      <!-- Main Content -->
      <tr>
        <td style="padding: 40px 40px 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 28px; font-weight: bold; color: #1a1a1a;">
            Welcome to Acme Inc!
          </h2>

          <p
            style="
              margin: 16px 0;
              font-size: 16px;
              color: #555;
              line-height: 1.6;
            "
          >
            Thank you for joining our community. We're excited to have you on
            board and help you get started.
          </p>

          <p
            style="
              margin: 10px 0 20px;
              font-size: 16px;
              color: #555;
            "
          >
            Your account has been successfully created with the following email:
          </p>

          <!-- Email Display Box -->
          <div
            style="
              background: #e8f1ff;
              color: #1a73e8;
              padding: 14px;
              border-radius: 8px;
              font-size: 16px;
              font-weight: bold;
              margin: 10px auto 20px;
              width: 70%;
            "
          >
            ${email}
          </div>

          <!-- Button -->
          <a
            href="${URL}"
            style="
              display: inline-block;
              background: #1e6ffb;
              color: white;
              padding: 14px 24px;
              font-size: 16px;
              font-weight: bold;
              border-radius: 8px;
              text-decoration: none;
              margin-bottom: 30px;
            "
          >
            Log In to Your Account
          </a>
        </td>
      </tr>

      <!-- Footer Section -->
      <tr>
        <td
          style="
            text-align: center;
            padding: 30px 30px 40px;
            background: #fafafa;
            color: #888;
            font-size: 14px;
            border-top: 1px solid #eee;
          "
        >
          <p>If you have any questions, feel free to visit our <a href="#" style="color:#1e6ffb;">Support Center</a>.</p>

          <p style="margin-top: 20px;">
            Thanks,<br />
            <strong>The Acme Inc Team</strong>
          </p>

          <!-- Social Icons -->
          <p style="padding: 16px 0;">
            <a href="#"><img src="https://i.imgur.com/Qk6mC4L.png" width="26" /></a>
            <a href="#"><img src="https://i.imgur.com/miMsvuL.png" width="26" style="margin:0 10px" /></a>
            <a href="#"><img src="https://i.imgur.com/WN1zSxB.png" width="26" /></a>
          </p>

          <p style="font-size: 12px; color: #999; margin-top: 10px;">
            123 App Street, Suite 100, San Francisco, CA 94105
          </p>
          <p style="font-size: 12px; color: #999;">
            If you didn’t create this account, you can ignore this email.
            <a href="#" style="color:#1e6ffb;">Unsubscribe</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>

`

    
}
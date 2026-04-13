import { Router } from "express";
import * as Brevo from "@getbrevo/brevo";

const router = Router();

router.post("/notify", async (req, res) => {
  const { email, source } = req.body as { email?: string; source?: string };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "A valid email address is required." });
    return;
  }

  const apiKey = process.env["BREVO_API_KEY"];
  if (!apiKey) {
    res.status(500).json({ error: "Email service is not configured." });
    return;
  }

  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.subject = "You're on the Zyphix app waitlist! 🚀";
    sendSmtpEmail.sender = { name: "Zyphix", email: "app@zyphix.in" };
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.replyTo = { email: "app@zyphix.in", name: "Zyphix Team" };
    sendSmtpEmail.htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>You're on the Zyphix waitlist!</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#041A10 0%,#062210 100%);padding:36px 40px;text-align:center;">
            <div style="display:inline-flex;align-items:center;gap:10px;">
              <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#0DA366,#00D97E);display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;color:#fff;vertical-align:middle;">//</div>
              <span style="font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-0.04em;vertical-align:middle;">ZYPHI<span style="color:#34D399;">X</span></span>
            </div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#0DA366;letter-spacing:0.08em;text-transform:uppercase;">You're in! 🎉</p>
            <h1 style="margin:0 0 16px;font-size:28px;font-weight:900;color:#111827;line-height:1.15;letter-spacing:-0.03em;">The Zyphix app is coming<br/>to your phone.</h1>
            <p style="margin:0 0 28px;font-size:15px;color:#6b7280;line-height:1.7;">
              We'll ping you the moment the Zyphix app drops on <strong style="color:#111827;">iOS & Android</strong>. As an early registrant, you'll get an <strong style="color:#0DA366;">exclusive 50% off</strong> on your first order — app-only.
            </p>

            <!-- Perks -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0fdf4;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
              <tr><td>
                <p style="margin:0 0 14px;font-size:12px;font-weight:700;color:#065f46;letter-spacing:0.06em;text-transform:uppercase;">Your early-access perks</p>
                ${[
                  ['⚡', '30-min grocery delivery at kirana prices'],
                  ['🍱', 'Food from Jammu\'s best local dhabas'],
                  ['🏷️', 'App-exclusive deals — not on web'],
                  ['🎁', '50% OFF on your very first app order'],
                  ['🔔', 'Priority launch-day access'],
                ].map(([icon, text]) => `
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                  <span style="font-size:16px;">${icon}</span>
                  <span style="font-size:14px;color:#374151;">${text}</span>
                </div>`).join('')}
              </td></tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td align="center">
                <a href="https://zyphix.in" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#0DA366,#00D97E);color:#fff;font-size:15px;font-weight:800;text-decoration:none;border-radius:12px;letter-spacing:-0.01em;">
                  Visit Zyphix.in →
                </a>
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><div style="height:1px;background:#f3f4f6;"></div></td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">You're receiving this because you signed up for the Zyphix app waitlist.</p>
            <p style="margin:0;font-size:12px;color:#9ca3af;">© 2025 Zyphix · Jammu, J&K · <a href="mailto:app@zyphix.in" style="color:#0DA366;text-decoration:none;">app@zyphix.in</a></p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    `.trim();

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.json({ success: true, message: "You're on the list! Check your inbox." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    res.status(500).json({ error: message });
  }
});

export default router;

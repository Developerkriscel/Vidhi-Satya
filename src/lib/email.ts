import { Resend } from "resend";

interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceInterested?: string;
  department?: string;
  designation?: string;
}

export async function sendEnquiryNotification(enquiry: EnquiryPayload) {
  const to = process.env.NOTIFICATION_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  if (!to || !apiKey) return;

  const resend = new Resend(apiKey);

  const optionalRows = [
    enquiry.department &&
      `<tr><td style="padding:8px 12px;font-weight:600;color:#374151">Department</td><td style="padding:8px 12px">${enquiry.department}</td></tr>`,
    enquiry.designation &&
      `<tr><td style="padding:8px 12px;font-weight:600;color:#374151">Designation</td><td style="padding:8px 12px">${enquiry.designation}</td></tr>`,
  ]
    .filter(Boolean)
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0F172A;padding:20px 24px;border-radius:8px 8px 0 0">
        <h2 style="color:#ffffff;margin:0">New Enquiry Received</h2>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:24px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 12px;font-weight:600;color:#374151">Name</td><td style="padding:8px 12px">${enquiry.name}</td></tr>
          <tr style="background:#f9fafb"><td style="padding:8px 12px;font-weight:600;color:#374151">Email</td><td style="padding:8px 12px"><a href="mailto:${enquiry.email}">${enquiry.email}</a></td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;color:#374151">Phone</td><td style="padding:8px 12px"><a href="tel:${enquiry.phone}">${enquiry.phone}</a></td></tr>
          <tr style="background:#f9fafb"><td style="padding:8px 12px;font-weight:600;color:#374151">Service</td><td style="padding:8px 12px">${enquiry.serviceInterested || "General Advisory"}</td></tr>
          ${optionalRows}
          <tr><td style="padding:8px 12px;font-weight:600;color:#374151">Subject</td><td style="padding:8px 12px">${enquiry.subject}</td></tr>
          <tr style="background:#f9fafb"><td style="padding:8px 12px;font-weight:600;color:#374151;vertical-align:top">Message</td><td style="padding:8px 12px;white-space:pre-wrap">${enquiry.message}</td></tr>
        </table>
      </div>
      <p style="color:#9ca3af;font-size:12px;text-align:center;margin-top:16px">This is an automated notification from vidhisatya.com</p>
    </div>
  `;

  await resend.emails.send({
    from: process.env.RESEND_FROM || "Vidhi Satya <noreply@vidhisatya.com>",
    to,
    subject: `New Enquiry: ${enquiry.subject} — ${enquiry.name}`,
    html,
  });
}

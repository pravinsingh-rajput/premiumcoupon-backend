const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendNewVisitEmail = async (visitData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "🌍 New Website Visit",
      html: `
        <h2>New Website Visit Recorded</h2>
        <p><strong>IP Address:</strong> ${visitData.ipAddress}</p>
        <p><strong>Location:</strong> ${visitData.city}, ${visitData.region}, ${visitData.countryName}</p>
        <p><strong>Timezone:</strong> ${visitData.timezone}</p>
        <p><strong>ISP:</strong> ${visitData.organization}</p>
        <p><strong>Visit Count:</strong> ${visitData.visitCount}</p>
        <p><strong>First Visit:</strong> ${new Date(visitData.firstVisitedAt).toLocaleString()}</p>
        <hr>
        <p><em>Website Visit Tracker</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("New visit email sent");
  } catch (error) {
    console.error("Email send error:", error.message);
  }
};

const sendRevisitEmail = async (visitData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "🔄 Website Revisit",
      html: `
        <h2>Visitor Returned to Website</h2>
        <p><strong>IP Address:</strong> ${visitData.ipAddress}</p>
        <p><strong>Location:</strong> ${visitData.city}, ${visitData.region}, ${visitData.countryName}</p>
        <p><strong>Timezone:</strong> ${visitData.timezone}</p>
        <p><strong>ISP:</strong> ${visitData.organization}</p>
        <p><strong>Total Visits:</strong> ${visitData.visitCount}</p>
        <p><strong>First Visit:</strong> ${new Date(visitData.firstVisitedAt).toLocaleString()}</p>
        <p><strong>Last Visit:</strong> ${new Date(visitData.lastVisitedAt).toLocaleString()}</p>
        <hr>
        <p><em>Website Visit Tracker</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Revisit email sent");
  } catch (error) {
    console.error("Email send error:", error.message);
  }
};

module.exports = { sendNewVisitEmail, sendRevisitEmail };

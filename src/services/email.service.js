const axios = require("axios");

const sendEmail = async ({ to, subject, html }) => {
  try {
    const res = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: "projettekki221@gmail.com",
          name: "Blog App"
        },
        to: [{ email: to }],
        subject,
        htmlContent: html
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    return res.data;
  } catch (error) {
    console.error("Brevo error:", error.response?.data || error.message);
    throw new Error("Email not sent");
  }
};

module.exports = sendEmail;
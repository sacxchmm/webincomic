// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your_email@gmail.com",
      pass: "your_app_password"
    }
  });

  let mailOptions = {
    from: email,
    to: "your_email@gmail.com",
    subject: subject,
    text: `From: ${name} (${email})\n\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

const nodemailer = require("nodemailer");
const router = require("express").Router();
require("dotenv").config();

function createdNewAccount(email, displayName) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "oussamahassanisimplon@gmail.com",
      pass: process.env.GMAIL,
    },
  });

  const mailOptions = {
    from: "oussamahassanisimplon@gmail.com", // sender address
    to: "oussamahassanisimplon@gmail.com", // list of receivers
    subject: "someone created new account!", // Subject line
    html: `Name: <b>${displayName}</b> <br>email: <b>${email}</b>`, // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

router.post("/contactUs", async (req, res) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "oussamahassanisimplon@gmail.com",
      pass: process.env.GMAIL,
    },
  });

  const mailOptions = {
    from: "oussamahassanisimplon@gmail.com",
    to: "oussamahassanisimplon@gmail.com",
    subject: "Suggestion/Message from someone!",
    html: `Name: <b>${name}</b> <br>
           Email: <b>${email}</b> <br>
          Message: ${message}`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    } else {
      console.log(info);
      res.json("submitted...");
    }
  });
});

module.exports = {
  router: router,
  sendEmail: createdNewAccount,
};

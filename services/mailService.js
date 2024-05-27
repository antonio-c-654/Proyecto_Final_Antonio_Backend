const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.MAIL_SENDER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const enviarMail = async (destinatario, asunto, mensaje) => {
    try {
      const info = await transporter.sendMail({
        from: process.env.MAIL_SENDER,
        to: destinatario,
        subject: asunto,
        text: mensaje,
      });
  
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error('Error al enviar correo:', error);
    }
};


module.exports = enviarMail;
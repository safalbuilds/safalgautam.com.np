import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API);

export const contact = async (req, res) => {
  const { name, email, message } = req.body;

  console.log(req.body);

  try {
    await resend.emails.send({
      from: "contact@safalgautam.com.np",
      to: "contact@safalgautam.com.np",
      subject: `New contact submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return res.status(200).send("Mail sent successfully");
  } catch (error) {
    console.error(error);

    return res.status(500).send("Error sending mail");
  }
};
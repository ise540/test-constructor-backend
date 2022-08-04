import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } from '../configs/mail';

class MailService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
      }
    });
  }
  async sendActivationMail(email: string, link: string) {
    await this.transporter.sendMail({
      from: SMTP_USER,
      to: email,
      subject: 'Активация аккаунта на ' + process.env.FRONTEND_URL, //ПОМЕНЯТЬ АДРЕС
      text: '',
      html: `<div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}"  style="background-color: gray; padding: 5px 10px; border-radius: 2px; text-decoration: none; color: white; cursor:pointer; font-size: 20px; border: 1px solid black">Активировать аккаунт</a> 
            </div>
            `
    });
  }

  async sendResetPasswordMail(email: string, link: string) {
    await this.transporter.sendMail({
      from: SMTP_USER,
      to: email,
      subject: 'Восстановление пароля на ' + process.env.FRONTEND_URL, //ПОМЕНЯТЬ АДРЕС
      text: '',
      html: `<div>
                <h1>Для восстановления пароля перейдите по ссылке</h1>
                <a href="${link}"  style="background-color: gray; padding: 5px 10px; border-radius: 2px; text-decoration: none; color: white; cursor:pointer; font-size: 20px; border: 1px solid black">Восстановить пароль</a>
            </div>
            `
    });
  }
}

export default new MailService();

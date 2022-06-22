import nodemailer from 'nodemailer'
import {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD} from '../configs/mail';

class MailService {
    transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port:SMTP_PORT,
            secure: true,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD
            }

        })
    }
    async sendActivationMail(email:string, link:string){
        await this.transporter.sendMail({
            from: SMTP_USER,
            to: email,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
            `<div>
                <h1>для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>
            `
        })
    }

    async sendResetPasswordMail(email:string) {
        
    }
}

export default new MailService();
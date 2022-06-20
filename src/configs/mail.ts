const SMTP_HOST = process.env.SMTP_HOST || 'smtp.mail.ru';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_USER = process.env.SMTP_USER || 'example@mail.ru';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || 'example_password';

export {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD}

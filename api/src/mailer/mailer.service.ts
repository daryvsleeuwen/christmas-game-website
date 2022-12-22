import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

@Injectable()
export class MailerService {
  transporter = null;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('MAILER_HOST'),
      port: this.config.get('MAILER_PORT'),
      secure: false,
      requireTLS: false,
      auth: {
        user: this.config.get('MAILER_USER'),
        pass: this.config.get('MAILER_PASSWORD'),
      },
      from: this.config.get('MAILER_FROM'),
    });
  }

  async send(subject: string, to: string, templateName: string, templateData?: {}) {
    try{
        const emailTemplateSource = fs.readFileSync(path.join(__dirname, '..', `/mails/${templateName}.hbs`)).toString()
        const template = handlebars.compile(emailTemplateSource)
        const html = template(templateData)
        
        const mail = await this.transporter.sendMail({
            from: `Het Kerstpel <${this.config.get('MAILER_FROM')}>`,
            to: to,
            subject: subject,
            text: subject,
            html: html
          });

          if(mail.response.includes('250 Ok')) return { message: 'The email is sent', success: true }
          return { message: 'Something went wrong while trying to send the email', success: false }
    }
    catch(error){
        return error
    }
  }
}
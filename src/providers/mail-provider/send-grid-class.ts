import { Injectable } from '@nestjs/common';
import MailerInterface from './send-grid-interface';
import { ConfigService } from '@nestjs/config';
const sgMail = require('@sendgrid/mail');

@Injectable()
export default class SendGridMailer implements MailerInterface {
  private sgMail: any;

  constructor(private readonly configService: ConfigService) {
    this.sgMail = sgMail;
    this.sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY')!);
  }

  async send(to: string, subject: string, body: string): Promise<void> {
    const options = {
      to,
      from: this.configService.get<string>('SENDGRID_FROM_EMAIL')!,
      subject,
      html: body,
    };

    try {
      return await this.sgMail.send(options);
    } catch (error) {
      console.error(error);
    }
  }
}

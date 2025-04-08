import Mailer from 'src/providers/mail-provider/send-grid-interface';
import BaseMailerInterface from './base-mail-interface';
import { Injectable } from '@nestjs/common';
import SendGridMailer from 'src/providers/mail-provider/send-grid-class';
import RenderTemplate from 'src/providers/render-templates/render-email-templates';

@Injectable()
export default class BaseMailer implements BaseMailerInterface {
  protected templateName: string = 'default';
  protected subject: string = 'Welcome';

  constructor(
    private readonly mailer: SendGridMailer,
    private readonly emailTemplateRenderer: RenderTemplate,
  ) {}

  async createTemplate(data: any): Promise<string> {
    return await this.emailTemplateRenderer.render(this.templateName, data);
  }

  async send(email: string, data: any): Promise<void> {
      const body = await this.createTemplate(data);
    return this.mailer.send(email, this.subject, body);
  }
}

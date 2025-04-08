import Email from 'email-templates';
import * as path from 'path';
import EmailTemplateRenderer from './render-template-interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class RenderTemplate implements EmailTemplateRenderer {
  async configure(): Promise<Email> {
    return Promise.resolve(
      new Email({
        views: {
          root: path.join(__dirname, '../../../views'), // Path to the templates folder
          options: {
            extension: 'pug', // We are using Pug files
          },
        },
      }),
    );
  }

  async render(template: string, data: any): Promise<string> {
    const config = await this.configure();
    return await config.render(template, { ...data });
  }
}

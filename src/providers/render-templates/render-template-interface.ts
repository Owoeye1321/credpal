import Email from 'email-templates';

export default interface EmailTemplateRenderer {
  configure(): Promise<Email>;
  render(template: string, data: any): Promise<string>;
}

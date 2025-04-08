export default interface BaseMailerInterface {
  createTemplate(data: any): Promise<string>;
  send(
    recipientEmail: string,
    data?: any,
    subject?: string,
    body?: string,
  ): Promise<void>;
}

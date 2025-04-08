import BaseMailer from './base-mailer-class';

export default class VerifyEmailMailer extends BaseMailer {
  protected templateName: string = 'verify-email';
}

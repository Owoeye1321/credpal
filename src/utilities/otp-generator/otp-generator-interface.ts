export default interface OTP {
  generate(params: string[]): { otp: string; hash: string };
  validate(otp: string, hash: string): boolean;
}

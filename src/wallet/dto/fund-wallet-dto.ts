import { IsEnum, IsNotEmpty } from 'class-validator';
export enum PrimaryCurrencies {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  NGN = 'NGN',
}
export class FundWalletDto {
  @IsNotEmpty()
  @IsEnum(PrimaryCurrencies)
  currency: string;

  @IsNotEmpty()
  amount: number;
}

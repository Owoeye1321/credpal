import { IsDecimal, IsNotEmpty } from 'class-validator';

export class TransactionDto {
  @IsNotEmpty()
  walletRef: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '0,4' })
  amount: number;

  @IsNotEmpty()
  reference: string;

  @IsNotEmpty()
  currency: string
}

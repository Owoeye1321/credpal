import { IsNotEmpty } from 'class-validator';

export class WalletDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  walletRef: string;

  @IsNotEmpty()
  balance: number;
}

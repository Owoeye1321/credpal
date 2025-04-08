import { IsNotEmpty } from 'class-validator';

export class FetchWalletDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  currency: string;
}

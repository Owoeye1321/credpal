import { PartialType } from '@nestjs/mapped-types';
import { WalletDto } from './create-wallet.dto';

export class UpdateWalletDto extends PartialType(WalletDto) {}

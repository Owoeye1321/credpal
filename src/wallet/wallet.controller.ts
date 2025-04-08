import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { FetchWalletDto } from './dto/get-wallet.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { FundWalletDto } from './dto/fund-wallet-dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() walletDto: WalletDto[]) {
    return this.walletService.create(walletDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get(':currency')
  findOne(@Param('currency') currency: string, @Req() req: any) {
    return this.walletService.findOne({
      userId: Number(req.user.id),
      currency: currency?.toUpperCase(),
    });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('fund')
  async fund(@Body() fundWalletDto: FundWalletDto, @Req() req: any) {
    return await this.walletService.fundWallet(
      fundWalletDto,
      Number(req.user.id),
    );
  }
}

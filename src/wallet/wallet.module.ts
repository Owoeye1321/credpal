import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletRepository } from 'src/repositories/wallet.repository';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import AuthRepository from 'src/repositories/auth.repository';
import ReferenceGenerator from 'src/utilities/token-generator/refrence-class';
import TransactionRepository from 'src/repositories/transaction.repository';

@Module({
  controllers: [WalletController],
  providers: [
    WalletService,
    WalletRepository,
    PrismaClient,
    JwtService,
    AuthRepository,
    ReferenceGenerator,
    TransactionRepository,
  ],
  exports: [WalletService], // Exporting WalletService to be used in other modules
})
export class WalletModule {}

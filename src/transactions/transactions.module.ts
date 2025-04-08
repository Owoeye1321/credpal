import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaClient } from '@prisma/client';
import TransactionRepository from 'src/repositories/transaction.repository';
import AuthRepository from 'src/repositories/auth.repository';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionRepository,
    PrismaClient,
    AuthRepository,
  ],
})
export class TransactionsModule {}

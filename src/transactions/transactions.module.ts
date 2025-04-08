import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaClient } from '@prisma/client';
import TransactionRepository from 'src/repositories/transaction.repository';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionRepository, PrismaClient],
})
export class TransactionsModule {}

import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import TransactionRepository from 'src/repositories/transaction.repository';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionsRepository: TransactionRepository) {}

  async create(transactionDto: any): Promise<Transaction> {
    const { transaction } =
      await this.transactionsRepository.createTransaction(transactionDto);
    return transaction;
  }
}

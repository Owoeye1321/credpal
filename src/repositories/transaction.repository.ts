import { Injectable } from '@nestjs/common';
import { PrismaClient, Transaction } from '@prisma/client';
import { TransactionDto } from 'src/transactions/dto/create-transaction.dto';

@Injectable()
export default class TransactionRepository {
  constructor(private prismaClient: PrismaClient) {}

  async createTransaction(
    transactionDto: TransactionDto,
  ): Promise<{ transaction: Transaction }> {
    const createdTransaction = await this.prismaClient.transaction.create({
      data: transactionDto,
    });
    return { transaction: createdTransaction };
  }

  async getTransactionById(
    id: number,
  ): Promise<{ transaction: Transaction | null }> {
    const transaction = await this.prismaClient.transaction.findUnique({
      where: { id },
    });
    return { transaction };
  }

  async getTransactionsByUserId(
    userId: number,
  ): Promise<{ transactions: Transaction[] }> {
    const transactions = await this.prismaClient.transaction.findMany({
      where: { userId },
    });
    return { transactions };
  }
}

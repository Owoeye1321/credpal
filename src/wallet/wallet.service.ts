import { BadRequestException, Injectable } from '@nestjs/common';
import { WalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletRepository } from 'src/repositories/wallet.repository';
import { FetchWalletDto } from './dto/get-wallet.dto';
import { FundWalletDto, PrimaryCurrencies } from './dto/fund-wallet-dto';
import { TransactionDto } from 'src/transactions/dto/create-transaction.dto';
import ReferenceGenerator from 'src/utilities/token-generator/refrence-class';
import TransactionRepository from 'src/repositories/transaction.repository';
import { Transaction } from '@prisma/client';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly referenceGenerator: ReferenceGenerator,
    private readonly transactionRepository: TransactionRepository,
  ) {}
  async create(walletDto: WalletDto[]): Promise<any> {
    return await this.walletRepository.createWallet(walletDto);
  }

  async findOne(query: FetchWalletDto) {
    if (!query.userId || !query.currency)
      throw new BadRequestException('userId and currency are required');
    return await this.walletRepository.getWalletByCurrency(
      Number(query.userId),
      query.currency.toUpperCase(),
    );
  }

  async fundWallet(
    fundWalletDto: FundWalletDto,
    userId: number,
  ): Promise<Transaction> {
    await this.walletRepository.fundWallet(
      userId,
      fundWalletDto.currency,
      fundWalletDto.amount,
    );
    const transaction: TransactionDto = {
      userId: userId,
      amount: fundWalletDto.amount,

      type: 'CREDIT',
      reference: this.referenceGenerator.generate(10),
      walletRef: (
        await this.walletRepository.getWalletByCurrency(
          userId,
          fundWalletDto.currency,
        )
      ).wallet?.walletRef!,
      currency: fundWalletDto.currency,
    };
    return (await this.transactionRepository.createTransaction(transaction))
      .transaction;
  }
}

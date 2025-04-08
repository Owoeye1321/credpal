import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient, Wallet } from '@prisma/client';
import { WalletDto } from 'src/wallet/dto/create-wallet.dto';

@Injectable()
export class WalletRepository {
  constructor(private prismaClient: PrismaClient) {}

  async createWallet(walletDto: WalletDto[]): Promise<{ wallet: any }> {
    const createdWallet = await this.prismaClient.wallet.createMany({
      data: walletDto,
    });
    return { wallet: createdWallet };
  }

  async getWalletByCurrency(
    userId: number,
    currency: string,
  ): Promise<{ wallet: Wallet | null }> {
    try {
      const wallet = await this.prismaClient.wallet.findUnique({
        where: { userId_currency: { userId, currency } },
      });
      return { wallet };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getWalletsByUserId(userId: number): Promise<{ wallets: Wallet[] }> {
    const wallets = await this.prismaClient.wallet.findMany({
      where: { userId },
    });
    return { wallets };
  }

  async fundWallet(
    userId: number,
    currency: string,
    amount: number,
  ): Promise<Wallet | null> {
      try {
        const wallet = await this.prismaClient.wallet.update({
          where: { userId_currency: { userId, currency } },
          data: { balance: { increment: amount } },
        });
        return wallet;
      }catch(error) {
        throw new BadRequestException(error.message);
      }
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export default class AuthRepository {
  constructor(private prismaClient: PrismaClient) {}

  async registerUser(userDto: UserDto): Promise<{ user: User }> {
    const createdUser = await this.prismaClient.user.create({ data: userDto });
    return { user: createdUser };
  }

  async getUserByEmail(email: string): Promise<{ user: User | null }> {
    const createdUser = await this.prismaClient.user.findFirst({
      where: { email: email },
    });
    return { user: createdUser };
  }

  async activateUser(email: string): Promise<{ user: User | null }> {
    const createdUser = await this.prismaClient.user.update({
      where: { email },
      data: { isActive: true },
    });
    return { user: createdUser };
  }
}

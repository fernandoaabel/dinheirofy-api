import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UserService } from '../user/user.service';
import { IWallet } from './interfaces/wallet.interface';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private readonly userService: UserService,
  ) {}

  async create(createWalletDto: CreateWalletDto) {
    let wallet: IWallet = {
      description: createWalletDto.description,
      user: await this.userService.findById(createWalletDto.userId),
    };
    return this.walletRepository.save(wallet);
  }
}

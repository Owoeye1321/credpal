import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import FxInterface from './fx-interface';
import { FxResponse } from './types';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FxClass implements FxInterface {
  constructor(private readonly configService: ConfigService) {}
  private readonly fxUrl: string = this.configService.get<string>(
    'EXCHANGE_RATE_API_URL',
  )!;
  async fetchRates(currency: string): Promise<FxResponse> {
    try {
      const data = await axios.get(`${this.fxUrl}/${currency}`);
      return data.data;
    } catch (error) {
      throw new UnprocessableEntityException('Error fetching rates');
    }
  }
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import FxInterface from './fx-interface';
import { FxResponse } from './types';
import axios from 'axios';

@Injectable()
export class FxClass implements FxInterface {
  private readonly fxUrl: string = process.env.EXCHANGE_RATE_API_URL!;
  async fetchRates(currency: string): Promise<FxResponse> {
    try {
      const data = await axios.get(`${this.fxUrl}/${currency}`);
      return data.data;
    } catch (error) {
      throw new UnprocessableEntityException('Error fetching rates');
    }
  }
}

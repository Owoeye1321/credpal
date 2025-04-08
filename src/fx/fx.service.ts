import { Inject, Injectable } from '@nestjs/common';
import { FxClass } from 'src/providers/fx-provider/fx-class';
import FxInterface from 'src/providers/fx-provider/fx-interface';
import { FxResponse } from 'src/providers/fx-provider/types';

@Injectable()
export class FxService {
  constructor(@Inject(FxClass) private fxClass: FxInterface) {}

  async fetchRates(currency: string): Promise<FxResponse> {
    return await this.fxClass.fetchRates(currency);
  }
}

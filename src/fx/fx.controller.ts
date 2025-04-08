import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';
import { FxService } from './fx.service';
import FxInterface from 'src/providers/fx-provider/fx-interface';

@Controller('fx/rates')
export class FxController {
  constructor(private readonly fxService: FxService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':currency')
  async fetchRates(@Param('currency') currency: string) {
    return { data: await this.fxService.fetchRates(currency) };
  }
}

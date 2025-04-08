import { Module } from '@nestjs/common';
import { FxService } from './fx.service';
import { FxController } from './fx.controller';
import { FxClass } from 'src/providers/fx-provider/fx-class';

@Module({
  controllers: [FxController],
  providers: [FxService, FxClass],
})
export class FxModule {}

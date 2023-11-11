import { Global, Logger, Module } from '@nestjs/common';
import { UUIDService } from './services';

@Global()
@Module({
  providers: [UUIDService, Logger],
  exports: [UUIDService],
})
export class CommonModule {}

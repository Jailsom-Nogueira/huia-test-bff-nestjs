import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Global()
@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

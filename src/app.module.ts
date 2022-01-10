import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainController } from './controllers/train.controller';
import { TrainModule } from './services/train.module';
import { Train, TrainSchema } from './schemas/train.schema';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { TrainService } from './services/train.service';
import { Exceptions } from './exceptions/exceptions';
import { globalConstants } from './constant';
import { TrainMiddleware } from './middleware/train.middleware';

@Module({
  imports: [
    TrainModule,
    MongooseModule.forRoot(globalConstants.DB_URL),
    MongooseModule.forFeature([{ name: Train.name, schema: TrainSchema },{ name: Ticket.name, schema: TicketSchema }]),
  ],
  controllers: [AppController, TrainController],
  providers: [AppService, TrainService, Exceptions],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrainMiddleware).forRoutes(globalConstants.TRAINS);
  }
}

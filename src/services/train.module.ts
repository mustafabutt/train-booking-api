import { Module } from '@nestjs/common';
import { TrainService } from './train.service';
import { Train, TrainSchema } from '../schemas/train.schema';
import { Ticket,TicketSchema } from '../schemas/ticket.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Train.name, schema: TrainSchema },{ name: Ticket.name, schema: TicketSchema }]),
  ],
  providers: [TrainService],
  exports: [TrainService],
})
export class TrainModule {}

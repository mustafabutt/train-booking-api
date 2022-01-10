import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrainDocument = Train & Document;

@Schema()
export class Train {
  @Prop({ required: true, unique: true})
  trainId: number;

  @Prop({ required: true, unique: true})
  trainName: string;

  @Prop()
  seats: [];

  @Prop()
  arrivaleStation: string;

  @Prop()
  departureStation: string;

  @Prop()
  outboundDate: Date;

  @Prop()
  returnDate: Date;

  @Prop()
  returnTime: string;

  @Prop()
  outboundTime: string;

  @Prop()
  ticketType: string;
}

export const TrainSchema = SchemaFactory.createForClass(Train);

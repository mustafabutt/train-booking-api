import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {

  @Prop({required: true})
  ticketClass: [];

  @Prop({required: true})
  departureStations: [];

  @Prop({required: true})
  arrivalStations: [];

  @Prop({required: true})
  outboundTime: string;

  @Prop({required: true})
  outboundDate: Date;

  @Prop({required: true})
  returnDate: Date;

  @Prop({required: true})
  returnTime: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

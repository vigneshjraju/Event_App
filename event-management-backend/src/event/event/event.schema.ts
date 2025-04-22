import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  eventName: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  ticketPrice: number;

  @Prop()
  description: string;

  @Prop({ required: true })
  organizerId: string; // To associate event with the organizer

  @Prop()
  photo: string; // <-- Add this to store base64 string


}

export const EventSchema = SchemaFactory.createForClass(Event);


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum TicketType {
  SUPPORT = 'support/billing',
  TECHNICAL = 'support/technical',
  GENERAL = 'support/general',
}

@Schema({ timestamps: true })
export class Ticket extends Document {
  @Prop({ required: true, type: String })
  ticketId: string;

  @Prop({
    type: String,
    enum: TicketType,
    default: TicketType.GENERAL,
  })
  ticketType: TicketType;

  @Prop({ required: true })
  customerId: string;

  @Prop({
    type: String,
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  ticketStatus: TicketStatus;

  @Prop({
    type: [
      {
        _id: String,
        comments: String,
        commentBy: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  messages: {
    _id: string;
    comments: string;
    commentBy: string;
    createdAt: Date;
  }[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

import { IsString, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TicketStatus, TicketType } from '../schemas/ticket.schema';

class MessageDto {
  @IsString()
  comments: string;

  @IsString()
  commentBy: string;
}

export class CreateTicketDto {
  @IsString()
  ticketId: string;

  @IsEnum(TicketType)
  @IsOptional()
  ticketType: TicketType;

  @IsString()
  customerId: string;

  @IsEnum(TicketStatus)
  @IsOptional()
  ticketStatus: TicketStatus;

  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  @IsOptional()
  messages: MessageDto[];
}

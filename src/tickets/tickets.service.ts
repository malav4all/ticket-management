import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ticket } from './schemas/ticket.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiResponse } from 'src/common/api-response';

@Injectable()
export class TicketsService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}

  async createTicket(
    createTicketDto: CreateTicketDto,
  ): Promise<ApiResponse<Ticket>> {
    try {
      const existingTicket = await this.ticketModel.findOne({
        ticketId: createTicketDto.ticketId,
      });

      if (existingTicket) {
        return ApiResponse.error(
          'Ticket with this ID already exists',
          'DUPLICATE_TICKET',
        );
      }

      const createdTicket = new this.ticketModel(createTicketDto);
      const savedTicket = await createdTicket.save();

      return ApiResponse.success(savedTicket, 'Ticket created successfully');
    } catch (error) {
      throw new InternalServerErrorException(
        ApiResponse.error('Failed to create ticket', error.message),
      );
    }
  }

  async findAllTickets(
    page: number = 1,
    limit: number = 10,
  ): Promise<ApiResponse<{ tickets: Ticket[]; total: number }>> {
    try {
      const skip = (page - 1) * limit;
      const tickets = await this.ticketModel
        .find()
        .skip(skip)
        .limit(limit)
        .exec();

      const total = await this.ticketModel.countDocuments();

      return ApiResponse.success(
        { tickets, total },
        'Tickets retrieved successfully',
      );
    } catch (error) {
      throw new InternalServerErrorException(
        ApiResponse.error('Failed to retrieve tickets', error.message),
      );
    }
  }

  async findTicketById(id: string): Promise<ApiResponse<Ticket>> {
    try {
      const ticket = await this.ticketModel.findById(id).exec();

      if (!ticket) {
        return ApiResponse.error(
          `Ticket with ID ${id} not found`,
          'TICKET_NOT_FOUND',
        );
      }

      return ApiResponse.success(ticket, 'Ticket retrieved successfully');
    } catch (error) {
      throw new InternalServerErrorException(
        ApiResponse.error('Failed to retrieve ticket', error.message),
      );
    }
  }

  async searchTickets(
    searchText: string = '',
    page: number = 1,
    limit: number = 10,
  ): Promise<ApiResponse<{ tickets: Ticket[]; total: number }>> {
    try {
      const skip = (page - 1) * limit;

      const searchQuery = searchText
        ? {
            $or: [
              { ticketId: { $regex: searchText, $options: 'i' } },
              { customerId: { $regex: searchText, $options: 'i' } },
              { ticketType: { $regex: searchText, $options: 'i' } },
              { ticketStatus: { $regex: searchText, $options: 'i' } },
              { 'messages.comments': { $regex: searchText, $options: 'i' } },
            ],
          }
        : {};

      const tickets = await this.ticketModel
        .find(searchQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();

      const total = await this.ticketModel.countDocuments(searchQuery);

      return ApiResponse.success(
        { tickets, total },
        'Tickets search completed successfully',
      );
    } catch (error) {
      throw new InternalServerErrorException(
        ApiResponse.error('Failed to search tickets', error.message),
      );
    }
  }

  async updateTicket(
    id: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<ApiResponse<Ticket>> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return ApiResponse.error(`Invalid ticket ID format`, 'INVALID_ID');
      }

      const objectId = new Types.ObjectId(id);

      const ticket = await this.ticketModel
        .findOneAndUpdate({ _id: objectId }, updateTicketDto, { new: true })
        .exec();

      if (!ticket) {
        return ApiResponse.error(
          `Ticket with ID ${id} not found`,
          'TICKET_NOT_FOUND',
        );
      }

      return ApiResponse.success(ticket, 'Ticket updated successfully');
    } catch (error) {
      console.error('Update Ticket Error:', error);
      throw new InternalServerErrorException(
        ApiResponse.error('Failed to update ticket', error.message),
      );
    }
  }

  async addMessageToTicket(
    id: string,
    message: { comments: string; commentBy: string },
  ): Promise<ApiResponse<Ticket>> {
    try {
      const ticket = await this.ticketModel
        .findOneAndUpdate(
          { _id: id },
          {
            $push: {
              messages: {
                ...message,
                _id: new Date().toISOString(),
                createdAt: new Date(),
              },
            },
          },
          { new: true },
        )
        .exec();

      if (!ticket) {
        return ApiResponse.error(
          `Ticket with ID ${id} not found`,
          'TICKET_NOT_FOUND',
        );
      }

      return ApiResponse.success(
        ticket,
        'Message added to ticket successfully',
      );
    } catch (error) {
      throw new InternalServerErrorException(
        ApiResponse.error('Failed to add message to ticket', error.message),
      );
    }
  }

  async deleteTicket(id: string): Promise<ApiResponse<Ticket>> {
    try {
      const ticket = await this.ticketModel.findByIdAndDelete(id).exec();

      if (!ticket) {
        return ApiResponse.error(
          `Ticket with ID ${id} not found`,
          'TICKET_NOT_FOUND',
        );
      }

      return ApiResponse.success(ticket, 'Ticket deleted successfully');
    } catch (error) {
      throw new InternalServerErrorException(
        ApiResponse.error('Failed to delete ticket', error.message),
      );
    }
  }
}

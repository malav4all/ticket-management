import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './schemas/ticket.schema';
import { ApiResponse } from 'src/common/api-response';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTicket(
    @Body(new ValidationPipe()) createTicketDto: CreateTicketDto,
  ) {
    try {
      const result = await this.ticketsService.createTicket(createTicketDto);
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        ApiResponse.error<Ticket>(
          'Unexpected error occurred while creating ticket',
          error.message,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllTickets(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    try {
      const result = await this.ticketsService.findAllTickets(page, limit);
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        ApiResponse.error(
          'Unexpected error occurred while fetching tickets',
          error.message,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('search')
  async searchTickets(
    @Query('searchText') searchText: string = '',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    try {
      return await this.ticketsService.searchTickets(searchText, page, limit);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        ApiResponse.error(
          'Unexpected error occurred while searching tickets',
          error.message,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getTicketById(@Param('id') id: string) {
    try {
      const result = await this.ticketsService.findTicketById(id);
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        ApiResponse.error<Ticket>(
          `Unexpected error occurred while fetching ticket ${id}`,
          error.message,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateTicket(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTicketDto: UpdateTicketDto,
  ) {
    try {
      const result = await this.ticketsService.updateTicket(
        id,
        updateTicketDto,
      );
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        ApiResponse.error<Ticket>(
          `Unexpected error occurred while updating ticket ${id}`,
          error.message,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':id/messages')
  async addMessageToTicket(
    @Param('id') id: string,
    @Body('comments') comments: string,
    @Body('commentBy') commentBy: string,
  ) {
    try {
      const result = await this.ticketsService.addMessageToTicket(id, {
        comments,
        commentBy,
      });
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        ApiResponse.error<Ticket>(
          `Unexpected error occurred while adding message to ticket ${id}`,
          error.message,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteTicket(@Param('id') id: string) {
    try {
      const result = await this.ticketsService.deleteTicket(id);
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        ApiResponse.error<Ticket>(
          `Unexpected error occurred while deleting ticket ${id}`,
          error.message,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

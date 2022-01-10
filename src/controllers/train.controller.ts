import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Train } from '../schemas/train.schema';
import { TrainService } from '../services/train.service';
import { Exceptions } from '../exceptions/exceptions';
import { globalConstants } from '../constant';

@Controller(globalConstants.TRAIN)
export class TrainController {
  constructor(
    private readonly userService: TrainService,
    private exceptions: Exceptions,
  ) {}

  @Post(globalConstants.SEARCH)
  async searchTrain(@Res() response, @Body() train: Train) {
    try {
      const trains = await this.userService.findTrain(train);
      if(trains.length>0)
      return response.status(HttpStatus.CREATED).json({
        trains,
      });
      else  return response.status(HttpStatus.CREATED).json({
        "message": globalConstants.NO_TRAIN_FOUND,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Post(globalConstants.BOOKING)
  async bookTrain(@Res() response, @Body() train: Train) {
    try {
      const ticketDetails = await this.userService.bookTrain(train);
      if(ticketDetails.length>0)
        return response.status(HttpStatus.CREATED).json({
          "message": globalConstants.BOOKING_CONFIRMED,
          ticketDetails,
        });
      else return response.status(HttpStatus.CREATED).json({
        "message": globalConstants.REQUESTED_SEATS_NOT_AVAILABLE,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Post()
  async createUser(@Res() response, @Body() train: Train) {
    try {
      const newTrain = await this.userService.create(train);
      return response.status(HttpStatus.CREATED).json({
        newTrain,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Get(globalConstants.DATA)
  async createTrainsData(@Res() response) {
    try {
      const trains = await this.userService.createTrains();
      return response.status(HttpStatus.OK).json({
        trains,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Get(globalConstants.TICKETS)
  async fetchTickets(@Res() response) {
    try {
      const tickets = await this.userService.getTickets();
      return response.status(HttpStatus.OK).json({
        tickets,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }
  @Get()
  async fetchAll(@Res() response) {
    try {
      const trains = await this.userService.readAll();
      return response.status(HttpStatus.OK).json({
        trains,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }
}

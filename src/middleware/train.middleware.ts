import { Injectable, NestMiddleware, UseGuards } from '@nestjs/common';
import { Exceptions } from '../exceptions/exceptions';
import { globalConstants } from '../constant';

@Injectable()
export class TrainMiddleware implements NestMiddleware {

  constructor(private exceptions: Exceptions) {
  }
  use(req: any, res: any, next: () => void) {
    if (req.method === globalConstants.POST && req.originalUrl == '/trains/booking') {
      if (
        req.body.hasOwnProperty('TrainIds') &&
        req.body.hasOwnProperty('ticketClass') &&
        req.body.hasOwnProperty('departureStations') &&
        req.body.hasOwnProperty('arrivalStations') &&
        req.body.hasOwnProperty('outboundTime') &&
        req.body.hasOwnProperty('outboundDate') &&
        req.body.hasOwnProperty('returnDate') &&
        req.body.hasOwnProperty('returnTime')
      )
        next();
      else this.exceptions.generateBadRequestException();
    } else if (req.method === globalConstants.POST && req.originalUrl == '/trains/search') {
      if (
        req.body.hasOwnProperty('travelClass') &&
        req.body.hasOwnProperty('outboundDate') &&
        req.body.hasOwnProperty('outboundTime') &&
        req.body.hasOwnProperty('departureStation') &&
        req.body.hasOwnProperty('arrivaleStation') &&
        req.body.hasOwnProperty('returnDate') &&
        req.body.hasOwnProperty('returnTime')
      )
        next();
      else this.exceptions.generateBadRequestException();
    } else next();
  }
}



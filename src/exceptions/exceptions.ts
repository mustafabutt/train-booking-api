import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { globalConstants } from '../constant';
@Injectable()
export class Exceptions {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  generateUserExistException() {
    throw new HttpException(
      {
        status: HttpStatus.CONFLICT,
        error: globalConstants.USER_EXIST,
      },
      HttpStatus.CONFLICT,
    );
  }

  generateGeneralException(err) {
    throw new HttpException(
      {
        status: HttpStatus.CONFLICT,
        error: err,
      },
      HttpStatus.CONFLICT,
    );
  }

  generateBadRequestException() {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: globalConstants.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

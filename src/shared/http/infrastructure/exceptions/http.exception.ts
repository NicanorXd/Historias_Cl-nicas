import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpExceptionCustom extends HttpException {
  constructor(err: Error | any) {
    super(err.message, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

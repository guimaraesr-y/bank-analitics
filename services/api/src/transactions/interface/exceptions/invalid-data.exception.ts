import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidData extends HttpException {
  constructor(message = 'Invalid Transaction data provided') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

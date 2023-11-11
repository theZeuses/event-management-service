import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class UUIDService {
  uuid() {
    return v4();
  }
}

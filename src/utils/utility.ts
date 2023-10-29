import { Injectable } from '@nestjs/common';
import { uuid as uuidv4 } from 'uuidv4';

@Injectable()
export class Utility {
  constructor() {}
  public getUniqueId(isAdmin: boolean = false) {
    const currentEpoch = new Date().getTime();
    return String(
      uuidv4().slice(0, -14) +
        ':' +
        currentEpoch.toString() +
        `${isAdmin ? 1 : 0}`,
    );
  }
  public generateOrderId(userId: string) {
    const currentTime = new Date().getTime();
    return `odr_${userId.split(':')[0]}_${currentTime}`;
  }
}

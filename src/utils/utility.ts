import { Injectable } from '@nestjs/common';
import { uuid as uuidv4 } from 'uuidv4';

@Injectable()
export class Utility {
  constructor() {}
  /* Generate Unique Id for users signing in for our app, I've added timestamp to let us know when the user was created,
    the last character is to distingush between user and admin*/
  public getUniqueId(isAdmin: boolean = false) {
    const currentEpoch = new Date().getTime();
    return String(
      uuidv4().slice(0, -14) +
        ':' +
        currentEpoch.toString() +
        `${isAdmin ? 1 : 0}`,
    );
  }
  /*Function to generate unique order Id with the time ordercreated and first half of userId*/
  public generateOrderId(userId: string) {
    const currentTime = new Date().getTime();
    return `odr_${userId.split(':')[0]}_${currentTime}`;
  }
}

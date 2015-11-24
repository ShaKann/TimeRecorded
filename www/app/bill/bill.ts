import {Injectable} from 'angular2/core';

@Injectable()
export class Bill {
  public id: number;
  public name: string;
  public recipent: string;
  public titled: string;
  public account: string;
  public amount: number;
  public payed: boolean;
  public icon: string;

  constructor(
    id: number,
    name: string,
    recipent: string,
    titled : string,
    account: string,
    amount: number,
    payed : boolean){
      this.id = id;
      this.name = name;
      this.recipent = recipent;
      this.titled = titled;
      this.account = account;
      this.amount = amount;
      this.payed = payed;
      this.icon = "usd";
    }
  }

  export interface IBIll{
    id: number;
    name: string;
    recipent: string;
    titled: string;
    account: string;
    amount: number;
    payed: boolean;
  }

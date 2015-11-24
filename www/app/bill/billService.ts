import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Bill} from '../bill/bill';

@Injectable()
export class BillService{
  public getBills(){
    // var bills:IBill[] = [
    //   new Bill(1, "Test", "ING", "Własny", "1232321321321321", 1000, false),
    //   new Bill(2, "Test2", "ING2", "Własny2", "1232321321321321", 2000, true)
    //   ];
    // return bills;
    return ["", ""];
  }
}

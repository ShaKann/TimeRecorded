import {Injectable} from 'angular2/core';

@Injectable()
export class WebSite {
  public alive : boolean;
  public icon : string;
  
  constructor(public id:number, public name:string, public state:string, public bindings: string[], public siteAddresses: string[]){
    this.alive = state == 'Started';
    this.icon = 'flash';
  }
}

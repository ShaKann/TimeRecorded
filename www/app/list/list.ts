import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

import {ItemDetailsPage} from '../item-details/item-details';
import {WebSite} from '../item/website';
import {WebSiteService} from '../item/websiteService';
// import {TasksService, TaskFilter} from '../task/taskService';
// import {Task} from '../task/task';
// import {BIll} from '../bill/bill';
// import {BillService} from '../bill/billService';

@Page({
  templateUrl: 'app/list/list.html'
})
export class ListPage {

  public items: WebSite[];
  // public tasks: Task[];
  public selectedItem: any;

  constructor(public app: IonicApp, public nav: NavController, public navParams: NavParams, public service: WebSiteService) {
    this.items = service.sites;
    // console.log(this.items);
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];
    
    // this.taskService.readTasks(x => this.tasks = x, new TaskFilter(2015, 11));
  }

  itemTapped = (event: any, item: any) => {
    this.nav.push(ItemDetailsPage, {
      item: item
    });
  }

  isLoading = () => {
    return this.service.loading;
  }

  refresh = () => {
    this.service.load();
  }
}

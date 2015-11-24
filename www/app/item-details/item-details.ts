import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';


@Page({
  templateUrl: 'app/item-details/item-details.html'
})
export class ItemDetailsPage {
  private selectedItem: NavParams;

  constructor(private app: IonicApp, private nav: NavController, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}

import {App, IonicApp, Platform} from 'ionic/ionic';

import {HelloIonicPage} from './hello-ionic/hello-ionic';
import {ListPage} from './list/list';
import {WebSiteService} from './item/websiteService';

@App({
  templateUrl: 'app/app.html',
  providers: [WebSiteService]
})

class MyApp {
  public pages: any[];
  public rootPage: any;

  constructor(public app: IonicApp, public platform: Platform) {

    // set up our app
    this.initializeApp();

    // set our app's pages
    this.pages = [
      // { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'IIS pages list', component: ListPage }
    ];

    // make HelloIonicPage the root (or first) page
    this.rootPage = ListPage;
    var rootPaget = ListPage;
  }

  initializeApp = () => {
    this.platform.ready().then(() => {
      console.log('Platform ready');

      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      //
      // For example, we might change the StatusBar color. This one below is
      // good for light backgrounds and dark text;
      // if (typeof StatusBar !== 'undefined') {
      //   StatusBar.styleDefault();
      // }
    });
  }

  openPage = (page : any) => {
    // close the menu when clicking a link from the menu
    this.app.getComponent('menu').close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}

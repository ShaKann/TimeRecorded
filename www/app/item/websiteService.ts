import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {WebSite} from '../item/website';

@Injectable()
export class WebSiteService {
  private http: Http;
  public sites: WebSite[];
  public loading : boolean; 


  constructor(http: Http) {
    this.http = http;
    this.sites = [];
    this.load();
  }

  public load() {
    this.loading = true;
    this.http.get("http://localhost:9000/sites")
      .map((res:any) => res.json())
      .subscribe((results:any) => {
        this.sites.length = 0;
        for (var i = 0; i < results.length; i++) {
          var s = results[i];
          this.sites.push(new WebSite(s.Id, s.Name, s.State, s.Bindings, s.SiteAddresses));
        }
        this.loading = false;
      }
      );
  }
}

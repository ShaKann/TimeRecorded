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
    // http.get("http://localhost:7777/wwwroot/api/values")
    this.http.get("http://pagelist.britishcouncil.org/wwwroot/api/values")
      .map((res:any) => res.json())
      .subscribe((results:any) => {
        for (var i = 0; i < results.length; i++) {
          var s = results[i];
          console.log(s);
          this.sites.push(new WebSite(s.Id, s.Name, s.State, s.Bindings, s.SiteAddresses));
        }
        this.loading = false;
      }
      );
  }
}

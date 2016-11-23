import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

declare var FB: any;

@Injectable()
export class FacebookService {

  // Matches patterns such as:
  // https://www.facebook.com/events/57346749824/
  // https://www.facebook.com/events/119453645198055/?active_tab=discussion
  // https://www.facebook.com/groups/1741337529467978/?ref=br_tf
  fbUrlRegex: any = /https?:\/\/www.facebook.com\/(groups|events)\/([0-9]+)/

  checkUrl(url: string) : boolean {
    return this.fbUrlRegex.test(url)
  }

  match(url: string): Array<any> {
    return url.match(this.fbUrlRegex)
  }

  init() : void {
    FB.init({
      appId: '1673818472934251',
      xfbml: true,
      cookie: true,
      version: 'v2.7'
    })
  }


  getLoginStatus() : Promise<any> {
    return new Promise<any>(function(resolve: any, reject: any) {
      FB.getLoginStatus(function(res: any) {
        resolve(res)
      });
    })
  }

  getPostLinks(path: string): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.getPosts(path, resolve, reject);
    })
  }

  getPosts(path: string, resolve: any, reject: any) : void {
    FB.api(path, 'GET', {"fields":"link"},
      (res: any) => {
        if(res.error) {
          reject(res)
        } else {
          resolve(res)
          if(res.paging && res.paging.next) {
            this.pagingNextUrl = res.paging.next
          }
        }
      }
    );
  }

  pagingNextUrl: string;
  getNextPage(): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      if(this.pagingNextUrl) {
        this.getPosts(this.pagingNextUrl, resolve, reject);
      } else {
        reject('No more pages')
      }
    })
  }


  login(): Promise<any> {
    return new Promise<any>(function(resolve: any, reject: any) {
      FB.login(function(response: any) {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          resolve(response)
        } else {
          console.log('User cancelled login or did not fully authorize.');
          reject(response)
        }
      });
    })
  }
}

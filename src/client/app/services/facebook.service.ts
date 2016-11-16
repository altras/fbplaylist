import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

declare var FB: any;

@Injectable()
export class FacebookService {

  // Matches patterns such as:
  // https://www.facebook.com/my_page_id => my_page_id
  // http://www.facebook.com/my_page_id => my_page_id
  // http://www.facebook.com/#!/my_page_id => my_page_id
  // http://www.facebook.com/pages/Paris-France/Vanity-Url/123456?v=app_555 => 123456
  // http://www.facebook.com/pages/Vanity-Url/45678 => 45678
  // http://www.facebook.com/#!/page_with_1_number => page_with_1_number
  // http://www.facebook.com/bounce_page#!/pages/Vanity-Url/45678 => 45678
  // http://www.facebook.com/bounce_page#!/my_page_id?v=app_166292090072334 => my_page_id
  // http://www.facebook.com/my.page.is.great => my.page.is.great
  // https://www.facebook.com/events/779956635440394/
  // https://www.facebook.com/groups/57346749824/
  fbUrlRegex: any = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/

  checkUrl(url: string) : boolean {
    return this.fbUrlRegex.test(url)
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
      this.getPostLinksRecursevly(path, resolve, reject);
    })
  }


  getPostLinksRecursevly(path: string, resolve: any, reject: any) : void {
    FB.api(path, 'GET', {"fields":"link"},
      (res: any) => {
        if(res.error) {
          reject(res)
        } else {
          resolve(res)
          // this.pushIds(res.data).then(() => {
            // if(res.paging && res.paging.next) {
            //   this.getPostLinksRecursevly(res.paging.next, resolve, reject)
            // } else {
            //   console.log('this.ids[i]', this.ids.join(',').split(',').length)
            //   resolve(this.ids[0]);
            // }
          // })
        }
      }
    );
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

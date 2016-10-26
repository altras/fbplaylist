import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

declare var FB: any;

@Injectable()
export class FacebookService {
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


  getPostLinks(path: string) : Promise<any> {
    return new Promise<any>(function(resolve: any, reject: any) {
      FB.api(path, 'GET', {"fields":"link"},
        function(res: any) {
          if(res.error) {
            reject(res)
          } else {
            resolve(res);
          }
        }
      );
    })
  }


  login() : Promise<any> {
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

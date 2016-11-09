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


  youtubeRegex: any = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/;



  pushIds(data : any) : void {
    this.ids.push(() => {
      var validYoutubeIds = data.filter((msg: any) => {
        // -- YouTube Regular expression that matches patterns such as:
        // http://www.youtube.com/watch?v=iwGFalTRHDA
        // http://www.youtube.com/watch?v=iwGFalTRHDA&feature=related
        // http://youtu.be/iwGFalTRHDA
        // http://youtu.be/n17B_uFF4cA
        // http://www.youtube.com/watch?v=t-ZRX8984sc
        // http://youtu.be/t-ZRX8984sc
        if (!msg.link) {
          return false;
        }
        let link: string = msg.link;
        let youtubeUrl: any = link.match(this.youtubeRegex);
        return youtubeUrl && youtubeUrl[1];
      }).map((message: any) => {
        let link: string = message.link;
        let ids: string[] = link.match(this.youtubeRegex);
        return ids[1];
      }).join(",")

      const youtubeDataAPIKey = 'AIzaSyC2yg9n6dHWB877LCxFga5bHEQAvpU4fd4'
      const url = `https://www.googleapis.com/youtube/v3/videos?part=id&id=${validYoutubeIds}&key=${youtubeDataAPIKey}`

      function reqListener (e:any) {
        console.log(e);
      }

      var oReq: any = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("GET", url);
      oReq.send();

    })
  }

  ids : string[] = [];

  getPostLinks(path: string) : Promise<any> {
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
          this.pushIds(res.data)
          console.log(res)
          if(res.paging && res.paging.next) {
            this.getPostLinksRecursevly(res.paging.next, resolve, reject)
          } else {
            console.log('this.ids[i]', this.ids[3])
            resolve(this.ids[0] + this.ids[1] + this.ids[2] + this.ids[3]);
          }
        }
      }
    );
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

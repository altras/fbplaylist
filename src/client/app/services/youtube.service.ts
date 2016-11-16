import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class YoutubeService {
  // -- YouTube Regular expression that matches patterns such as:
  // http://www.youtube.com/watch?v=iwGFalTRHDA
  // http://www.youtube.com/watch?v=iwGFalTRHDA&feature=related
  // http://youtu.be/iwGFalTRHDA
  // http://youtu.be/n17B_uFF4cA
  // http://www.youtube.com/watch?v=t-ZRX8984sc
  // http://youtu.be/t-ZRX8984sc
  urlRegex: any = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/;
  youtubeDataAPIKey: string = 'AIzaSyC2yg9n6dHWB877LCxFga5bHEQAvpU4fd4'

  matchUrl (url: string): any {
    return url.match(this.urlRegex)
  }

  checkIds(res: any) {
    return new Promise<any>((resolve: any, reject: any) => {
      let youtubeIds: string = res.data.filter((msg: any) => {
        if (!msg.link) { // Some results are just comments without links
          return false;
        }
        let link: string = msg.link;
        let youtubeUrl: any = link.match(this.urlRegex);
        return youtubeUrl && youtubeUrl[1];
      }).map((message: any) => {
        let link: string = message.link;
        let ids: string[] = link.match(this.urlRegex);
        return ids[1];
      }).join(",")

      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeIds}&key=${this.youtubeDataAPIKey}`

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          var res = JSON.parse(xhr.responseText)
          resolve(res)
        }
      }
      xhr.open('GET', url, true);
      xhr.send(null);
    })
  }
}
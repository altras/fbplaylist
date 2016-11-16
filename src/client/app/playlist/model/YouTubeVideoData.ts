export class YouTubeVideoData {
  id : string;
  title : string;
  thumbnail : string;

  public constructor(id: string, title: string, thumbnail: string) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
  }
}

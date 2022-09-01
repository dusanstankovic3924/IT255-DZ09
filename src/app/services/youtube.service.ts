import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  key = 'AIzaSyCrCczzYfmevjzHqG8VtqoN5jqfhBRXidA';

  url =
    'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics';

  constructor(private http: HttpClient) {}

  getVideo(id: string): Observable<any> {
    const newUrl = this.url + '&id=' + id + '&key=' + this.key;
    return this.http.get<any>(newUrl);
  }
}

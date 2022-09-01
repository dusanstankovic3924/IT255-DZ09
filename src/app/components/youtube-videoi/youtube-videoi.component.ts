import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-youtube-videoi',
  templateUrl: './youtube-videoi.component.html',
  styleUrls: ['./youtube-videoi.component.css'],
})
export class YoutubeVideoi implements OnInit {
  videos: any[] = [];

  @ViewChild('thumbnailUrl') thumbnailUrl: ElementRef;

  @ViewChild('description') description: ElementRef;

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {}

  getData(youtubeUrl: HTMLInputElement) {
    const videoId = this.getId(youtubeUrl.value);

    this.youtubeService.getVideo(videoId).subscribe((video) => {
      this.thumbnailUrl.nativeElement.value =
        video.items[0].snippet.thumbnails.default.url;
      this.description.nativeElement.value = video.items[0].snippet.description;
    });
  }

  addYoutubeVideo(youtubeUrl: HTMLInputElement) {
    const videoId = this.getId(youtubeUrl.value);

    this.youtubeService.getVideo(videoId).subscribe((video) => {
      console.log(video);

      this.videos.unshift({
        img: (this.thumbnailUrl.nativeElement.value =
          video.items[0].snippet.thumbnails.medium.url),
        thumbnailUrl: (this.thumbnailUrl.nativeElement.value =
          video.items[0].snippet.thumbnails.default.url),
        description: (this.description.nativeElement.value =
          video.items[0].snippet.description),
      });
    });
  }

  getId(url: string): string {
    let regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : '';
  }
}

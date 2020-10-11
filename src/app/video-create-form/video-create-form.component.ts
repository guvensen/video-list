import { Component } from '@angular/core';
import { VideoService } from '../video-service.service';


import { Video } from '../video';

@Component({
  selector: 'app-video-create-form',
  templateUrl: './video-create-form.component.html',
  styleUrls: ['./video-create-form.component.scss']
})
export class VideoCreateFormComponent{

  model = new Video(0, '', 'movie', 0);

  constructor(
    private VideoService: VideoService
  ) {}


  onSubmit() {
    this.VideoService.addToVideo(this.model.name,this.model.type,this.model.score);
  }
}


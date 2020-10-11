import { Injectable } from '@angular/core';
import { Video } from './video';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class VideoService {

  videos = [
    {
      "id"    : 0,
      "name"	: "Esaretin Bedeli (1994)",
      "type"	: "movie",
      "score"	: 9
    },
    {
      "id"    : 1,
      "name"	: "Baba (1972)",
      "type"	: "movie",
      "score"	: 8
    },
    {
      "id"    : 2,
      "name"	: "Baba 2 (1974)",
      "type"	: "movie",
      "score"	: 7
    },
    {
      "id"    : 3,
      "name"	: "Kara Şövalye (2008)",
      "type"	: "movie",
      "score"	: 6
    },
    {
      "id"    : 4,
      "name"	: "Taht Oyunları (2011)",
      "type"	: "series",
      "score"	: 5
    },
    {
      "id"    : 5,
      "name"	: "Breaking Bad (2008)",
      "type"	: "series",
      "score"	: 4
    },
    {
      "id"    : 6,
      "name"	: "House of Cards (2013)",
      "type"	: "series",
      "score"	: 3
    }
  ];

  dialogResult = false;

  constructor(
    public dialog: MatDialog
  ) {}

  nextVideoId(){
    return Math.max.apply(Math, this.videos.map(x => x.id)) +1;
  }

  addToVideo(name,type,score){

    const id:number = this.nextVideoId();
    score = score <= 0 ? 0 : score;
    const video = new Video (id, name, type, score);

    this.videos.push(video);

    this.openCreateDialog();
  }

  getVideos(){
    return this.videos;
  }

  findIndexById(id){
    return this.videos.findIndex(x => x.id === id);
  }

  removeVideo(id){
    const videoIndex: number = this.findIndexById(id);
    const videoName: string = this.videos[videoIndex].name;

    if(this.dialogResult){
      this.videos.splice(videoIndex,1);
      this.dialogResult = false;
    }else{
      this.openRemoveDialog(videoName,id);
    }
  }

  scoreIncrease(id){
    const videoIndex:number = this.findIndexById(id);
    if(this.videos[videoIndex].score < 10){
      this.videos[videoIndex].score = this.videos[videoIndex].score+1;
    }
  }

  scoreDecrease(id){
    const videoIndex:number = this.findIndexById(id);
    if(this.videos[videoIndex].score > 0){
      this.videos[videoIndex].score = this.videos[videoIndex].score-1;
    }
  }

  openCreateDialog(): void {
    this.dialog.open(DialogComponent);
  }

  openRemoveDialog(name,id): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      data: {name: name}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;

      if(result){
        this.removeVideo(id);
      }
    });
  }

}

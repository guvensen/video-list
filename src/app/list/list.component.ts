import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video-service.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  videos = [];
  showList = ['movie','series'];
  sortByScoreDesc = true;
  currentPage = 0;
  offset = 0;
  limit = 7;
  totalPage:number;

  totalItem;
  counter(i: number) {
    return new Array(i);
  }

  constructor(
    private VideoService: VideoService
  ) {}

  ngOnInit(): void {
    this.videos = this.VideoService.getVideos().slice(this.offset, (this.currentPage * this.limit));
    this.totalPage = Math.ceil(this.VideoService.getVideos().length / this.limit);
    this.totalItem = this.VideoService.getVideos().length;
  }

  removeVideo(id){
    this.VideoService.removeVideo(id);
  }

  scoreIncrease(id){
    this.VideoService.scoreIncrease(id);
  }

  scoreDecrease(id){
    this.VideoService.scoreDecrease(id);
  }

  showAll(event){
    if(event.checked){
      this.showList = ['series','movie'];
    }else{
      this.showList = [];
    }
  }

  showMovie(event){
    if(event.checked){
      this.showList.push('movie');
    }else{
      const index = this.showList.findIndex(x => x === 'movie');
      this.showList.splice(index,1);
    }
  }

  showSeries(event){
    if(event.checked){
      this.showList.push('series');
    }else{
      const index = this.showList.findIndex(x => x === 'series');
      this.showList.splice(index,1);
    }
  }

  sortBy(prop: string) {
    if(this.sortByScoreDesc){
      return this.VideoService.getVideos().sort((a, b) => a[prop] < b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1).slice(this.offset, (this.offset+this.limit));
    }else{
      return this.VideoService.getVideos().sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1).slice(this.offset, (this.offset+this.limit));
    }
  }

  sortByScoreDescending(){
    this.sortByScoreDesc = true;
  }

  sortByScoreAscending(){
    this.sortByScoreDesc = false;
  }

  onChangePage(index){
    this.currentPage = index;
    this.offset = index*this.limit;
  }

  onPrevPage(){
    if(this.currentPage > 0){
      this.onChangePage(this.currentPage - 1);
    }
  }

  onNextPage(){
    if(this.currentPage+1 < this.totalPage){
      this.onChangePage(this.currentPage +1);
    }
  }
}

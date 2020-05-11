import { Component, OnInit, Input, Output,EventEmitter ,ViewEncapsulation ,ChangeDetectorRef} from '@angular/core';
import {Movie} from '../iresult';
import {MovieSearchService} from '../movie-search.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
  encapsulation:ViewEncapsulation.ShadowDom
})
export class MovieSearchComponent implements OnInit {
  @Input() searchparam:string;
  @Output() serachresult:EventEmitter<Movie[]>= new EventEmitter<Movie[]>();
  movies:Movie[];
  constructor(private searchService:MovieSearchService , private ref :ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngOnChanges():void{
    this.search(this.searchparam);
    this.ref.detectChanges();
  }

  search(term:string){
    return this.searchService.searchmovie(term).subscribe((data:any)=>{
      this.movies=data.results;
      this.ref.detectChanges();
      console.log('serach result',this.movies);
      this.serachresult.emit(this.movies);
      
    })
  }

}

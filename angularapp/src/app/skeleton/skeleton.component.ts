import { Component, OnInit } from '@angular/core';
import { WordsService } from '../services/words.service';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent implements OnInit {

  constructor(private words : WordsService) { }

  ngOnInit() {}

  pickWord(type : string){
  	return this.words.pickWord(type);
  }

}

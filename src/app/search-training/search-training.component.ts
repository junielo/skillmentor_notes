import { Component } from '@angular/core';
import { CourseModel } from '../models/CourseModel.interface';
import { SearchTrainingService } from './search-training.service';

@Component({
  selector: 'app-search-training',
  templateUrl: './search-training.component.html',
  styleUrls: ['./search-training.component.css']
})
export class SearchTrainingComponent {

  courses: CourseModel[] = []

  prompt: string = "";

  constructor(private service: SearchTrainingService) { }

  sendPrompt(){
    this.service.sendPrompt(this.prompt).subscribe((response: any) => {
      this.courses = response
    })
  }

}

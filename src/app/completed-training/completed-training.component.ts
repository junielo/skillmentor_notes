import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../models/CourseModel.interface';
import { CompletedTrainingService } from './completed-training.service';

@Component({
  selector: 'app-completed-training',
  templateUrl: './completed-training.component.html',
  styleUrls: ['./completed-training.component.css']
})
export class CompletedTrainingComponent implements OnInit {

  mCourses: CourseModel[] = []
  pCourses: CourseModel[] = []

  constructor(private service: CompletedTrainingService) { }

  ngOnInit(): void {
    this.service.getManagement().subscribe((response: any) => {
      this.mCourses = response
    })

    this.service.getPersonal().subscribe((response: any) => {
      this.pCourses = response
    })
  }

}

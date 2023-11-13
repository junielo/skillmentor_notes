import { Component, OnInit } from '@angular/core';
import { EnrolledTrainingService } from './enrolled-training.service';
import { CourseModel } from '../models/CourseModel.interface';

@Component({
  selector: 'app-enrolled-training',
  templateUrl: './enrolled-training.component.html',
  styleUrls: ['./enrolled-training.component.css']
})
export class EnrolledTrainingComponent implements OnInit {

  mCourses: CourseModel[] = []
  pCourses: CourseModel[] = []

  constructor(private service: EnrolledTrainingService) { }

  ngOnInit(): void {
    this.service.getManagement().subscribe((response: any) => {
      this.mCourses = response
    })

    this.service.getPersonal().subscribe((response: any) => {
      this.pCourses = response
    })
  }

}

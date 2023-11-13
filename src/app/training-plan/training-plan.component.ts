import { Component, OnInit } from '@angular/core';
import { TrainingPlanService } from './training-plan.service';
import { CourseModel } from '../models/CourseModel.interface';

@Component({
  selector: 'app-training-plan',
  templateUrl: './training-plan.component.html',
  styleUrls: ['./training-plan.component.css']
})
export class TrainingPlanComponent implements OnInit {

  courses: CourseModel[] = []

  constructor(private service: TrainingPlanService) { }

  ngOnInit(): void {

    this.service.getTrainingPlan().subscribe((response: any) => {
      this.courses = response
    })

  }

}


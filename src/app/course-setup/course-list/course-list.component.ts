import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCourseDialogComponent } from '../dialogs/create-course-dialog/create-course-dialog.component';
import { CourseUnitsService } from '../course-units.service';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CourseUnitStateModel } from '../state/course.state';
import { setSelectedCourse } from '../state/course.action';

export interface Course {
  course_id: string,
  course_title: string
}

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {

  selectedCourse = "";

  allCourses$!: Observable<Course[]>

  constructor(
    public dialog: MatDialog,
    private service: CourseUnitsService,
    private store: Store<CourseUnitStateModel>
  ) {
    this.allCourses$ = this.setCourseObservable()
  }

  createCourse(){
    let dialogRef = this.dialog.open(CreateCourseDialogComponent);

    dialogRef.afterClosed().subscribe(response => {
      if(response)
        this.allCourses$ = this.setCourseObservable()
    });
  }

  setCourseObservable(){
    return this.service.getAllCourses().pipe( 
      tap((response: Course[]) => 
      { 
        this.selectCourse(response[0].course_id)
      }) 
    )
  }

  selectCourse(course_id: string){
    this.selectedCourse = course_id;
    this.store.dispatch(setSelectedCourse({course_id}))
    console.log('course selected')
  }

}

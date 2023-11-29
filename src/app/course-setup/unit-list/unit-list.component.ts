import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUnitDialogComponent } from '../dialogs/create-unit-dialog/create-unit-dialog.component';
import { Store } from '@ngrx/store';
import { CourseUnitStateModel } from '../state/course.state';
import { getCourse } from '../state/course.selector';
import { CourseUnitsService } from '../course-units.service';
import { Observable, catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { setSelectedCourse, setSelectedUnit } from '../state/course.action';

export interface Unit {
  embeded_id: string,
  course_main_id: string,
  topic_id: string,
  chapter_title: string,
  topic_title: string,
  duration: string,
  transcript: { id: string, chunk: string }[],
}

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  selectedUnit = "";
  selectedCourse = ""

  unitsByCourse$!: Observable<Unit[]>

  constructor(
    public dialog: MatDialog,
    private service: CourseUnitsService,
    private store: Store<{course: CourseUnitStateModel}>
  ) { }

  ngOnInit(): void {
    this.store.select(getCourse).subscribe(course_id => {
      console.log('topic triggered')
      this.selectedCourse = course_id
      if(!this.selectedCourse){
        this.unitsByCourse$ =  new Observable<Unit[]>()
        return
      }
      this.unitsByCourse$ = this.setUnitObservable()
    })
  }

  setUnitObservable(){
    return this.service.getUnitByCourse(this.selectedCourse).pipe(
      tap((response: Unit[]) => {
        if(response.length > 0)
          this.selectUnit(response[0].topic_id)
        else
          this.selectUnit("")
      }),
      catchError((_) => {
        return new Observable<Unit[]>()
      })
    )
  }

  createTopic(){
    let dialogRef = this.dialog.open(CreateUnitDialogComponent, {
      data: { course_id: this.selectedCourse }
    });

    dialogRef.afterClosed().subscribe(response => {
      if(response)
        this.store.dispatch(setSelectedCourse({course_id: this.selectedCourse}))
    });
  }

  selectUnit(unit_id: string){
    this.selectedUnit = unit_id;
    const courseUnit: CourseUnitStateModel = {
      course_id: this.selectedCourse,
      unit_id: this.selectedUnit
    }
    this.store.dispatch(setSelectedUnit(courseUnit))
  }

}

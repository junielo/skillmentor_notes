import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseUnitsService } from '../course-units.service';
import { CourseUnitStateModel } from '../state/course.state';
import { Observable, catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { Unit } from '../unit-list/unit-list.component';
import { geCourseUnit } from '../state/course.selector';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unit-content',
  templateUrl: './unit-content.component.html',
  styleUrls: ['./unit-content.component.css']
})
export class UnitContentComponent implements OnInit {

  unitForm: FormGroup = this.formBuilder.group({
    chapter_title: [''],
    topic_title: ['', [Validators.required]],
    duration: [''],
    transcript: ['', [Validators.required]]
  })

  courseUnit$!: Observable<Unit>

  embedding_id!: string
  course_id!: string
  topic_id!: string

  constructor(
    private spinner: NgxSpinnerService,
    private service: CourseUnitsService,
    private store: Store<{course: CourseUnitStateModel}>,
    private toast:ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.courseUnit$ = this.setUnitObservable()
  }

  setUnitObservable(){
    return this.store.select(geCourseUnit).pipe(
      tap(unit => {
        this.course_id = unit.course_id
        this.topic_id = unit.unit_id
      }),
      switchMap(unit => {
        console.log(this.course_id, this.topic_id)
        if(!this.course_id || !this.topic_id){
          return this.store.select(geCourseUnit).pipe(
            switchMap(_ => {
              return new Observable<Unit>()
            }
          ))
        }
        return this.service.getSingleUnit(unit).pipe(
          map((response: any) => {
            let transcript = response.body.transcript.length > 0 ? response.body.transcript.map((item: any) => item.chunk).join('\n\n') : ''
            if(response.body){
              this.embedding_id = response.body.embeded_id
              this.unitForm.patchValue({
                chapter_title: response.body.chapter_title,
                topic_title: response.body.topic_title,
                duration: response.body.duration,
                transcript: transcript
              })
              return {
                embeded_id: response.body.transcript.length > 0 ? 'Transcript embedded' : "Not embedded yet",
                course_main_id: response.body.course_main_id,
                topic_id: response.body.topic_id,
                chapter_title: response.body.chapter_title,
                topic_title: response.body.topic_title,
                duration: response.body.duration,
                transcript: response.body.transcript
              }
            }
            else{
              this.unitForm.patchValue({
                chapter_title: "",
                topic_title: "",
                duration: "",
                transcript: ""
              })
              return {
                embeded_id: "",
                course_main_id: "",
                topic_id: "",
                chapter_title: "",
                topic_title: "",
                duration: "",
                transcript: ""
              }
            }
          })
        )
      })
    )
  }

  embedTranscript() {
    const raw_data = this.unitForm.getRawValue()
    const data = {
      ...raw_data,
      course_id: this.course_id,
      unit_id: this.topic_id
    }
    if(data.transcript.length == 0){
      this.toast.error('Transcript is empty', 'Error')
      return
    }

    this.spinner.show();
    this.service.upsertEmbedding(data).subscribe(response => {
      this.spinner.hide();
      this.toast.success('Transcript embedded successfully', 'Success')
      this.courseUnit$ = this.setUnitObservable()
    }, error => {
      this.spinner.hide();
      this.toast.error('Transcript embedding failed', 'Error')
    })
  }

  deleteEmbedding(){
    this.spinner.show();
    this.service.deleteEmbedding(this.embedding_id).subscribe(
      response => {
        this.spinner.hide();
        this.toast.success('Topic deleted successfully', 'Success')
        this.courseUnit$ = this.setUnitObservable()
      }
    )
  }

}

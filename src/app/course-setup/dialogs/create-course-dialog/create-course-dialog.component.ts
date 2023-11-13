import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseUnitsService } from '../../course-units.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-course-dialog',
  templateUrl: './create-course-dialog.component.html',
  styleUrls: ['./create-course-dialog.component.css']
})
export class CreateCourseDialogComponent {

  courseForm: FormGroup = this.formBuilder.group({
    course_id: ['', [Validators.required]],
    course_title: ['', [Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateCourseDialogComponent>,
    private spinner: NgxSpinnerService,
    private service: CourseUnitsService,
    private toast:ToastrService,
  ) { }

  onSubmit(){
    this.spinner.show();
    this.service.createCourse(this.courseForm.getRawValue())
    .subscribe(
      (response: any) => {
        this.spinner.hide();
        if(response.status != 200) {
          this.toast.error("Error creating course")
          return
        }
        this.toast.success('Course created successfully')
        this.dialogRef.close(true)
      }
    )
  }

}

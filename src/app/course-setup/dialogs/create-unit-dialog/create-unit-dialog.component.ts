import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CourseUnitsService } from '../../course-units.service';

@Component({
  selector: 'app-create-unit-dialog',
  templateUrl: './create-unit-dialog.component.html',
  styleUrls: ['./create-unit-dialog.component.css']
})
export class CreateUnitDialogComponent {

  unitForm: FormGroup = this.formBuilder.group({
    topic_id: ['', [Validators.required]],
    chapter_title: [''],
    topic_title: ['', [Validators.required]],
    duration: ['']
  })

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateUnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService,
    private service: CourseUnitsService,
    private toast:ToastrService,
  ) { }

  onSubmit(){
    this.spinner.show();
    const raw_data = this.unitForm.getRawValue()
    const data = {
      course_main_id: this.data.course_id,
      topic_id: raw_data.topic_id,
      chapter_title: raw_data.chapter_title,
      topic_title: raw_data.topic_title,
      duration: raw_data.duration
    }
    this.service.createUnit(data)
    .subscribe(
      (response: any) => {
        this.spinner.hide();
        if(response.status != 200) {
          this.toast.error("Error creating unit")
          return
        }
        this.toast.success('Unit created successfully')
        this.dialogRef.close(true)
      }
    )
  }

}

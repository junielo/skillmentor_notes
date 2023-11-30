import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialsModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TrainingPlanComponent } from './training-plan/training-plan.component';
import { SearchTrainingComponent } from './search-training/search-training.component';
import { EnrolledTrainingComponent } from './enrolled-training/enrolled-training.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CompletedTrainingComponent } from './completed-training/completed-training.component';
import { CourseListComponent } from './course-setup/course-list/course-list.component';
import { UnitListComponent } from './course-setup/unit-list/unit-list.component';
import { CourseMainComponent } from './course-setup/course-main/course-main.component';
import { CreateCourseDialogComponent } from './course-setup/dialogs/create-course-dialog/create-course-dialog.component';
import { CreateUnitDialogComponent } from './course-setup/dialogs/create-unit-dialog/create-unit-dialog.component';
import { UnitContentComponent } from './course-setup/unit-content/unit-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StoreModule } from '@ngrx/store';
import { courseReducer } from './course-setup/state/course.reducer';
import { ProjectListComponent } from './project-list/project-list.component';
import { SkillGapComponent } from './skill-gap/skill-gap.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    TrainingPlanComponent,
    SearchTrainingComponent,
    EnrolledTrainingComponent,
    DashboardComponent,
    CompletedTrainingComponent,
    CourseListComponent,
    UnitListComponent,
    CourseMainComponent,
    CreateCourseDialogComponent,
    CreateUnitDialogComponent,
    UnitContentComponent,
    ProjectListComponent,
    SkillGapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    MaterialsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({course: courseReducer}),
    ToastrModule.forRoot(
      {
      preventDuplicates: true,
      closeButton: true,
      progressBar: true
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

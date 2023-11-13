import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrainingPlanComponent } from './training-plan/training-plan.component';
import { SearchTrainingComponent } from './search-training/search-training.component';
import { EnrolledTrainingComponent } from './enrolled-training/enrolled-training.component';
import { CompletedTrainingComponent } from './completed-training/completed-training.component';
import { CourseMainComponent } from './course-setup/course-main/course-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'nav', component: NavBarComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'training-plan', component: TrainingPlanComponent },
      { path: 'search-training', component: SearchTrainingComponent },
      { path: 'enrolled-training', component: EnrolledTrainingComponent },
      { path: 'completed-training', component: CompletedTrainingComponent },
      { path: 'setup-course', component: CourseMainComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { ApiService, TAG_CURRENT_USER, TRAININGPLAN } from '../utils/api.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingPlanService {

  constructor(private apiService: ApiService) { }

  getTrainingPlan(){
    const user: any = JSON.parse(localStorage.getItem(TAG_CURRENT_USER)!)
    return this.apiService.get<any>(TRAININGPLAN + user.user_id)
  }
}

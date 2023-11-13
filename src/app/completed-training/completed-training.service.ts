import { Injectable } from '@angular/core';
import { ApiService, MANAGEMENT_COMPLETED, PERSONAL_COMPLETED, TAG_CURRENT_USER } from '../utils/api.service';

@Injectable({
  providedIn: 'root'
})
export class CompletedTrainingService {

  constructor(private apiService: ApiService) { }

  getManagement(){
    const user: any = JSON.parse(localStorage.getItem(TAG_CURRENT_USER)!)
    return this.apiService.get<any>(MANAGEMENT_COMPLETED + user.user_id)
  }

  getPersonal(){
    const user: any = JSON.parse(localStorage.getItem(TAG_CURRENT_USER)!)
    return this.apiService.get<any>(PERSONAL_COMPLETED + user.user_id)
  }
}

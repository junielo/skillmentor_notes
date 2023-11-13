import { Injectable } from '@angular/core';
import { ApiService, MANAGEMENT_ENROLLED, PERSONAL_ENROLLED, TAG_CURRENT_USER } from '../utils/api.service';

@Injectable({
  providedIn: 'root'
})
export class EnrolledTrainingService {

  constructor(private apiService: ApiService) { }

  getManagement(){
    const user: any = JSON.parse(localStorage.getItem(TAG_CURRENT_USER)!)
    return this.apiService.get<any>(MANAGEMENT_ENROLLED + user.user_id)
  }

  getPersonal(){
    const user: any = JSON.parse(localStorage.getItem(TAG_CURRENT_USER)!)
    return this.apiService.get<any>(PERSONAL_ENROLLED + user.user_id)
  }

}

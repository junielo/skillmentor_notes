import { Injectable } from '@angular/core';
import { ApiService, LOGIN } from '../utils/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService) { }

  userLogin(body: any){
    return this.apiService.post(LOGIN, body)
  }
}

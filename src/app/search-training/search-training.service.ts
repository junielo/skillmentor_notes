import { Injectable } from '@angular/core';
import { ApiService, SEND_PROMPT } from '../utils/api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchTrainingService {

  constructor(private apiService: ApiService) { }

  sendPrompt(prompt: string){
    return this.apiService.get<any>(SEND_PROMPT + prompt)
  }
}

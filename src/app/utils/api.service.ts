import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  handleError<T>() {
    return (response: any): Observable<T> => {
      return of(response.error as T)
    }
  }

  post<T>(url: string, body: any){
    return this.http.post<T>(url, body, { observe: 'response' })
    .pipe(catchError(this.handleError<any>()))
  }

  get<T>(url: string){
    return this.http.get<T>(url)
  }

}

// export const LOCAL_API_URL = "http://localhost:3333/"
export const BASE_URL = "http://localhost:5000/"
// export const BASE_URL = "https://be.skillmentor.oraclecloudapps.one/"
export const SUPABASE_URL = "https://gqejnrnjffkkarpjrmex.supabase.co"
export const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxZWpucm5qZmZra2FycGpybWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyNDE5MDAsImV4cCI6MjAxNjgxNzkwMH0.zGNWHG7nEyLeq_wk9UhmUXgSHWUYvCFdq0IJdH151Rs"

export const LOGIN = BASE_URL + "user/login"
export const TRAININGPLAN = BASE_URL + "user/trainingPlan/"
export const MANAGEMENT_ENROLLED = BASE_URL + "user/mngtEnrolled/"
export const PERSONAL_ENROLLED = BASE_URL + "user/prsnlEnrolled/"
export const MANAGEMENT_COMPLETED = BASE_URL + "user/mngtCompleted/"
export const PERSONAL_COMPLETED = BASE_URL + "user/prsnlCompleted/"
export const SEND_PROMPT = BASE_URL + "user/sendPrompt?message="
export const CREATE_COURSE = BASE_URL + "course/createCourse"
export const GET_ALL_COURSE = BASE_URL + "course/getAllCourses"
export const CREATE_UNIT = BASE_URL + "course/createTopic"
export const GET_UNIT_BY_COURSE = BASE_URL + "course/getTopicByCourse/"
export const GET_SINGLE_UNIT = BASE_URL + "course/getSingleTopic"
export const UPSERT_EMBEDDING = BASE_URL + "course/upsertEmbedding"
export const DELETE_EMBEDDING = BASE_URL + "course/deleteEmbedding"
export const PROJECT_GAP = BASE_URL + "skill_gap/project_gap"

export const TAG_CURRENT_USER = 'current_user'
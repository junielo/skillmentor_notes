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

export const LOCAL_API_URL = "http://localhost:3333/"

export const LOGIN = LOCAL_API_URL + "user/login"
export const TRAININGPLAN = LOCAL_API_URL + "user/trainingPlan/"
export const MANAGEMENT_ENROLLED = LOCAL_API_URL + "user/mngtEnrolled/"
export const PERSONAL_ENROLLED = LOCAL_API_URL + "user/prsnlEnrolled/"
export const MANAGEMENT_COMPLETED = LOCAL_API_URL + "user/mngtCompleted/"
export const PERSONAL_COMPLETED = LOCAL_API_URL + "user/prsnlCompleted/"
export const SEND_PROMPT = LOCAL_API_URL + "user/sendPrompt?message="
export const CREATE_COURSE = LOCAL_API_URL + "course/createCourse"
export const GET_ALL_COURSE = LOCAL_API_URL + "course/getAllCourses"
export const CREATE_UNIT = LOCAL_API_URL + "course/createTopic"
export const GET_UNIT_BY_COURSE = LOCAL_API_URL + "course/getTopicByCourse/"
export const GET_SINGLE_UNIT = LOCAL_API_URL + "course/getSingleTopic"
export const UPSERT_EMBEDDING = LOCAL_API_URL + "course/upsertEmbedding"
export const DELETE_EMBEDDING = LOCAL_API_URL + "course/deleteEmbedding"

export const TAG_CURRENT_USER = 'current_user'
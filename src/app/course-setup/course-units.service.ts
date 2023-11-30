import { Injectable } from '@angular/core';
import { ApiService, CREATE_COURSE, CREATE_UNIT, DELETE_EMBEDDING, GET_ALL_COURSE, GET_SINGLE_UNIT, GET_UNIT_BY_COURSE, SUPABASE_KEY, SUPABASE_URL, UPSERT_EMBEDDING } from '../utils/api.service';
import { Course } from './course-list/course-list.component';
import { Unit } from './unit-list/unit-list.component';
import { CourseUnitStateModel } from './state/course.state';
import {
  createClient,
  SupabaseClient
} from '@supabase/supabase-js'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseUnitsService {
  private supabase!: SupabaseClient

  constructor(
    private service: ApiService
  ) { 
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
  }

  createCourse(course: any){
    return this.service.post(CREATE_COURSE, course)
  }

  getAllCourses(){
    return this.service.get<Course[]>(GET_ALL_COURSE)
  }

  supaGetAllCourses(){
    return from(
      this.supabase
        .from('course_main')
        .select('*')
    )
  }

  createUnit(unit: any){
    return this.service.post(CREATE_UNIT, unit)
  }

  getUnitByCourse(course_id: string){
    return this.service.get<Unit[]>(GET_UNIT_BY_COURSE + course_id)
  }

  getSingleUnit(courseUnit: CourseUnitStateModel){
    return this.service.post<Unit[]>(GET_SINGLE_UNIT, courseUnit)
  }

  upsertEmbedding(embedding: any){
    return this.service.post(UPSERT_EMBEDDING, embedding)
  }

  deleteEmbedding(embedding_id: string){
    return this.service.post(DELETE_EMBEDDING, { embedding_id: embedding_id })
  }

}

import { Injectable } from '@angular/core';
import { ApiService, CREATE_COURSE, CREATE_UNIT, DELETE_EMBEDDING, GET_ALL_COURSE, GET_SINGLE_UNIT, GET_UNIT_BY_COURSE, UPSERT_EMBEDDING } from '../utils/api.service';
import { Course } from './course-list/course-list.component';
import { Unit } from './unit-list/unit-list.component';
import { CourseUnitStateModel } from './state/course.state';

@Injectable({
  providedIn: 'root'
})
export class CourseUnitsService {

  constructor(
    private service: ApiService
  ) { }

  createCourse(course: any){
    return this.service.post(CREATE_COURSE, course)
  }

  getAllCourses(){
    return this.service.get<Course[]>(GET_ALL_COURSE)
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

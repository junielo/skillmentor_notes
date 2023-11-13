import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseUnitStateModel } from "./course.state";


const getCourseState = createFeatureSelector<CourseUnitStateModel>('course')

export const getCourse = createSelector(getCourseState, (state: CourseUnitStateModel) => state.course_id)
export const geCourseUnit = createSelector(getCourseState, (state: CourseUnitStateModel) => { return state })
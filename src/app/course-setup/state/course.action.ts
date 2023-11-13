import { createAction, props } from "@ngrx/store";
import { CourseUnitStateModel } from "./course.state";


export const setSelectedCourse = createAction('selected_course', props<{course_id: string}>())
export const setSelectedUnit = createAction('selected_unit', props<CourseUnitStateModel>())
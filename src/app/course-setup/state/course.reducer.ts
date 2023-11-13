import { Action, createReducer, on } from "@ngrx/store";
import { setSelectedCourse, setSelectedUnit } from "./course.action";
import { CourseUnitStateModel, initialState } from "./course.state";


const _courseReducer = createReducer(
    initialState,
    on(setSelectedCourse, (state, { course_id }) => ({ ...state, course_id })),
    on(setSelectedUnit, (state, courseUnit: CourseUnitStateModel) => ({ ...state, ...courseUnit }))
)

export function courseReducer(state: CourseUnitStateModel | undefined, action: Action) {
    return _courseReducer(state, action)
}
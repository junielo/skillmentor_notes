export interface CourseUnitStateModel {
    course_id: string,
    unit_id: string
}

export const initialState: CourseUnitStateModel = {
    course_id: "",
    unit_id: ""
}
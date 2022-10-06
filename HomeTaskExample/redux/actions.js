export const SET_TASK_TYPE = 'SET_TASK_TYPE';

export const setTaskType = (type) => (dispatch) => {
    dispatch({
        type: SET_TASK_TYPE,
        payload: type
    })
};
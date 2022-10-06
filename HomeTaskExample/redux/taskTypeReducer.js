import { TASK_FILTER_TYPE } from "../hte_app/utility/constants";
import { SET_TASK_TYPE } from "./actions";

const initialState = {
    taskType: TASK_FILTER_TYPE.ALL
}

const taskTypeReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_TASK_TYPE:
            return {
                ...state,
                taskType: actions.payload
            }

        default:
            return state
    }
}

export default taskTypeReducer;

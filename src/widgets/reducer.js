import {
    WIDGET_CREATING,
    WIDGET_CREATE_SUCCESS,
    WIDGET_CREATE_ERROR,
} from './constants'

const initialState = {
    list: [],
    requesting: false,
    messages: [],
    errors: [],
}

const reducer = function widgetReducer (state = initialState, action) {
    switch (action.type) {
        case WIDGET_CREATING:
            return {
                ...state,
                errors: [],
                messages: [{
                    body: `Widget: ${action.wdget.name} being created...`,
                    time: new Date(),
                }],
                requesting: true,
                successful: false,
            }

        case WIDGET_CREATE_SUCCESS:
            return {
                errors: [],
                list: state.list.concat([action.widget]),
                messages: [{
                    body: `Widget: ${action.widget.name} awesomely created!`,
                    time: new Date(),
                }],
                requesting: false,
                successful: true,
            }
        
        case WIDGET_CREATE_ERROR:
            return {
                ...state,
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: new Date(),
                }]),
                messages: [],
                requesting: false,
                successful: false,
            }
        
        default:
            return state
    }
}

export default reducer
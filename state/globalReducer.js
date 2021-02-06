import { CHANGE_COLOR_MODE } from '../actions/types';

const initialState = {
    colorMode: 'dark',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_COLOR_MODE:
            return { ...state, colorMode: action.payload };
        default:
            return state;
    }
};

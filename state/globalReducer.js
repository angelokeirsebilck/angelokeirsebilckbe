import { CHANGE_COLOR_MODE, TOGGLE_MENU } from '../actions/types';

const initialState = {
    colorMode: 'dark',
    isMenuOpen: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_COLOR_MODE:
            return { ...state, colorMode: action.payload };
        case TOGGLE_MENU:
            return { ...state, isMenuOpen: !state.isMenuOpen };
        default:
            return state;
    }
};

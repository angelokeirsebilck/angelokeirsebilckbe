import { CHANGE_COLOR_MODE, TOGGLE_MENU, CHANGE_PAGE } from '../actions/types';

const initialState = {
    colorMode: 'dark',
    isMenuOpen: false,
    page: '',
    xValueSkills: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_COLOR_MODE:
            return { ...state, colorMode: action.payload };

        case TOGGLE_MENU:
            return { ...state, isMenuOpen: !state.isMenuOpen };

        case CHANGE_PAGE:
            return { ...state, page: action.payload };

        default:
            return state;
    }
};

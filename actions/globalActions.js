import { CHANGE_COLOR_MODE, TOGGLE_MENU } from './types';

export const changeColorMode = (colorMode) => (dispatch) => {
    dispatch({
        type: CHANGE_COLOR_MODE,
        payload: colorMode,
    });
};

export const toggleMenu = () => (dispatch) => {
    dispatch({
        type: TOGGLE_MENU,
    });
};

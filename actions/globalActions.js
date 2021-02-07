import { CHANGE_COLOR_MODE } from './types';

export const changeColorMode = (colorMode) => (dispatch) => {
    dispatch({
        type: CHANGE_COLOR_MODE,
        payload: colorMode,
    });
};
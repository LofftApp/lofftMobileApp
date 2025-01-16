import { Appearance } from 'react-native';
import { TOGGLE_THEME, SET_THEME } from './themeActions';

interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  isDarkMode: Appearance.getColorScheme() === 'dark', // Initial state based on system theme
};

export const themeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return { ...state, isDarkMode: !state.isDarkMode };
    case SET_THEME:
      return { ...state, isDarkMode: action.payload };
    default:
      return state;
  }
};

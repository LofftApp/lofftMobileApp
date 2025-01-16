export const TOGGLE_THEME = 'TOGGLE_THEME';
export const SET_THEME = 'SET_THEME';

export const toggleTheme = () => ({
  type: TOGGLE_THEME,
});

export const setTheme = (isDarkMode: boolean) => ({
  type: SET_THEME,
  payload: isDarkMode,
});

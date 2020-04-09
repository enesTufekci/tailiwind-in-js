import * as React from 'react';

interface ThemeContextValue {
  theme: string;
  changeTheme: (theme: string) => void;
}

export let ThemeContext = React.createContext({} as ThemeContextValue);

interface ThemeProviderProps<T> {
  themes: T[];
  defaultTheme: T;
  children: React.ReactChild;
}

export function ThemeProvider<T extends string>(props: ThemeProviderProps<T>) {
  let [theme, setTheme] = React.useState(props.defaultTheme);

  let changeTheme = (theme: any) => {
    setTheme(theme);
  };
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  let {theme, changeTheme}= React.useContext(ThemeContext)
  return {theme, changeTheme}
}

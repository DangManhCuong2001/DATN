import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  TTHEME_MODE,
  getThemeConfig,
  getThemedComponent,
} from "../../theme/theme";
import { BaseContextProps } from "../../global.config";
import {
  Theme,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  useMediaQuery,
} from "@mui/material";
import { deepmerge } from "@mui/utils";

export interface ThemeContextProps {
  toggleThemeMode: () => void;
  mode?: TTHEME_MODE;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export function ThemeCustomProvider({ children }: BaseContextProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<TTHEME_MODE>((): TTHEME_MODE => {
    let initialMode = localStorage.getItem("theme") as TTHEME_MODE;
    if (!initialMode) {
      initialMode = prefersDarkMode ? "dark" : "light";
      localStorage.setItem("theme", initialMode);
    }
    return initialMode;
    // return 'light';
  });

  const toggleThemeMode = useCallback(() => {
    setMode((prevMode: TTHEME_MODE) => {
      const newMode: TTHEME_MODE = prevMode === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newMode);
      return newMode;
      // return 'light';
    });
  }, []);

  const theme = useMemo<Theme>(() => {
    const _t = createTheme(getThemeConfig(mode));
    return responsiveFontSizes(deepmerge(_t, getThemedComponent(_t)));
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ toggleThemeMode }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {/* <CssBaseline />
                <BaseChartStyle /> */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);

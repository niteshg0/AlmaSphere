import { createContext,  } from "react";

export const ThemeContext= createContext();

export const ThemeProvider= ({children})=>{
    const [isDarkTheme, toggleTheme]= useTheme();
    return (
        <ThemeContext.Provider values= {{isDarkTheme, toggleTheme}}>
            {children}
        </ ThemeContext.Provider>
    )
}
import { useState } from "react"

export const useTheme= ()=>{

    let mode= true;

    const savedTheme= localStorage.getItem("theme");
    if(savedTheme){
        mode= savedTheme==="dark";
    } else{
        mode= false;
    }

    const [isDarkTheme, setIsDarkTheme]= useState(mode);

    useEffet(()=>{
        localStorage.setItem("theme", isDarkTheme? "dark": "light");
        
    }, [isDarkTheme])

    const toggleTheme= ()=>{
        setIsDarkTheme(!isDarkTheme);
    }

    return {isDarkTheme, toggleTheme};
}
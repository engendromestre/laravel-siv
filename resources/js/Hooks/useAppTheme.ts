import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { darkTheme, lightTheme } from "@/Config/theme";

export function useAppTheme() {
    const [theme, setTheme] = useState(darkTheme);
    const [soredThemeMode, setStoredThemeMode] = useLocalStorage<
        "dark" | "light"
    >("themeMode", "dark");

    const toggleTheme = () => {
        const currentTheme = theme.palette.mode === "dark" ? lightTheme : darkTheme;
        setTheme(currentTheme);
        setStoredThemeMode(currentTheme.palette.mode);
    };

    useEffect(() => {
        const currentTheme = soredThemeMode === "dark" ? darkTheme : lightTheme;
        if (currentTheme) {
            setTheme(currentTheme);
        }
    }, [soredThemeMode]);

    return [theme, toggleTheme] as const;
}
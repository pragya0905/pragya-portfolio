import { useSyncExternalStore } from "react";

const THEME_EVENT = "themechange";

function readTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(callback) {
  document.addEventListener(THEME_EVENT, callback);
  return () => document.removeEventListener(THEME_EVENT, callback);
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  document.dispatchEvent(new Event(THEME_EVENT));
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return { theme, toggleTheme };
}

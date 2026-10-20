import { useEffect, useState } from "react";

/**
 * Per-window conveniences (a width, a layout, which shelves are open). Storage can be missing or throw (a private
 * window, blocked site data), so every read has a default and every write may silently not last.
 */
let prefix = "siso:";
export function setPersistPrefix(p: string) {
  prefix = p;
}
export function load<T>(key: string, fallback: T): T {
  try {
    const v = window.localStorage.getItem(prefix + key);
    return v === null ? fallback : (JSON.parse(v) as T);
  } catch {
    return fallback;
  }
}
export function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(prefix + key, JSON.stringify(value));
  } catch {
    /* lasts this session only */
  }
}
/** useState that remembers its value under `key`. */
export function usePersisted<T>(key: string, fallback: T) {
  const [v, setV] = useState<T>(() => load(key, fallback));
  useEffect(() => save(key, v), [key, v]);
  return [v, setV] as const;
}

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const result = matchMedia(query);
    setValue(result.matches);
    setMounted(true);

    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    result.addEventListener("change", onChange);
    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return { matches: value, mounted };
}

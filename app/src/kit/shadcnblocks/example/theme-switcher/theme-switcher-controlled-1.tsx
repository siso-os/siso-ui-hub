"use client";

import { useState } from "react";
import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";

export const title = "Controlled switcher";

const Example = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  return (
    <div className="flex flex-col items-start gap-2">
      <ThemeSwitcher onChange={setTheme} value={theme} />
      <p className="text-sm text-muted-foreground">Selected theme: {theme}</p>
    </div>
  );
};

export default Example;

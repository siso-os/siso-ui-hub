// Hand-wired: the switch inside a preview panel that plays the "eclipse" theme transition Arc's site runs on click
import { ThemeSwitch } from "../theme-switch/theme-switch";
import { ThemeStage } from "@/arc-shims/theme-stage";

export default function ThemeSwitchDemo() {
  return <ThemeStage variant="eclipse">{(theme, change) => <ThemeSwitch theme={theme} variant="eclipse" iconOnly onThemeChange={change} />}</ThemeStage>;
}

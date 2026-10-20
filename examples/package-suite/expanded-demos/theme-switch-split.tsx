// uihub: siso:package-workbench
// Hand-wired: the switch inside a preview panel that plays the "split" theme transition Arc's site runs on click
import { ThemeSwitch } from "@siso/ui/atoms/source";
import { ThemeStage } from "./theme-stage";

export default function ThemeSwitchDemo() {
  return <ThemeStage variant="split">{(theme, change) => <ThemeSwitch theme={theme} variant="split" iconOnly onThemeChange={change} />}</ThemeStage>;
}

// uihub: siso:package-workbench
// Hand-wired: the switch inside a preview panel that plays the "reveal" theme transition Arc's site runs on click
import { ThemeSwitch } from "@siso/ui/atoms/source";
import { ThemeStage } from "./theme-stage";

export default function ThemeSwitchDemo() {
  return <ThemeStage variant="reveal">{(theme, change) => <ThemeSwitch theme={theme} variant="reveal" iconOnly onThemeChange={change} />}</ThemeStage>;
}

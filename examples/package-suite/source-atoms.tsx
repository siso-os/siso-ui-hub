// uihub: siso:package-workbench
import { useState, type ComponentType } from "react";
import { motionTokens } from "@siso/ui/atoms/source";
import "@siso/ui/atoms/source.css";
import DemoButton from "./atom-demos/button";
import DemoActionButton from "./atom-demos/action-button";
import DemoSplitButton from "./atom-demos/split-button";
import DemoButtonGroup from "./atom-demos/button-group";
import DemoCopyButton from "./atom-demos/copy-button";
import DemoConfirmMorph from "./atom-demos/confirm-morph";
import DemoHoldToConfirm from "./atom-demos/hold-to-confirm";
import { EmailField as DemoInput } from "./atom-demos/input";
import { BioField as DemoTextarea } from "./atom-demos/textarea";
import { MemberFilter as DemoSearchField } from "./atom-demos/search-field";
import { SignInPassword as DemoPasswordField } from "./atom-demos/password-field";
import { SeatsField as DemoNumberField } from "./atom-demos/number-field";
import { VerifyCode as DemoOtpInput } from "./atom-demos/otp-input";
import { TermsCheckbox as DemoCheckbox } from "./atom-demos/checkbox";
import { NotificationsToggle as DemoSwitch } from "./atom-demos/switch";
import { PlanPicker as DemoRadioGroup } from "./atom-demos/radio-group";
import { RangeToggle as DemoSegmentedControl } from "./atom-demos/segmented-control";
import { PriceFilter as DemoSlider } from "./atom-demos/slider";
import { RegionSelect as DemoSelect } from "./atom-demos/select";
import { LabelPicker as DemoMultiSelect } from "./atom-demos/multi-select";
import DemoBadge from "./atom-demos/badge";
import { Owner as DemoAvatar } from "./atom-demos/avatar";
import { Collaborators as DemoAvatarGroup } from "./atom-demos/avatar-group";
import DemoProgress from "./atom-demos/progress";
import DemoSkeleton from "./atom-demos/skeleton";
import DemoTooltip from "./atom-demos/tooltip";
import { ProjectCard as DemoCard } from "./atom-demos/card";
import { ProjectTabs as DemoTabs } from "./atom-demos/tabs";
import { TopicsField as DemoTagInput } from "./atom-demos/tag-input";
import DemoInlineEdit from "./atom-demos/inline-edit";
import { NewPasswordField as DemoPasswordStrength } from "./atom-demos/password-strength";
import { StorageCard as DemoUsageMeter } from "./atom-demos/usage-meter";
import { BillingNotice as DemoAlert } from "./atom-demos/alert";
import DemoExpandingSearch from "./atom-demos/expanding-search";
import { ShippingSpeed as DemoRadioCards } from "./atom-demos/radio-cards";

type DemoEntry = {id:string;label:string;group:string;Demo:ComponentType};
export const sourceAtomDemos: DemoEntry[] = [
{ id: "button", label: "Button", group: "Actions", Demo: DemoButton },
{ id: "action-button", label: "Action Button", group: "Actions", Demo: DemoActionButton },
{ id: "split-button", label: "Split Button", group: "Actions", Demo: DemoSplitButton },
{ id: "button-group", label: "Button Group", group: "Actions", Demo: DemoButtonGroup },
{ id: "copy-button", label: "Copy Button", group: "Actions", Demo: DemoCopyButton },
{ id: "confirm-morph", label: "Confirm Morph", group: "Actions", Demo: DemoConfirmMorph },
{ id: "hold-to-confirm", label: "Hold To Confirm", group: "Actions", Demo: DemoHoldToConfirm },
{ id: "input", label: "Input", group: "Fields", Demo: DemoInput },
{ id: "textarea", label: "Textarea", group: "Fields", Demo: DemoTextarea },
{ id: "search-field", label: "Search Field", group: "Fields", Demo: DemoSearchField },
{ id: "password-field", label: "Password Field", group: "Fields", Demo: DemoPasswordField },
{ id: "number-field", label: "Number Field", group: "Fields", Demo: DemoNumberField },
{ id: "otp-input", label: "Otp Input", group: "Fields", Demo: DemoOtpInput },
{ id: "checkbox", label: "Checkbox", group: "Selection", Demo: DemoCheckbox },
{ id: "switch", label: "Switch", group: "Selection", Demo: DemoSwitch },
{ id: "radio-group", label: "Radio Group", group: "Selection", Demo: DemoRadioGroup },
{ id: "segmented-control", label: "Segmented Control", group: "Selection", Demo: DemoSegmentedControl },
{ id: "slider", label: "Slider", group: "Selection", Demo: DemoSlider },
{ id: "select", label: "Select", group: "Selection", Demo: DemoSelect },
{ id: "multi-select", label: "Multi Select", group: "Selection", Demo: DemoMultiSelect },
{ id: "badge", label: "Badge", group: "Feedback and content", Demo: DemoBadge },
{ id: "avatar", label: "Avatar", group: "Feedback and content", Demo: DemoAvatar },
{ id: "avatar-group", label: "Avatar Group", group: "Feedback and content", Demo: DemoAvatarGroup },
{ id: "progress", label: "Progress", group: "Feedback and content", Demo: DemoProgress },
{ id: "skeleton", label: "Skeleton", group: "Feedback and content", Demo: DemoSkeleton },
{ id: "tooltip", label: "Tooltip", group: "Feedback and content", Demo: DemoTooltip },
{ id: "card", label: "Card", group: "Feedback and content", Demo: DemoCard },
{ id: "tabs", label: "Tabs", group: "Selection", Demo: DemoTabs },
{ id: "tag-input", label: "Tag Input", group: "Fields", Demo: DemoTagInput },
{ id: "inline-edit", label: "Inline Edit", group: "Fields", Demo: DemoInlineEdit },
{ id: "password-strength", label: "Password Strength", group: "Fields", Demo: DemoPasswordStrength },
{ id: "usage-meter", label: "Usage Meter", group: "Feedback and content", Demo: DemoUsageMeter },
{ id: "alert", label: "Alert", group: "Feedback and content", Demo: DemoAlert },
{ id: "expanding-search", label: "Expanding Search", group: "Fields", Demo: DemoExpandingSearch },
{ id: "radio-cards", label: "Radio Cards", group: "Selection", Demo: DemoRadioCards }
];
const groups = [...new Set(sourceAtomDemos.map(entry => entry.group))];
export default function SourceAtomsPage() {
  const [selected, setSelected] = useState("button");
  const [theme, setTheme] = useState<"dark"|"light">("dark");
  const entry = sourceAtomDemos.find(item => item.id === selected) ?? sourceAtomDemos[0];
  const Demo = entry.Demo;
  return <section aria-label="Original Arc atoms">
    <header style={{display:"flex",justifyContent:"space-between",gap:16,flexWrap:"wrap",marginBottom:24}}>
      <div><h2 style={{margin:0}}>The original atoms</h2><p style={{margin:"8px 0 0",opacity:.65}}>35 free Arc families · original motion, styles and live demos</p></div>
      <label>Preview theme <select value={theme} onChange={event=>setTheme(event.target.value as "dark"|"light")}><option value="dark">Dark</option><option value="light">Light</option></select></label>
    </header>
    <div style={{display:"flex",gap:24,alignItems:"flex-start",flexWrap:"wrap"}}>
      <nav aria-label="Atom families" style={{flex:"1 1 210px",maxWidth:300,display:"grid",gap:20}}>
        {groups.map(group=><div key={group}><h3 style={{margin:"0 0 8px",fontSize:12,textTransform:"uppercase",letterSpacing:".1em",opacity:.6}}>{group}</h3><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{sourceAtomDemos.filter(item=>item.group===group).map(item=><button key={item.id} type="button" aria-pressed={item.id===selected} onClick={()=>setSelected(item.id)} style={{font:"inherit",fontSize:12,padding:"7px 10px",borderRadius:8,border:"1px solid var(--siso-border,#34343c)",background:item.id===selected?"var(--siso-accent,#ffa726)":"transparent",color:item.id===selected?"#17120a":"inherit",cursor:"pointer"}}>{item.label}</button>)}</div></div>)}
      </nav>
      <div style={{flex:"3 1 400px",minWidth:0}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:12,marginBottom:12}}><h3 style={{margin:0}}>{entry.label}</h3><a href={`https://uiarc.dev/components/${entry.id}`} target="_blank" rel="noreferrer" style={{fontSize:12,color:"inherit"}}>Original documentation ↗</a></div>
        <div className="arc-scope" data-theme={theme} data-accent="orange" style={{minHeight:360,padding:"clamp(20px,4vw,48px)",border:"1px solid var(--border)",borderRadius:16,background:"var(--background)",color:"var(--foreground)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,lineHeight:1.5}}>
          <div key={`${entry.id}-${theme}`} style={{width:"100%",maxWidth:640,display:"flex",justifyContent:"center",alignItems:"center"}}><Demo/></div>
        </div>
        <p style={{fontSize:12,opacity:.65,lineHeight:1.6}}>The original interactive documentation example runs through <code>@siso/atoms/source</code>, using the shared {motionTokens.spring.snappy.visualDuration}s spring. Select another family to explore its full demo.</p>
      </div>
    </div>
  </section>;
}
export { SourceAtomsPage };

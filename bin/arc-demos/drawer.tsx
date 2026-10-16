// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
import type { CSSProperties } from "react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from "../drawer/drawer";
import { Button } from "../button/button";

const field: CSSProperties = { display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 500 };
const control: CSSProperties = {
  font: "inherit",
  fontWeight: 400,
  color: "inherit",
  background: "transparent",
  border: "1px solid color-mix(in srgb, currentColor 22%, transparent)",
  borderRadius: 8,
  padding: "8px 10px",
};

/** The `FilterForm` the docs example renders but never defines. */
function FilterForm() {
  const [status, setStatus] = useState("active");
  const [region, setRegion] = useState("all");
  const [mineOnly, setMineOnly] = useState(false);
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <label style={field}>
        Status
        <select style={control} value={status} onChange={event => { console.info("Filter status", event.target.value); setStatus(event.target.value); }}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="archived">Archived</option>
        </select>
      </label>
      <label style={field}>
        Region
        <select style={control} value={region} onChange={event => { console.info("Filter region", event.target.value); setRegion(event.target.value); }}>
          <option value="all">Everywhere</option>
          <option value="us">United States</option>
          <option value="eu">Europe</option>
          <option value="apac">Asia Pacific</option>
        </select>
      </label>
      <label style={{ ...field, flexDirection: "row", alignItems: "center", gap: 8 }}>
        <input type="checkbox" checked={mineOnly} onChange={event => { console.info("Only mine", event.target.checked); setMineOnly(event.target.checked); }} />
        Only projects I own
      </label>
      <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>
        {[
          status === "all" ? "Every status" : status[0]!.toUpperCase() + status.slice(1),
          region === "all" ? "everywhere" : region.toUpperCase(),
          mineOnly ? "mine only" : "the whole team",
        ].join(" · ")}
      </p>
    </div>
  );
}

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Filters</Button>
      </DrawerTrigger>
      <DrawerContent title="Filters" description="Narrow the list of projects.">
        <FilterForm />
        <DrawerClose asChild>
          <Button>Apply</Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}

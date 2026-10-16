// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
import { CreditCard, Settings, UserRound } from "lucide-react";
import { UserMenu } from "../user-menu/user-menu";

export default function UserMenuDemo() {
  const [themePreference, setThemePreference] = useState<"light" | "dark" | "system">("dark");
  const [last, setLast] = useState<string | null>(null);
  const user = { name: "Alex Morgan", email: "alex@example.com" };

  async function openDestination(where: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.info("Opening", where);
    setLast(where);
  }

  async function signOut() {
    await new Promise((resolve) => setTimeout(resolve, 700));
    console.info("Signed out of the workspace");
    setLast("Signed out");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 460 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "10px 14px",
          borderRadius: 14,
          border: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 500 }}>Acme Workspace</span>
        <UserMenu
          user={{ ...user, plan: "Pro" }}
          showName
          onThemeChange={setThemePreference}
          items={[
            { label: "Profile", icon: <UserRound size={16} />, onSelect: () => openDestination("Profile") },
            { label: "Settings", icon: <Settings size={16} />, keys: ["⌘", ","], onSelect: () => openDestination("Settings") },
            { label: "Billing", icon: <CreditCard size={16} />, onSelect: () => openDestination("Billing") },
          ]}
          onSignOut={() => signOut()}
        />
      </div>
      <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>
        Theme preference {themePreference}
        {last ? ` · last destination ${last}` : ""}
      </p>
    </div>
  );
}

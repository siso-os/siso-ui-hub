// Hand-wired: Arc's docs example plus the state and sample data it references
import { useEffect, useState } from "react";
// From Arc's docs page (Usage), imports pointed at the copied source
import { Skeleton } from "@siso/atoms/source";

type User = { id: string; name: string; role: string; email: string };

export function Profile({ user }: { user?: User }) {
  return (
    <Skeleton avatar lines={2} loading={!user}>
      {user && <ProfileCard user={user} />}
    </Skeleton>
  );
}

function ProfileCard({ user }: { user: User }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <strong>{user.name}</strong>
      <span>{user.role}</span>
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </div>
  );
}

const loadedUser: User = { id: "u_4815", name: "Maya Chen", role: "Design lead", email: "maya@northwind.co" };

export default function SkeletonDemo() {
  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    const timer = setTimeout(() => setUser(loadedUser), 2000);
    return () => clearTimeout(timer);
  }, []);
  return <Profile user={user} />;
}

// uihub: siso:package-workbench

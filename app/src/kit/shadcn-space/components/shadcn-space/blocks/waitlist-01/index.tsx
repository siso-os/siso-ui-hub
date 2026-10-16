import EarlyAccess from "./waitlist";

const avatarList = [
  { image: "https://images.shadcnspace.com/assets/profiles/jenny.webp", fallback: "JD" },
  { image: "https://images.shadcnspace.com/assets/profiles/ben.webp", fallback: "SK" },
  { image: "https://images.shadcnspace.com/assets/profiles/rough.webp", fallback: "ML" },
];

const EarlyAccess01 = () => {
  return <EarlyAccess avatarList={avatarList} />;
};

export default EarlyAccess01;
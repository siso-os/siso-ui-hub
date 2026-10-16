import Navbar from "./navbar";
import { NavLinkItem } from "./navlink";
import HeroSection from "./hero";

const HeroPage = () => {
  const navigationData: NavLinkItem[] = [
    { title: "Home", href: "#", isActive: true },
    { title: "Properties", href: "#", isActive: false },
    { title: "Blog", href: "#", isActive: false },
    { title: "Contact", href: "#", isActive: false },
    { title: "Docs", href: "#", isActive: false },
  ];
  return (
    <>
      <Navbar navigationData={navigationData} />
      <main className="-mt-20">
        <HeroSection />
      </main>
    </>
  );
};

export default HeroPage;

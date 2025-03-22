import { useState, useEffect } from "react";
import SideBar from "../SideBar"; // Seu sidebar desktop
import SideBarMobile from "../SideBarMobile"; // Seu sidebar mobile

export default function SidebarSwitcher() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    
    // Limpa o event listener quando o componente desmonta
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <SideBarMobile /> : <SideBar />;
}
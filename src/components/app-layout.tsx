import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

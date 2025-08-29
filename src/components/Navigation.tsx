import { Button } from "@/components/ui/button";
import { Menu, X, Zap, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthCookie } from "@/hooks/use-cookie";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { getAuthCookie, removeAuthCookie } = useAuthCookie();

  const isAuthenticated = !!getAuthCookie();



  const publicNavItems = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
  ];



  const navItems = publicNavItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-1.5 sm:gap-2 font-bold text-lg sm:text-xl"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
            </div>
            <span className="text-gradient">InkCopilot</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-3 lg:gap-4">
              {isAuthenticated ? (
                <Button 
                    variant="hero" 
                    size="sm" 
                    asChild
                    className="h-8 px-3 lg:h-9 lg:px-4"
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild 
                    className="border-white/10 hover:border-primary h-8 px-3 lg:h-9 lg:px-4"
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button 
                    variant="hero" 
                    size="sm" 
                    asChild
                    className="h-8 px-3 lg:h-9 lg:px-4"
                  >
                    <Link to="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

                  {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4 animate-in slide-in-from-top">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary px-1 py-1.5 rounded-lg ${
                    isActive(item.path) 
                      ? "text-primary bg-primary/5" 
                      : "text-muted-foreground hover:bg-white/5"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-white/10 my-2" />
              <div className="flex flex-col gap-2">
                {isAuthenticated ? (
                  <Button 
                      variant="hero" 
                      size="sm" 
                      className="w-full justify-center h-9" 
                      asChild
                    >
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        Dashboard
                      </Link>
                    </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-white/10 hover:border-primary justify-center h-9"
                      asChild
                    >
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button 
                      variant="hero" 
                      size="sm" 
                      className="w-full justify-center h-9" 
                      asChild
                    >
                      <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
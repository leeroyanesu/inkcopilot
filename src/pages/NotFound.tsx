import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 sm:py-24">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl sm:text-8xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button variant="default" size="lg" asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

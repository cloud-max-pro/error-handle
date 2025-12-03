import { Link } from "react-router-dom";
import { Menu, Home, Compass, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="lg:hidden text-muted-foreground hover:text-foreground">
              <Menu className="h-5 w-5" />
            </Button>
            
            <Link to="/" className="flex items-center gap-2 group">
              <img src={logo} alt="Gear5TV" className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Gear5TV
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
                <Compass className="h-4 w-4" />
                Browse
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
                <Clock className="h-4 w-4" />
                Recent
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
                <Star className="h-4 w-4" />
                Top Rated
              </Button>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
};

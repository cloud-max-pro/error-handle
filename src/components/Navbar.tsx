import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Gear5TV" className="h-10 w-10" />
              <span className="text-2xl font-bold text-primary">Gear5TV</span>
            </Link>
          </div>

          <div className="hidden md:block flex-1">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
};

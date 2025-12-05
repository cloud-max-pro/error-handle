import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Menu, Home, Compass, Star, X, Tv, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/?view=browse", label: "Browse", icon: Compass },
    { to: "/?view=networks", label: "Networks", icon: Tv },
    { to: "/?view=top-rated", label: "Top Rated", icon: Star },
    { to: "/pub-stream", label: "Pub Stream", icon: Play },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4 lg:gap-6">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              <Link to="/" className="flex items-center gap-2 group">
                <img src={logo} alt="Gear5TV" className="h-10 w-10 md:h-12 md:w-12" />
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Gear5TV
                </span>
              </Link>

              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to}>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex-1 max-w-md mx-2 md:mx-4 hidden sm:block">
              <SearchBar />
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="sm:hidden pb-3">
            <SearchBar />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-16 left-0 right-0 bg-background border-b border-border z-40 lg:hidden transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground gap-3">
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

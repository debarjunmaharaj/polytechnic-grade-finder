
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserCircle, Users, School, Calendar, MapPin, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";

const Header = () => {
  const { isLoggedIn, logout } = useAppContext();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const links = [
    { name: "Individual Results", path: "/", icon: <UserCircle className="h-4 w-4 mr-1" /> },
    { name: "Group Results", path: "/group-results", icon: <Users className="h-4 w-4 mr-1" /> },
    { name: "Institute Results", path: "/institute-results", icon: <School className="h-4 w-4 mr-1" /> },
    { name: "Latest Results", path: "/latest-results", icon: <Calendar className="h-4 w-4 mr-1" /> },
    { name: "Point Results", path: "/point-results", icon: <MapPin className="h-4 w-4 mr-1" /> },
    { name: "Favorites", path: "/favorites", icon: <Heart className="h-4 w-4 mr-1" /> },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full">
      <div className="bg-bteb-primary text-white">
        <div className="container flex items-center justify-between py-3">
          <Link to="/" className="text-xl font-bold">BTEB Results Zone</Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {isLoggedIn && (
              <Link to="/admin">
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-bteb-secondary">
                  Admin Dashboard
                </Button>
              </Link>
            )}
            {location.pathname === "/admin" && isLoggedIn && (
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-bteb-secondary" onClick={logout}>
                Logout
              </Button>
            )}
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={toggleMobileMenu}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <nav className="bg-bteb-secondary text-white">
        <div className="container hidden md:flex items-center py-2">
          {links.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "px-3 py-1 flex items-center text-sm hover:bg-bteb-primary rounded transition-colors",
                location.pathname === link.path && "bg-bteb-primary"
              )}
            >
              {link.icon}
              {link.name}
              {link.name === "Point Results" && <span className="ml-1 text-xs bg-bteb-accent text-black px-1 rounded">New</span>}
            </Link>
          ))}
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden p-2 bg-bteb-secondary">
            <div className="flex flex-col space-y-2">
              {links.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={cn(
                    "px-3 py-2 flex items-center text-sm hover:bg-bteb-primary rounded transition-colors",
                    location.pathname === link.path && "bg-bteb-primary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.name}
                  {link.name === "Point Results" && <span className="ml-1 text-xs bg-bteb-accent text-black px-1 rounded">New</span>}
                </Link>
              ))}
              
              {isLoggedIn && (
                <Link 
                  to="/admin"
                  className="px-3 py-2 flex items-center text-sm hover:bg-bteb-primary rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserCircle className="h-4 w-4 mr-1" />
                  Admin Dashboard
                </Link>
              )}
              
              {location.pathname === "/admin" && isLoggedIn && (
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-bteb-primary" onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}>
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
      
      {/* Notification bar */}
      <div className="bg-bteb-light text-bteb-primary p-2 text-sm text-center">
        রেজাল্টের নতুন ফরম্যাটে কারো ডাটাবেজে ডাউনলোড করতে এবং মুদ্রণ করার মেনু পাবেন। ভাই আপনাকে এডমিনকে ধন্যবাদ।
        <a href="#" className="text-blue-600 hover:underline ml-1">PDF ডাউনলোড করুন</a>
      </div>
    </header>
  );
};

export default Header;

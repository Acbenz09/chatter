import { RiMailFill } from "@remixicon/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 h-16 border-b">
      <div className="container mx-auto flex h-full w-full items-center px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="font-space-grotesk text-foreground flex items-center gap-1 font-bold">
              <RiMailFill size={22} />
              <p className="text-xl uppercase">Daak</p>
            </div>
          </div>

          <nav className="hidden items-center space-x-4 text-sm font-medium md:flex">
            <Link to="#features">Features</Link>
            <Link to="#about">About</Link>

            <div className="flex items-center space-x-4">
              <Button variant="secondary" size={"sm"}>
                Sign In
              </Button>
              <Button size={"sm"}>Register</Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

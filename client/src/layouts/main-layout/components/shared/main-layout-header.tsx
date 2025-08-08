import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RiMailFill, RiSearchEyeFill } from "@remixicon/react";

export function MainLayoutHeader() {
  return (
    <header className="bg-background sticky top-0 z-10 h-14 w-full border-b">
      <div className="container mx-auto flex h-full w-full items-center justify-between px-4">
        <Link to={"/"} className="size-6">
          <RiMailFill className="size-full" />
        </Link>
        <Button size={"sm"} variant={"outline"}>
          <RiSearchEyeFill />
          Search Daak
        </Button>
      </div>
    </header>
  );
}

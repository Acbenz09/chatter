import { v4 as uuidV4 } from "uuid";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  RiBookmarkFill,
  RiHome9Fill,
  RiLogoutBoxRFill,
  RiMailFill,
  RiNotification3Fill,
  RiSearchEyeFill,
  RiSettings2Fill,
  RiUser6Fill,
  type RemixiconComponentType,
} from "@remixicon/react";
import { Link } from "react-router-dom";

type SidebarLinkType = {
  href: string;
  label: string;
  icon: RemixiconComponentType;
};

const SidebarLinks: SidebarLinkType[] = [
  {
    href: "/",
    label: "Daak",
    icon: RiMailFill,
  },
  {
    href: "/",
    label: "Home",
    icon: RiHome9Fill,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: RiUser6Fill,
  },
  {
    href: "/search",
    label: "Search",
    icon: RiSearchEyeFill,
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: RiNotification3Fill,
  },
  {
    href: "/bookmarks",
    label: "Bookmarks",
    icon: RiBookmarkFill,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: RiSettings2Fill,
  },
];

export function MainLayoutSidebar() {
  return (
    <aside className="sticky top-0 max-h-screen min-h-screen w-12 flex-shrink-0 border-r md:w-16">
      <div className="sticky top-14 flex h-full w-full flex-col items-center justify-between py-2.5 sm:py-4">
        <nav className="flex w-full flex-col space-y-4">
          {SidebarLinks.map((d: SidebarLinkType) => (
            <Tooltip key={d.href + uuidV4()}>
              <TooltipTrigger
                className={cn(
                  d.label.toLowerCase() === "search" && "md:hidden",
                )}
              >
                <Link
                  to={d.href}
                  className={cn(
                    buttonVariants({
                      size: "icon",
                      variant:
                        d.label.toLowerCase() === "daak"
                          ? "default"
                          : "secondary",
                    }),
                    d.label.toLowerCase() === "daak" && "mb-4",
                  )}
                >
                  <d.icon />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{d.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"icon"} variant={"destructive"}>
              <RiLogoutBoxRFill />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Sign Out</TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
}

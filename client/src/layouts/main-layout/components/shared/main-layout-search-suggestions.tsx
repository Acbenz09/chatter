import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { suggestedNewsletters, suggestedUsers } from "@/data";
import { RiSearchEyeFill } from "@remixicon/react";
import { NewsletterTopicSlider } from "./newsletter-topics";

export function MainLayoutSearchSuggestions() {
  return (
    <div className="space-y-8">
      <div className="space-y-4 py-4">
        <h2 className="text-sm font-medium">Search everything in Daak.</h2>
        <Button
          variant={"outline"}
          className="text-muted-foreground flex w-full items-center justify-start"
        >
          <RiSearchEyeFill />
          Search Daak...
        </Button>
      </div>
      <Separator />

      <NewsletterTopicSlider />

      <Separator />

      <div className="space-y-4">
        <h2 className="text-sm font-medium">Suggested Newsletters.</h2>
        <div className="flex flex-col space-y-4 select-none">
          {suggestedNewsletters.slice(0, 5).map((d) => (
            <div
              key={d.id}
              className="hover:bg-muted bg-muted/50 flex cursor-pointer items-center gap-2 rounded-md px-2 py-3 transition-all"
            >
              <div className="bg-secondary size-11 shrink-0 overflow-hidden rounded-md">
                <img
                  src="./newsletter-avatar.png"
                  alt={d.newsletter}
                  className="size-full"
                />
              </div>
              <div>
                <h2 className="line-clamp-1 font-medium">{d.newsletter}</h2>
                <p className="text-muted-foreground line-clamp-1 text-sm font-medium">
                  @{d.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h2 className="text-sm font-medium">Users You Can Follow.</h2>
        <div className="flex flex-col select-none">
          {suggestedUsers.slice(0, 5).map((d) => (
            <div key={d.id}>
              <div className="hover:bg-muted/10 flex cursor-pointer items-center gap-2 px-2 py-3 transition-all">
                <div className="bg-secondary size-11 shrink-0 overflow-hidden rounded-md">
                  <img
                    src="./user-avatar.svg"
                    alt={d.username}
                    className="size-full"
                  />
                </div>
                <div>
                  <h2 className="line-clamp-1 font-medium">{d.fullName}</h2>
                  <p className="text-muted-foreground line-clamp-1 text-sm font-medium">
                    @{d.username}
                  </p>
                </div>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

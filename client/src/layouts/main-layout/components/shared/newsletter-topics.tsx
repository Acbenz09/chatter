import { Badge } from "@/components/ui/badge";
import { newsletterTopics } from "@/data";
import { RiArrowLeftFill, RiArrowRightFill } from "@remixicon/react";
import { useRef } from "react";

export function NewsletterTopicSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="text-sm font-medium">Newsletter Topics</h2>
      <div className="relative w-full">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="bg-secondary border-border absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-pointer rounded-full border p-1 shadow"
        >
          <RiArrowLeftFill size={20} />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex space-x-2 overflow-x-auto scroll-smooth px-8 py-2 whitespace-nowrap"
        >
          {newsletterTopics.map((topic, idx) => (
            <Badge role="button" key={topic + idx}>
              {topic}
            </Badge>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="bg-secondary border-border absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer rounded-full border p-1 shadow"
        >
          <RiArrowRightFill size={20} />
        </button>
      </div>
    </div>
  );
}

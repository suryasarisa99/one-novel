import { useEffect, useRef } from "react";
import WriterSection1 from "./(writer)/WriterSection";
import WriterSection2 from "./(writer)/WriterSection2";
import WriterSection3 from "./(writer)/WriterSection3";
import HomeSection from "./HomeSection";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import TopBar from "./TopBar";

export default function HorizontalCarousel() {
  // const timeoutRef = useRef();
  const hcarouselREf = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  function autoScroll() {
    if (hcarouselREf.current) {
      if (
        hcarouselREf.current.scrollWidth -
          (hcarouselREf.current.scrollLeft + hcarouselREf.current.clientWidth) <
        20
      ) {
        // hcarouselREf.current.scrollLeft = 0;
        hcarouselREf.current.scrollTo({ left: 0, behavior: "instant" });
      } else hcarouselREf.current.scrollBy({ left: 300, behavior: "smooth" });

      console.log(
        hcarouselREf.current.scrollWidth -
          (hcarouselREf.current.scrollLeft + hcarouselREf.current.clientWidth)
      );
    }
    timeoutRef.current = window.setTimeout(autoScroll, 1800);
  }

  function handleScroll(e: Event) {
    if (scrollTimeoutRef.current !== null) {
      clearTimeout(scrollTimeoutRef.current);
    }
    clearTimeout(timeoutRef.current as number);
    scrollTimeoutRef.current = window.setTimeout(() => {
      autoScroll();
    }, 2500);
    // Wait for 2 seconds before auto scrolling again
  }

  function stopAutoScroll() {
    clearTimeout(timeoutRef.current as number);
    clearTimeout(scrollTimeoutRef.current as number);
  }

  useEffect(() => {
    // setTimeout(() => {
    //   autoScroll();
    // }, 2500);
    // hcarouselREf.current?.addEventListener("scroll", handleScroll);
    // return () => {
    //   hcarouselREf.current?.removeEventListener("scroll", handleScroll);
    //   clearTimeout(timeoutRef.current as number);
    //   clearTimeout(scrollTimeoutRef.current as number);
    // };
  }, []);

  return (
    <div className="horizontal-carousel-outer home-page-section">
      <TopBar stopAutoScroll={stopAutoScroll} />
      <div
        className="horizontal-carousel home-pagex-section"
        ref={hcarouselREf}
      >
        <HomeSection />
        <WriterSection1 />
        <WriterSection2 />
        <WriterSection3 />
      </div>
    </div>
  );
}

// export default function HorizontalCarousel() {
//   return (
//     <Carousel
//       // autoPlay
//       infiniteLoop
//       showStatus={false}
//       showIndicators={true}
//       showThumbs={true}
//       interval={3000}
//       // emulateTouch
//     >
//       <HomeSection />
//       <WriterSection1 />
//       <WriterSection2 />
//     </Carousel>
//   );
// }

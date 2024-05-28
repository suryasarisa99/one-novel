import WriterSection1 from "./(writer)/WriterSection";
import WriterSection2 from "./(writer)/WriterSection2";
import WriterSection3 from "./(writer)/WriterSection3";
import HomeSection from "./HomeSection";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function HorizontalCarousel() {
  return (
    <div className="horizontal-carousel home-pagex-section">
      <HomeSection />
      {/* <WriterSection1 /> */}
      {/* <WriterSection2 /> */}
      {/* <WriterSection3 /> */}
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

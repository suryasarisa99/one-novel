import Image from "next/image";
import img from "@/public/writer/w1.jpg";

export default function WriterSection1() {
  return (
    <div className="horizontal-section sec1">
      <div className="content">
        <div className="writer-img">
          <img
            src={"/writer/w1.jpg"}
            className="writer-img"
            alt="writer-image"
          />
          {/* <Image
            src={img}
            className="writer-img"
            alt="writer-image"
            width={200}
          /> */}
        </div>
        <div className="right">Writer&apos;s Benfit Program</div>
      </div>
    </div>
  );
}

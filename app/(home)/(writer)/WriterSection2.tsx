import img from "@/public/writer/w2.jpg";
import { motion } from "framer-motion";

export default function WriterSection2() {
  const features = [
    {
      num: "01",
      title: "Originality",
      des: "Submit only original works",
    },
    {
      num: "02",
      title: "Content",
      des: "All genres accepted, but not explict content and hate speech",
    },
    {
      num: "03",
      title: "Word Count",
      des: "Minimum of 30,000 words",
    },
  ];
  return (
    <div className="horizontal-section sec2" id="w2">
      <div className="left">
        <h2 className="title">Submission Guidelines</h2>
        <motion.img
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          src="/writer/w2.jpg"
          alt="writer-img2"
        />
      </div>
      <div className="right">
        {features.map((feature, index) => (
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="feature"
            key={feature.num}
          >
            <span className="num">{feature.num}</span>
            <div>
              <div className="title">{feature.title}</div>
              <div className="desc">{feature.des}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

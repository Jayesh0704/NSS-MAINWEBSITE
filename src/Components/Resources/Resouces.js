import React from "react";
import styles from "./Resources.scss";
import ResCard from "./ResCard/ResCard";
import { motion } from "framer-motion";
import Footer from "../Footer/footer";
import { useSelector } from "react-redux";

const Resources = () => {
  const dataArray = useSelector((state) => state.resources);
  const filteredData = dataArray.map((resource) => {
    const linkArray = resource.linksString.map((link) => {
      return {
        title: link.children[0].text.split("=>")[0],
        href: link.children[0].text.split("=>")[1],
      };
    });
    return {
      title: resource.title,
      infoText: resource.infoText,
      links: linkArray,
    };
  });
  return (
    <React.Fragment>
      <img
        className={`${styles.hiddenimage} hiddenimage`}
        style={{
          position: "absolute",
          right: "85%",
          top: "6.5rem",
          zIndex: "-1",
        }}
        src="/assets/ellipse_blue.svg"
      ></img>
      <img
        className={`${styles.hiddenimage} hiddenimage`}
        style={{
          position: "absolute",
          right: "0%",
          top: "22rem",
          zIndex: "-1",
        }}
        src="/assets/ellipse_yellow.svg"
      ></img>
      <img
        className={`${styles.hiddenimage} hiddenimage`}
        style={{
          position: "absolute",
          right: "80%",
          top: "39rem",
          zIndex: "-1",
        }}
        src="/assets/magenta_blob.svg"
      ></img>
      <div className="resCon">
        <motion.div
          initial={{ opacity: 0 }} // Initial state (hidden)
          animate={{ opacity: 1 }} // Final state (visible)
          transition={{ duration: 1 }} // Duration of the animation in seconds
        >
          <div className="heading">Resources</div>
        </motion.div>
        <div className="resGrid">
          {filteredData.map((resource) => (
            <ResCard
              links={resource.links}
              title={resource.title}
              infoText={resource.infoText}
            ></ResCard>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }} // Initial state (hidden)
        animate={{ opacity: 1 }} // Final state (visible)
        transition={{ duration: 1 }} // Duration of the animation in seconds
      >
        <Footer />
      </motion.div>
    </React.Fragment>
  );
};

export default Resources;

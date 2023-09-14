import React from 'react';
import styles from "./ResCard.scss";

import {motion} from "framer-motion";


const ResCard = (props) => {
  
    return (
        <motion.div
      initial={{ x: '-100vw' }} // Initial position (outside of the viewport on the top)
      animate={{ y: 0 }} // Final position (y: 0 means no vertical translation)
      transition={{ duration: 1 }} // Duration of the animation in seconds
    >
        <div className="resCardCon">
            <div className="info">
                <div className="head">
                        {props.title}
                </div>
                <div className="infotext">
                    {props.infoText}
                </div>
            </div>
            <div className="linkslist">
                {props.links.map((link) =>
                    <div className="fancylink">
                        <a href={link.href} target="_blank">
                            <div className="linktitle">{link.title}</div>
                            <div className="goimg"></div>
                        </a>
                    </div>
                )}
            </div>
            </div>
            </motion.div>
    );
}

export default ResCard;
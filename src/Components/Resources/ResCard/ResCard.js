import React from 'react';
import styles from "./ResCard.scss";

import {motion} from "framer-motion";


const ResCard = (props) => {
  
    return (
        
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
    );
}

export default ResCard;
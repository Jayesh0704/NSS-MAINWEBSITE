import React, {useState} from 'react';
import classes from "./events.scss";
import { motion } from 'framer-motion';
import MobCard from './mobCard/mobCard';
import { useSelector} from 'react-redux';

const BlockContent = require('@sanity/block-content-to-react');

const Events = (props) => {

    

    const [eventIndex, setEventIndex] = useState(1);

    const [showModal, setShowModal] = useState({ show: false, index: 1 });
    
    const [eventData, setEventData] = useState(null);
    
    const [currentEvent, setCurrentEvent] = useState("Loading...");

    const initialEvent = props.match.params.id;

    
    const serializers = {
            types: {
                code: (props) => (
                <pre data-language={props.node.language}>
                    <code>{props.node.code}</code>
                </pre>
                ),
            },
        }

    const dataArray = useSelector((state) => state.events);

    function onClickChange(index) {
        setEventIndex(index);
        eventData.forEach((element) => {
            if (element.title === dataArray[index].title) {
                setCurrentEvent(<BlockContent blocks={element.body} serializers={serializers} dataset="production" projectId="9gzz7muj" />);
            }
        });
    }

    

    React.useEffect(() => {
        setEventData(dataArray);
        let i = 2;

        dataArray.forEach(
            (data, index) => {
                if (data.title === "Smile For A Shop") i = index;
            }
        )

        if (initialEvent){
            dataArray.forEach((val, ind) => {
            if (val.title === initialEvent) {
                i = ind;
            }
        });
        }
        
        setEventIndex(i);
        setCurrentEvent(<BlockContent blocks={dataArray[i].body} serializers={serializers} dataset="production" projectId="9gzz7muj" />);
    }, []);

    return (
        <React.Fragment>
            <div className={`${classes.contentBody} contentBody`}>
            <motion.div
            initial={{ x: '-100vw' }} // Initial position (outside of the viewport on the left)
            animate={{ x: 0 }} // Final position (x: 0 means no horizontal translation)
            transition={{ duration: 1 }} // Duration of the animation in seconds
          >
      
                    <aside className={`${classes.eveAside} eveAside`}>
                        {dataArray.map((event, index) =>
                            <button onClick={() => onClickChange(index)} style={eventIndex === index ? {background: `${dataArray[eventIndex].color}`} : null}>{event.title}</button>
                        )}
                    </aside>
                </motion.div>
                <motion.div
                initial={{ y: '100vh' }} // Initial position (outside of the viewport on the left)
                animate={{ y: '0vh' }} // Final position (x: 0 means no horizontal translation)
                transition={{ duration: 1 }} // Duration of the animation in seconds
              >
          
                    <div className={`${classes.mainContent} mainContentEve`} style={{ background: `${dataArray[eventIndex].color}` }}>
                        <h1>{ dataArray[eventIndex].title }</h1>
                        <div className="fetchedData">
                            {currentEvent}
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <div className={`${classes.mobileContent} mobileContent`}>
                <div className={`${classes.mobTitle} mobTitle`}>
                    Events
                </div>

                <div className="backMob" onClick={() => setShowModal({show: false})} style={ showModal.show ? {display: "block"} : {display: "none"}}>
                    <p><img src="assets/back.svg" style={{display:"inline"}}/> <span style={{fontSize:"1rem", marginLeft:"0.1rem"}}>Back</span></p>
                </div>

                <div className="mobCols" style={!showModal.show ? { display: "grid" } : { display: "none" }}>
                    <motion.div
                    initial={{ opacity: 0 }} // Initial state (hidden)
                    animate={{ opacity: 1 }} // Final state (visible)
                    transition={{ duration: 1 }}
                    >
                    {dataArray.map((event, i) =>
                        <MobCard
                            title={event.title}
                            img={event.logo_url}
                            color={event.color}
                            click={() => {
                                setShowModal({ show: true, index: i });
                                onClickChange(i);
                            }}
                        />)}
                        </motion.div>
                </div>

                
                    <div style={ showModal.show ? {display: "block", background:`${dataArray[eventIndex].color}`} : {display: "none"}} className="mobModal">
                        <h1>{ dataArray[eventIndex].title }</h1>
                        <div className="fetchedData">
                            {currentEvent}
                        </div>
                    </div>
                
            </div>
        </React.Fragment>
    );
}

export default Events;
import { useEffect, useState } from "react";
import "../css/main.css";
import "./NajjarDoc.scss";
import Modal from "../components/Modal";
import ReactLoading from 'react-loading';
import ReactMarkdown from "react-markdown";
// const gfm = require('remark-gfm');

function NajjarDoc({open, onClose = () => {console.log("You didn't put a onClose clause in this NajjarDoc...")}, data = []}) {

    const [markdown, setMarkdown] = useState('oie, kdkd')
    const [renderedEndpoint, setRenderedEndpoint] = useState(data[0]?.endpoint)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(renderedEndpoint) {
            setIsLoading(true)
            fetch(`https://najjar-pad.onrender.com/pad${renderedEndpoint}`)
            .then((res) => res.json())
            .then((data) => {
                if(data.success) {
                    if(data?.data) { //EXISTING PAD
                        setMarkdown(data.data.markdown);
                    } else {
                        setMarkdown(`Pad "*${renderedEndpoint}*" not found. Are you sure you are pointing to the right one?`)    
                    }
                } else {
                    setMarkdown(`Pad "*${renderedEndpoint}*" not found. Are you sure you are pointing to the right one?`)
                }
                setIsLoading(false);
            });
        }
    }, [renderedEndpoint])

    return (
        <Modal open={open}>
            <div className="navBarContainer">
                {data.map(({ label, endpoint }, index) => (
                    <div className={`option ${renderedEndpoint === endpoint ? "selected" : ""}`} onClick={() => setRenderedEndpoint(endpoint)} key={`option-${index}`}>
                        {label}
                    </div>
                ))}
                <div className="closeNajjarDoc" onClick={onClose} key="closeNajjarDoc">
                    X
                </div>
            </div>
            <div className={`najjarDocEditor`}>
                {isLoading ?
                <div className="teste">
                    <ReactLoading type={"spin"} color={"#2B6535"} height={75} width={75} />
                </div>
                :
                <ReactMarkdown 
                    children={markdown} 
                    // remarkPlugins={[gfm]}
                />
                }
            </div>
        </Modal>
    )
}

export default NajjarDoc;
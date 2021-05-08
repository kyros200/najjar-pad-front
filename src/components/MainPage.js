import { useState, useEffect, useRef } from "react";
import "react-markdown-editor-lite/lib/index.css";
import "../css/main.css";

import Children from './Children';
import Editor from './Editor';
import Modal from './Modal';

// const back_url = `http://localhost:80`;
const back_url = `https://najjar-pad.herokuapp.com/`;

function MainPage() {
    const [idPad, setIdPad] = useState();
    const [markdown, setMarkdown] = useState("");
    const [children, setChildren] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const idPadRef = useRef(idPad);
    idPadRef.current = idPad;

    const markdownRef = useRef(markdown);
    markdownRef.current = markdown;

    const getPad = () => {
        fetch(`${back_url}/pad${window.location.pathname}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.success) {
                if(data.data) { //EXISTING PAD
                    setIdPad(data.data.id_pad);
                    setMarkdown(data.data.markdown);
                    setChildren(data.children);
                }
            } else {
                setErrorMsg(data.data);
            }
        });
    }

    const savePad = () => {
        if(markdownRef.current) {
            fetch(`${back_url}/pad${window.location.pathname}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_pad: idPadRef.current,
                    markdown: markdownRef.current,
                })
            })
            .then((res) => res.json())
            .then((data) => {
                if(typeof data !== "string") { //insert
                    idPadRef.current = data[0];
                    setIdPad(data[0]);
                }
            });
        }
    }

    useEffect(() => {
        getPad();
        const interval = setInterval(savePad, 5000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className={`container`}>
            <Children children={children} />
            <Editor markdown={markdown} setMarkdown={setMarkdown} />
            <Modal errorMsg={errorMsg} />
        </div>
    );
}

export default MainPage;

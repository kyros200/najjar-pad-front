import { useState, useEffect, useCallback, useRef } from "react";
import ReactLoading from 'react-loading';

import Menu from './Menu';
import Editor from './Editor';
import Modal from './shared/Modal';
import SetPassword from "./SetPassword";

// const back_url = `http://localhost:80`;
const back_url = `https://najjar-pad.onrender.com`;

function MainPage() {
    const [idPad, setIdPad] = useState();
    const [open, setOpen] = useState(window.innerWidth > 800 ? true : false);
    const [markdown, setMarkdown] = useState("");
    const [children, setChildren] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [passModal, setPassModal] = useState(false);

    const [readOnly, setReadOnly] = useState(false);
    const [needPass, setNeedPass] = useState(false);

    const idPadRef = useRef(idPad);
    idPadRef.current = idPad;

    const markdownRef = useRef(markdown);
    markdownRef.current = markdown;

    const [lastSavedMarkdown, setLastSavedMarkdown] = useState("");
    const lastSavedMarkdownRef = useRef(lastSavedMarkdown);
    lastSavedMarkdownRef.current = lastSavedMarkdown;

    const getPad = useCallback(() => {
        if(window.location.pathname !== `/`){
            fetch(`${back_url}/security${window.location.pathname}`)
            .then((res) => res.json())
            .then((security) => {
                if(security.data.havePassword && !security.data.readOnly) {
                    console.log(`PRIVATE`);
                    setIsLoading(false);
                    setNeedPass(true)
                } else if (security.data.havePassword && security.data.readOnly) {
                    console.log(`READ ONLY`);
                    setReadOnly(true);
                    setOpen(false)
                    requestPad();
                } else {
                    console.log(`PUBLIC`);
                    requestPad();
                }
            });
        } else {
            setIsLoading(false);
        }
    }, [])

    const requestPad = () => {
        fetch(`${back_url}/pad${window.location.pathname}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.success) {
                if(data.data) { //EXISTING PAD
                    setIdPad(data.data.id_pad);
                    setMarkdown(data.data.markdown);
                    setLastSavedMarkdown(data.data.markdown);
                    setChildren(data.children);
                }
            } else {
                setErrorMsg(data.data);
            }

            setIsLoading(false);
        });
    }

    const savePad = () => {
        if(markdownRef.current !== lastSavedMarkdownRef.current) {
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
                    setLastSavedMarkdown(markdownRef.current);
                    if(typeof data !== "string") { //insert
                        idPadRef.current = data[0];
                        setIdPad(data[0]);
                    }
                });
            }
        }
    }

    const validatePass = (pass) => {
        setIsLoading(true)
        fetch(`${back_url}/security${window.location.pathname}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pass: pass
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.success) {
                setReadOnly(false);
                setNeedPass(false);
                requestPad();
            } else {
                setIsLoading(false);
            }
        });
    }

    const openPassModal = () => {
        setPassModal(true);
    }

    const setNewPass = (newPassword, newReadOnly) => {
        setIsLoading(true)
        try {
            fetch(`${back_url}/pad/setPass${window.location.pathname}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_pad: idPadRef.current,
                    pass: newPassword,
                    read_only: newReadOnly,
                })
            })
            .then((res) => res.json())
            .then((data) => {
                setIsLoading(false)
            });
        }
        catch(e) {
            console.log(e)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getPad();
        const interval = setInterval(savePad, 5000);
        return () => clearInterval(interval);
    }, [getPad]);

    return (
        <div className={`container`}>
            <Menu 
                openPassModal={openPassModal} 
                readOnly={readOnly} 
                needPass={needPass} 
                children={children} 
                open={open} 
                setOpen={setOpen} 
                validatePass={validatePass} 
            />
            {!isLoading &&
            <Editor 
                readOnly={readOnly} 
                needPass={needPass} 
                markdown={markdown} 
                setMarkdown={setMarkdown} 
                open={open} 
            />
            }
            <Modal open={!!errorMsg}>
                {errorMsg}
            </Modal>
            <Modal open={isLoading}>
                <ReactLoading type={"spin"} color={"#2B6535"} height={75} width={75} />
            </Modal>
            <Modal open={passModal}>
                <SetPassword setPassModal={setPassModal} setNewPass={setNewPass} />
            </Modal>
        </div>
    );
}

export default MainPage;

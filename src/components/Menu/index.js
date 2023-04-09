import { useState } from "react";
import NajjarDoc from '../shared/NajarDoc'
import NajjarDocImage from '../shared/NajarDoc/NajjarDocWhite.svg'
import "./menu.scss";

import Button from '../shared/Button'
import Input from '../shared/Input'
import Hatch from '../shared/Hatch'

function Menu(props) {
    const [newChildren, setNewChildren] = useState("");
    const [password, setPassword] = useState("");
    const [modalDoc, setModalDoc] = useState(false);

    const goToChildren = () => {
        if(newChildren !== "") {
            window.location.href += `/${newChildren}`;
        }
    }

    const goToFather = () => {
        let newPath = window.location.pathname.split("/");
        newPath.pop();

        window.location.href = `${window.origin}${newPath.join("/")}`;
    }

    const data = [
        {
            label: "Intro",
            endpoint: "/najjarpad"
        },
        {
            label: "Design Comments",
            endpoint: "/najjarpad/design"
        },
        {
            label: "Patch Note",
            endpoint: "/najjarpad/patchnote"
        }
    ]

    return (
        <div className={`childrenContainer ${props.open ? `` : "collapse"} ${window.location.pathname === `/` || props.needPass ? `wholePage` : ""}`}>
            <div className={`childrenInfo ${props.open ? `` : "collapse"}`}>
                <div className="top">
                    <div className={`header`}>
                        <a href="https://pad.najjar.dev" className="link">NajjarPad.</a>
                        <div className="najjarDocButton" onClick={() => setModalDoc(true)}>
                            <img src={NajjarDocImage} alt="NajjarDoc" />
                        </div>
                    </div>
                    <div className={`menuActions`}>
                        {(props.needPass || props.readOnly) &&
                        <div style={{display: `flex`, flexDirection: `column`}}>
                            {props.readOnly ?
                            <div className={`needPassText`}>
                                This is a Read Only Pad! Please enter the correct password to edit this Pad.
                            </div>
                            :
                            <div className={`needPassText`}>
                                This is a Private Pad! Please enter the correct password to view and edit this Pad.
                            </div>
                            }
                            <div className={`childrenCreateChildren breakLine`}>
                                <div className={`newChildrenName`}>
                                    <Input label={`Password`} value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <Button onClick={() => props.validatePass(password)}>
                                    Go!
                                </Button>
                            </div>
                        </div>
                        }

                        {(!props.needPass && !props.readOnly && window.location.pathname !== `/`) && 
                        <Button onClick={() => props.openPassModal()} className={`buttonSpace`}>
                            Set Password
                        </Button>
                        }

                        { window.location.pathname.split("/").length > 2 &&
                        <Button onClick={() => goToFather()} className={`buttonSpace`}>
                            Back to father Pad
                        </Button>
                        }

                        {window.location.pathname === `/` &&
                        <div className={`rootPageTextContainer`}>
                            <div className={`rootPageText`}>
                                Welcome to <Hatch text={`NajjarPad.`} />! Here you can organize yourself with Pads using Markdown. Try it out chosing a name! For tutorial, go to <a href="/tutorial">/tutorial</a>
                            </div>
                        </div>
                        }

                        {!props.needPass && !props.readOnly &&
                        <div className={`childrenCreateChildren`}>
                            <div className={`newChildrenName`}>
                                <Input label={`New pad`} value={newChildren} onChange={(e) => setNewChildren(e.target.value)} />
                            </div>
                            <Button onClick={() => goToChildren()}>
                                Go!
                            </Button>
                        </div>
                        }
                    </div>
                    <div className="childrenButtonsContainer">
                        {props.children.map((c) => 
                            <Button key={c} className={`childrenButton`} onClick={() => window.location.href = `${window.location.href}/${c}`}>
                                {c}
                            </Button>
                        )}
                    </div>
                </div>
                <div className={`footer`}>
                    <div className='text'>
                        <span className="hatch"><a href="https://hatch.najjar.dev" target="_blank" rel="noreferrer" className="link">Hatch.</a></span> know who I am.
                    </div>
                    <div className='text'>
                        {new Date().getFullYear()} Made by Rafael Najjar
                    </div>
                </div>
            </div>
            <div className={`childrenCollapse`} onClick={() => props.setOpen(!props.open) }>
                {props.open ? `<` : `>`}
            </div>
            <NajjarDoc 
                open={modalDoc}
                onClose={() => setModalDoc(false)}
                data={data}
            />
        </div>
    )
}

export default Menu;
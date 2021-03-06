import { useState } from "react";
import "../css/main.css";
import "../css/children.css";

function Children(props) {
    const [newChildren, setNewChildren] = useState("");
    const [password, setPassword] = useState("");

    const renderChildren = () => {
        return props.children.map((c) => 
            <div key={c} className={`childrenButton`} onClick={() => window.location.href = `${window.location.href}/${c}`}>
                {c}
            </div>
        )
    }

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

    return (
        <div className={`childrenContainer ${props.open ? `` : "collapse"} ${window.location.pathname === `/` || props.needPass ? `wholePage` : ""}`}>
            <div className={`childrenInfo ${props.open ? `` : "collapse"}`}>
                <div className={`title`}>
                    najjar-pad
                </div>
                <div className={`childrenActions`}>

                    {(props.needPass || props.readOnly) &&
                    <div style={{display: `flex`, flexDirection: `column`}}>
                        {props.readOnly ?
                        <div className={`needPassText`}>
                            This is a Read Only Pad! Please enter the correct password to edit this pad.
                        </div>
                        :
                        <div className={`needPassText`}>
                            This is a Private Pad! Please enter the correct password to view and edit this pad.
                        </div>
                        }
                        <div className={`childrenCreateChildren breakLine`}>
                            <div className={`newChildrenName`}>
                                <input placeholder={`Password...`} value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div onClick={() => props.validatePass(password)} className={`newChildrenGo`}>
                                Go!
                            </div>
                        </div>
                    </div>
                    }

                    {(!props.needPass && !props.readOnly && window.location.pathname !== `/`) && 
                    <div onClick={() => props.openPassModal()} className={`childrenToFather`}>
                        Set Password
                    </div>
                    }

                    { window.location.pathname.split("/").length > 2 &&
                    <div onClick={() => goToFather()} className={`childrenToFather`}>
                        back to father pad
                    </div>
                    }

                    {window.location.pathname === `/` &&
                    <div className={`rootPageTextContainer`}>
                        <div className={`rootPageText`}>
                            Welcome to pad.najjar.dev! Here you can organize yourself with pads using Markdown. Try it out chosing a name! For tutorial, go to <a href="/tutorial">pad.najjar.dev/tutorial</a>
                        </div>
                    </div>
                    }

                    {!props.needPass && !props.readOnly &&
                    <div className={`childrenCreateChildren`}>
                        <div className={`newChildrenName`}>
                            <input placeholder={`New pad...`} value={newChildren} onChange={(e) => setNewChildren(e.target.value)} />
                        </div>
                        <div onClick={() => goToChildren()} className={`newChildrenGo`}>
                            Go!
                        </div>
                    </div>
                    }

                </div>
                {renderChildren()}
            </div>
            <div className={`childrenCollapse`} onClick={() => props.setOpen(!props.open) }>
                {props.open ? `<` : `>`}
            </div>
        </div>
    )
}

export default Children;
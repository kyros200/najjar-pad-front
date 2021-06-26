import { useState, useEffect } from "react";
import "react-markdown-editor-lite/lib/index.css";
import "../css/main.css";
import "../css/setPassword.css";

function SetPassword(props) {
    const [newPassword, setNewPassword] = useState("");
    const [newReadOnly, setNewReadOnly] = useState(false);

    const submit = () => {
        if(newReadOnly && !newPassword)
            return;

        props.setNewPass(newPassword, newReadOnly);
        props.setPassModal(false);
    }

    return (
        <div className={`newPassContainer`}>
            <div className="topContent">
                <div className="modalTitle">
                    Set Password and Read Only
                </div>
                <div className="closeButton" onClick={() => props.setPassModal(false)}>
                    X
                </div>
            </div>
            <div className="middleContent">
                <div className="passwordInput">
                    <input placeholder={`New Password...`} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
            </div>
            <div className={`bottomContent ${!newPassword ? `toEnd` : ``}`}>
                {newPassword &&
                <div className={`readOnlyContainer`}>
                    <div className="readOnlyText">
                        Is Read Only?
                    </div>
                    <div className="readOnlyInput">
                        <input type="checkbox" placeholder={`New Password...`} value={newReadOnly} onChange={(e) => {setNewReadOnly(e.target.checked)}} />
                    </div>
                </div>
                }
                <div className="submitButton" onClick={() => submit()}>
                    Update
                </div>
            </div>
        </div>
    );
}

export default SetPassword;

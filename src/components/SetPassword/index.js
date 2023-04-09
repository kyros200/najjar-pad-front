import { useState } from "react";
import Button from "../shared/Button";
import Input from "../shared/Input";
import "./setPassword.scss";

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
                <Button className="closeButton" onClick={() => props.setPassModal(false)}>
                    X
                </Button>
            </div>
            <div className="middleContent">
                <div className="passwordInput">
                    <Input label={`New Password`} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
            </div>
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
            <Button className="updateButton" onClick={() => submit()}>
                Update
            </Button>
        </div>
    );
}

export default SetPassword;

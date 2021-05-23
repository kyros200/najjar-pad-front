import { useState } from "react";
import "../css/main.css";
import "../css/children.css";

function Children(props) {
    const [open, setOpen] = useState(true);
    const [newChildren, setNewChildren] = useState("");

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
        <div className={`childrenContainer ${!open && `collapse`}`}>
            <div className={`childrenInfo ${!open && `collapse`}`}>
                <div className={`title`}>
                    najjar-pad
                </div>
                <div className={`childrenActions`}>

                    { window.location.pathname.split("/").length > 2 &&
                    <div onClick={() => goToFather()} className={`chidlrenToFather`}>
                        back to father pad
                    </div>
                    }

                    <div className={`childrenCreateChildren`}>
                        <div className={`newChildrenName`}>
                            <input placeholder={`New pad...`} value={newChildren} onChange={(e) => setNewChildren(e.target.value)} />
                        </div>
                        <div onClick={() => goToChildren()} className={`newChildrenGo`}>
                            Go!
                        </div>
                    </div>

                </div>
                {renderChildren()}
            </div>
            <div className={`childrenCollapse`} onClick={() => setOpen(!open) }>
                {open ? `<` : `>`}
            </div>
        </div>
    )
}

export default Children;
import "../css/main.css";
import "../css/children.css";

function Children(props) {
    const renderChildren = () => {
        return props.children.map((c) => 
            <div key={c} className={`childrenButton`} onClick={() => window.location.href = `${window.location.href}/${c}`}>
                {c}
            </div>
        )
    }

    return (
        props.children.length > 0 
        ? 
        <div className={`childrenContainer`}>
            <div className={`title`}>
                najjar-pad
            </div>
            {renderChildren()}
        </div>
        :
        <></>
    )
}

export default Children;
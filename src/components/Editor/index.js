import ReactEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./editor.scss";
const ReactMarkdown = require('react-markdown');
const gfm = require('remark-gfm');

function Editor(props) {
    return (
        <div className={`editor ${window.location.pathname === `/` || props.needPass ? "hide" : ""} ${(window.innerWidth < 800 && props.open === true) || props.needPass ? "hideMobile" : ""}`}>
            <ReactEditor
                value={props.markdown}
                style={{
                    height: "100%",
                    fontFamily:"Kufam"
                }}
                onChange={(e) => props.setMarkdown(e.text)}
                renderHTML={(text) => <ReactMarkdown remarkPlugins={[gfm]}>{text}</ReactMarkdown>}
                placeholder={`this pad is empty!`}
                config={{
                    view: { 
                        // html: window.innerWidth > 800 ? true : false,
                        menu: props.readOnly ? false : true,
                        md: props.readOnly ? false : true,
                    },
                    canView: { 
                        // menu: window.innerWidth > 800 ? true : false, 
                        fullScreen: false, 
                    },
                    markdownClass: `md`,
                    //TODO: PUT DEFAULT IMAGE & LINK
                    // imageUrl: ,
                    // linkUrl: ,
                }}
            >
                {props.markdown}
            </ReactEditor>
        </div>
    )
}

export default Editor;
import ReactEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "../css/main.css";
import "../css/editor.css";
const ReactMarkdown = require('react-markdown');
const gfm = require('remark-gfm');

function Editor(props) {
    return (
        <div className={`editor`}>
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
                    view: { menu: true, md: true, html: true },
                    markdownClass: `md`
                }}
            >
                {props.markdown}
            </ReactEditor>
        </div>
    )
}

export default Editor;
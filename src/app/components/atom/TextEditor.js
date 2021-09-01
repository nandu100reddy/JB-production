import React from "react";
import PropTypes from "prop-types";
import { Editor } from "react-draft-wysiwyg";

function TextEditor(props) {
  return (
    <div>
      <Editor
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: [
            { text: "APPLE", value: "apple", url: "apple" },
            { text: "BANANA", value: "banana", url: "banana" },
            { text: "CHERRY", value: "cherry", url: "cherry" },
            { text: "DURIAN", value: "durian", url: "durian" },
            { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
            { text: "FIG", value: "fig", url: "fig" },
            { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
            { text: "HONEYDEW", value: "honeydew", url: "honeydew" },
          ],
        }}
        hashtag={{}}
      />
    </div>
  );
}

TextEditor.propTypes = {};

export default TextEditor;

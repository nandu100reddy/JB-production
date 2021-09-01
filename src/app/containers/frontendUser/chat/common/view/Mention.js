import React, { useState, createRef } from "react";

import { MentionsInput, Mention } from "react-mentions";

function SingleLine({ value, data, placeholder, onAdd, onChange }) {
  const ref = createRef(null);

  return (
    <div className="single-line">
      <MentionsInput
        singleLine
        inputRef={ref}
        value={value}
        onChange={onChange}
        // onChange={onChange}
        // style={defaultStyle}
        placeholder={placeholder}
        a11ySuggestionsListLabel={"Suggested mentions"}
      >
        <Mention
          trigger="@"
          data={data}
          //   onAdd={onAdd}
          //   style={defaultMentionStyle}
        />
      </MentionsInput>
    </div>
  );
}

export default SingleLine;

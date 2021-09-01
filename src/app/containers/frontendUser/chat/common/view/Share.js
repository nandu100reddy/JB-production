import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import {
  createPost,
  createComment,
  getPosts,
  editFeed,
} from "../../../../../../core/actions/Chat.action";
import TextEditor from "../../../../../components/atom/TextEditor";

import SingleLine from "./Mention";
const users = [
  {
    id: "walter",
    display: "Walter White",
  },
  {
    id: "jesse",
    display: "Jesse Pinkman",
  },
  {
    id: "gus",
    display: 'Gustavo "Gus" Fring',
  },
  {
    id: "saul",
    display: "Saul Goodman",
  },
  {
    id: "hank",
    display: "Hank Schrader",
  },
  {
    id: "skyler",
    display: "Skyler White",
  },
  {
    id: "mike",
    display: "Mike Ehrmantraut",
  },
];
const EditorWithMentionHashtag = () => {
  return (
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
  );
};
function Share({
  placeholder,
  buttonLabel,
  type,
  feedId,
  setAllPosts,
  value,
  setIsEdit,
  setIsReply,
  uploadedFile,
}) {
  const [text, setText] = useState("");
  const [mentionText, setMentionText] = useState("");
  const [mentionUsers, setMentionUsers] = useState();
  const [file, setFile] = useState(null);
  const [isFileUrl, setIsFileUrl] = useState(false);
  const dispatch = useDispatch();
  const fetchesUser = useSelector(({ users }) => users.loginUserData);
  useEffect(() => {
    setText(value);
    setMentionText(value);
    // if (uploadedFile) {
    //   setFile(uploadedFile);
    //   setIsFileUrl(true);
    // }
  }, []);
  // console.log(file, "file");
  const onChange = (...args) => {
    setText(args[2]);
    setMentionText(args[1]);
    setMentionUsers(args[3]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newPost = {};
    if (type === "comment") {
      newPost = {
        feed_id: feedId,
        user_id: fetchesUser.user._id,
        post: text,
        mentionText: mentionText,
        mentionUsers: mentionUsers,
      };
    } else if (type === "edit") {
      if (file) {
        newPost = new FormData();
        // const fileName = Date.now() + file.name;
        // newPost.append("name", fileName);
        newPost.append("files", file);
        newPost.append("user_id", fetchesUser.user._id);
        newPost.append("post", text);
        newPost.append("feed_id", feedId);
      } else {
        newPost = {
          feed_id: feedId,
          user_id: fetchesUser.user._id,
          post: text,
          mentionText: mentionText,
          mentionUsers: mentionUsers,
        };
      }
    } else {
      if (file) {
        newPost = new FormData();
        // const fileName = Date.now() + file.name;
        // newPost.append("name", fileName);
        newPost.append("files", file);
        newPost.append("user_id", fetchesUser.user._id);
        newPost.append("post", text);
        // newPost.append("mentionText", mentionText);
        // newPost.append("mentionUsers", mentionUsers);
      } else {
        newPost = {
          user_id: fetchesUser.user._id,
          post: text,
          mentionText: mentionText,
          mentionUsers: mentionUsers,
        };
      }
    }

    if (type === "comment") {
      let result = await dispatch(createComment(newPost));
      if (result.status === 200) {
        setText("");
        setMentionText("");
        setMentionUsers([]);
        let allPosts = await dispatch(getPosts(fetchesUser.user._id));
        if (allPosts?.data?.statusCode === 1) {
          setAllPosts(allPosts.data.result);
        }
        setIsReply(false);
      }
    } else if (type === "edit") {
      let result = await dispatch(editFeed(newPost));
      if (result.status === 200) {
        setText("");
        setMentionText("");
        setMentionUsers([]);
        let allPosts = await dispatch(getPosts(fetchesUser.user._id));
        if (allPosts?.data?.statusCode === 1) {
          setAllPosts(allPosts.data.result);
        }
        setIsEdit(false);
      }
    } else {
      let result = await dispatch(createPost(newPost));
      if (result.status === 200) {
        setText("");
        setMentionText("");
        setMentionUsers([]);
        setFile("");
        let result = await dispatch(getPosts(fetchesUser.user._id));
        if (result?.data?.statusCode === 1) {
          setAllPosts(result.data.result);
        }
      }
    }
  };
  return (
    <div>
      <div class="panel">
        <form class="panel-body">
          <SingleLine
            placeholder={placeholder}
            data={users}
            onChange={onChange}
            value={mentionText}
          />

          {/* <TextEditor /> */}
          {file && (
            <img src={URL.createObjectURL(file)} />
            // <div>
            //   {console.log("IsFileUrl url", isFileUrl)}
            //   {isFileUrl ? (
            //     <img src={file} />
            //   ) : (
            //     <img src={URL.createObjectURL(file)} />
            //   )}
            // </div>
          )}
          <div class="mar-top clearfix">
            {type !== "comment" && type !== "edit" && (
              <label htmlFor="file" className="shareOption">
                <span className="shareOptionText">Upload </span>

                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => {
                    if (type === "edit") {
                      setIsFileUrl(false);
                    }
                    setFile(e.target.files[0]);
                  }}
                />
              </label>
            )}
            <button
              class="btn btn-sm btn-primary pull-right"
              type="submit"
              onClick={handleSubmit}
            >
              {buttonLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Share;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FeedBlock from "./view/FeedBlock";
import Share from "./view/Share";
import { getPosts } from "../../../../../core/actions/Chat.action";

const Post = ({ handleProfileOpen }) => {
  const [allPosts, setAllPosts] = useState([]);
  const dispatch = useDispatch();
  const fetchesUser = useSelector(({ users }) => users.loginUserData);

  useEffect(() => {
    async function getAllPosts() {
      let result = await dispatch(getPosts(fetchesUser.user._id));
      if (result?.data?.statusCode == 1) {
        setAllPosts(result.data.result);
      }
    }
    getAllPosts();
  }, []);
  return (
    <>
      <div>
        <Share
          placeholder="What are you thinking??"
          buttonLabel="Share"
          setAllPosts={setAllPosts}
        />
        {/* Comment cards */}
        {allPosts.map((value) => {
          return (
            <FeedBlock
              userImg={value.userImage}
              userName={value.userName}
              time={value.time}
              post={value.post}
              likeCounter={value.likeCounter}
              commentCounter={value.commentCounter}
              nestedBlock={value.nestedBlock}
              isLiked={value.isLike}
              created_at={value.created_at}
              feed_id={value._id}
              setAllPosts={setAllPosts}
              user_id={value.user_id}
              handleProfileOpen={handleProfileOpen}
              file={value.file}
            />
          );
        })}
      </div>
    </>
  );
};

export default Post;

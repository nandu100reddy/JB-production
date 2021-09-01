import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiLike, AiFillLike } from "react-icons/all";
import { DropdownButton, Dropdown } from "react-bootstrap";
import Share from "./Share";
import {
  likePost,
  getPosts,
  deleteComment,
} from "../../../../../../core/actions/Chat.action";

function MediaBlock({
  userImg,
  userName,
  time,
  post,
  likeCounter,
  commentCounter,
  isLiked,
  created_at,
  setAllPosts,
  comment_id,
  feed_id,
  user_id,
  handleProfileOpen,
}) {
  const [like, setLike] = useState(isLiked);
  const [isReply, setIsReply] = useState(false);
  const [likeCount, setLikeCount] = useState(likeCounter);
  const fetchesUser = useSelector(({ users }) => users.loginUserData);
  const dispatch = useDispatch();

  var timeStart = new Date(created_at);
  var timeEnd = new Date();
  var hourDiff = timeEnd - timeStart; //in ms
  var secDiff = hourDiff / 1000; //in s
  var minDiff = hourDiff / 60 / 1000; //in minutes
  var hDiff = hourDiff / 3600 / 1000; //in hours
  var humanReadable = {};
  humanReadable.hours = Math.floor(hDiff);
  humanReadable.minutes = minDiff - 60 * humanReadable.hours;

  useEffect(() => {
    setLike(isLiked);
    setLikeCount(likeCounter);
  }, [isLiked, likeCounter]);

  const handleDeleteRecord = async (commentId) => {
    await dispatch(deleteComment(fetchesUser.user._id, commentId));
    let allPosts = await dispatch(getPosts(fetchesUser.user._id));
    if (allPosts?.data?.statusCode === 1) {
      setAllPosts(allPosts.data.result);
    }
  };

  const handleLike = async (id) => {
    let data = {
      comment_id: id,
      user_id: fetchesUser.user._id,
    };
    let result = await dispatch(likePost(data));
  };
  return (
    <div class="media-block">
      <div class="media-left">
        <img class="img-sm" alt="Profile Picture" src={userImg}></img>
      </div>
      <div class="media-body">
        <div className="media-header">
          <div class="mar-btm">
            <div
              class="btn-link text-semibold media-heading box-inline"
              onClick={() => handleProfileOpen({ user_id })}
            >
              {userName}
            </div>
            <p class="text-muted text-sm">
              {humanReadable.hours > 0
                ? humanReadable.hours > 23
                  ? `on ${timeStart.toDateString()}`
                  : `${Math.floor(humanReadable.hours)} hour ago`
                : `${Math.floor(humanReadable.minutes)} min ago`}
            </p>
          </div>
          {user_id === fetchesUser.user._id && (
            <DropdownButton id="dropdown-action" title="">
              <Dropdown.Item onClick={() => handleDeleteRecord(comment_id)}>
                Delete
              </Dropdown.Item>
            </DropdownButton>
          )}
        </div>

        <p>{post}</p>
        <div class="pad-ver">
          <div class="btn-group">
            <div
              class="btn btn-sm btn-default btn-hover-primary"
              onClick={() => {
                setLikeCount(like ? likeCount - 1 : likeCount + 1);
                setLike(!like);
                handleLike(comment_id);
              }}
            >
              {like ? <AiFillLike /> : <BiLike />} {likeCount} Like this!
            </div>
            <button
              class="btn btn-sm btn-default btn-hover-primary"
              onClick={() => {
                setIsReply(!isReply);
              }}
            >
              Reply
            </button>
          </div>
          <div>
            {isReply && (
              <Share
                placeholder="Write here!"
                buttonLabel="Reply"
                setAllPosts={setAllPosts}
                type="comment"
                feedId={feed_id}
                setIsReply={setIsReply}
              />
            )}
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default MediaBlock;

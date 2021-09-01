import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegComment } from "react-icons/fa";
import { BiLike, AiFillLike } from "react-icons/all";
import { DropdownButton, Dropdown } from "react-bootstrap";
import MediaBlock from "./MediaBlock";
import Share from "./Share";
import {
  likePost,
  deleteFeed,
  getPosts,
} from "../../../../../../core/actions/Chat.action";

function FeedBlock({
  userImg,
  userName,
  time,
  post,
  likeCounter,
  commentCounter,
  nestedBlock,
  isLiked,
  created_at,
  feed_id,
  setAllPosts,
  user_id,
  handleProfileOpen,
  file,
}) {
  const [like, setLike] = useState(isLiked);
  const [isReply, setIsReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [likeCount, setLikeCount] = useState(likeCounter);
  const fetchesUser = useSelector(({ users }) => users.loginUserData);

  var timeStart = new Date(created_at);
  var timeEnd = new Date();
  var hourDiff = timeEnd - timeStart; //in ms
  var secDiff = hourDiff / 1000; //in s
  var minDiff = hourDiff / 60 / 1000; //in minutes
  var hDiff = hourDiff / 3600 / 1000; //in hours
  var humanReadable = {};
  humanReadable.hours = Math.floor(hDiff);
  humanReadable.minutes = minDiff - 60 * humanReadable.hours;
  const dispatch = useDispatch();

  useEffect(() => {
    setLike(isLiked);
    setLikeCount(likeCounter);
  }, [isLiked, likeCounter]);

  const handleDeleteRecord = async (feedId) => {
    await dispatch(deleteFeed(fetchesUser.user._id, feedId));
    let allPosts = await dispatch(getPosts(fetchesUser.user._id));
    if (allPosts?.data?.statusCode === 1) {
      setAllPosts(allPosts.data.result);
    }
  };

  const handleEdit = async () => {
    setIsEdit(true);
  };

  const handleLike = async (id) => {
    let data = {
      feed_id: id,
      user_id: fetchesUser.user._id,
    };
    await dispatch(likePost(data));
  };

  return (
    <div class="panel">
      <div class="panel-body">
        <div class="media-block">
          <div class="media-left">
            <img class="img-sm" alt="Profile Picture" src={userImg} />
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
                  <i class="fa fa-mobile fa-lg"></i> -{" "}
                  {humanReadable.hours > 0
                    ? humanReadable.hours > 23
                      ? `on ${timeStart.toDateString()}`
                      : `${Math.floor(humanReadable.hours)} hour ago`
                    : `${Math.floor(humanReadable.minutes)} min ago`}
                </p>
              </div>
              {user_id === fetchesUser.user._id && (
                <DropdownButton id="dropdown-action" title="">
                  <Dropdown.Item onClick={() => handleDeleteRecord(feed_id)}>
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleEdit()}>
                    Edit
                  </Dropdown.Item>
                </DropdownButton>
              )}
            </div>

            {!isEdit ? (
              <>
                <p>{post}</p>
                {file && <img alt="post" src={file} />}
              </>
            ) : (
              <>
                <Share
                  placeholder="Edit here!"
                  buttonLabel="Edit"
                  type="edit"
                  feedId={feed_id}
                  setAllPosts={setAllPosts}
                  value={post}
                  setIsEdit={setIsEdit}
                  setIsReply={setIsReply}
                  uploadedFile={file}
                />
                {/* {file && (
                  <div>
                    <img alt="post" src={file} />
                    <label htmlFor="file" className="shareOption">
                      <span className="shareOptionText">Upload </span>

                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        accept=".png,.jpeg,.jpg"
                        // onChange={(e) => setFile(e.target.files[0] )}
                      />
                    </label>
                  </div>
                )} */}
              </>
            )}
            <div class="pad-ver">
              <div class="btn-group">
                <div
                  class="btn btn-sm btn-default btn-hover-primary"
                  onClick={() => {
                    setLikeCount(like ? likeCount - 1 : likeCount + 1);
                    setLike(!like);
                    handleLike(feed_id);
                  }}
                >
                  {like ? <AiFillLike /> : <BiLike />} {likeCount} Like this !
                </div>
              </div>
              <div
                class="btn btn-sm btn-default btn-hover-primary"
                onClick={() => {
                  setIsReply(!isReply);
                }}
              >
                <FaRegComment /> {commentCounter} Comment
              </div>
            </div>
            <div>
              {isReply && (
                <Share
                  placeholder="Write here!"
                  buttonLabel="Reply"
                  type="comment"
                  feedId={feed_id}
                  setAllPosts={setAllPosts}
                  setIsReply={setIsReply}
                />
              )}
            </div>
            <hr />

            <div>
              {nestedBlock.map((value) => (
                <MediaBlock
                  userImg={value.userImage}
                  userName={value.userName}
                  time={value.time}
                  post={value.post}
                  likeCounter={value.likeCounter}
                  isLiked={value.isLike}
                  created_at={value.created_at}
                  setAllPosts={setAllPosts}
                  comment_id={value._id}
                  feed_id={feed_id}
                  user_id={value.user_id}
                  handleProfileOpen={handleProfileOpen}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedBlock;

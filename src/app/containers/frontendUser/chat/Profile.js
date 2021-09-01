import React, { useState, useEffect } from "react";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMember, followMember } from "../../../../core/actions/Chat.action";
import Post from "./common/Post";

import "./_Chat.scss";

function Profile({ viewUser, handleProfileOpen }) {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const fetchesUser = useSelector(({ users }) => users.loginUserData);

  async function getAllPosts() {
    let result = await dispatch(
      getMember(fetchesUser.user._id, viewUser.user_id)
    );
    if (result?.data?.statusCode == 1) {
      setUser(result.data.result.profile);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, [viewUser]);

  const handleFollow = async () => {
    let payload = {
      user_id: fetchesUser.user._id,
      following_user_id: viewUser.user_id,
    };
    let result = await dispatch(followMember(payload));
    if (result?.data?.statusCode == 1) {
      setUser({ ...user, isFollowed: !user.isFollowed });
    }
    getAllPosts();
  };

  const ViewFollowers = ({ userData }) => {
    return (
      <div className="m-img-class">
        <img
          className="profile-img"
          class="img-sm"
          alt="Profile Picture"
          src={userData?.followersImage}
        />
        {userData?.followersName}
      </div>
    );
  };
  const ViewFollowings = ({ userData }) => {
    return (
      <div className="m-img-class">
        <img
          className="profile-img"
          class="img-sm"
          alt="Profile Picture"
          src={userData?.followingImage}
        />
        {userData?.followingName}
      </div>
    );
  };

  return (
    <>
      <div>
        <div className="row p-0">
          <div className="coverimage-bx"></div>
        </div>
        <div className="align-items-center profile-header">
          <div className="col-2 text-center">
            <div className="profile-img-primary">
              <img className="profile-img" src={user?.userImage} />
            </div>
          </div>

          <div className="col-6 profile-info">
            <div className="profile-info">
              <div className="u_profile_name">{user?.name}</div>
              <div className="u_profile_email">Email : {user?.email}</div>
              <div className="u_profile_about">
                <span>
                  <img src="http://jbwork.in/jbplatform-images/images/about-for-pro.png"></img>
                </span>{" "}
                : {user?.member_status_update}
              </div>
              <div>
                {/* <div className="u_profile_follow">
              <button onClick={handleFollow}>
                {user?.isFollowed ? "UNFOLLOW" : "FOLLOW"}
              </button>
            </div> */}
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="edit-side-bx">
              <div className="u_profile_follow">
                <button onClick={handleFollow}>
                  {user?.isFollowed ? "UNFOLLOW" : "FOLLOW"}
                </button>
              </div>

              <div className="u_profile_follow">
                <button>Edit</button>
              </div>

              <div className="u_profile_follow">
                <button>User Detail</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Row className="pt-5">
        <Col lg={8}>
          <div className="profile-head-strip">
            <p className="mb-0 font-weight-bold">Details</p>
          </div>
          <div className="bor-custom">
            <Row>
              <div className="col-6">
                <div className="profile-row-m">
                  <div className="profi-descrition">First Name</div>
                  <div className="profi-des-main">{user?.first_name}</div>
                </div>
              </div>

              <div className="col-6">
                <div className="profile-row-m">
                  <div className="profi-descrition">last Name</div>
                  <div className="profi-des-main">{user?.last_name}</div>
                </div>
              </div>

              <div className="col-6">
                <div className="profile-row-m">
                  <div className="profi-descrition">Title</div>
                  <div className="profi-des-main">{user?.title}</div>
                </div>
              </div>

              <div className="col-6">
                <div className="profile-row-m">
                  <div className="profi-descrition">Company Name</div>
                  <div className="profi-des-main">{user?.companyName}</div>
                </div>
              </div>

              <div className="col-6">
                <div className="profile-row-m">
                  <div className="profi-descrition">Mobile</div>
                  <div className="profi-des-main">{user?.phone_number}</div>
                </div>
              </div>

              <div className="col-6">
                <div className="profile-row-m">
                  <div className="profi-descrition">Address</div>
                  <div className="profi-des-main">
                    {user?.address?.address} {user?.address?.address2}
                    {user?.address?.city}
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="profile-row-m">
                  <div className="profi-descrition">About Me</div>
                  <div className="profi-des-main">
                    {user?.member_status_update}
                  </div>
                </div>
              </div>
            </Row>
          </div>

          <Row>
            <Col lg={12} className="pt-5">
              <div>
                <div className="profile-head-strip">
                  <p className="mb-0 font-weight-bold">Chatter</p>
                </div>
                <Container fluid className="p-0">
                  <Tabs defaultActiveKey="post" id="chat-tab">
                    <Tab eventKey="post" title="Post">
                      <Post handleProfileOpen={handleProfileOpen} />
                    </Tab>

                    <Tab eventKey="question" title="Question" disabled>
                      Question
                    </Tab>
                  </Tabs>
                </Container>
              </div>
            </Col>
          </Row>
        </Col>

        <Col lg={4}>
          <div className="profile-desc">
            <div className="profile-head-strip">
              <p className="mb-0 font-weight-bold">Related</p>
            </div>

            <div className="row profile-sub__desc">
              <div className="col-12 profile-item-one">
                Posts ({user?.totalPost})
              </div>
            </div>
            <div className="row profile-sub__desc">
              <div className="col-12 profile-item-one">
                Followers ({user?.followersCount})
              </div>
              <div className="col-12 profile-item-two">
                {
                  ///all followers list
                  user?.followers.map((userData) => {
                    return <ViewFollowers userData={userData} />;
                  })
                }
              </div>
            </div>
            <div className="row profile-sub__desc">
              <div className="col-12 profile-item-one">
                Following ({user?.followingCount})
              </div>
              <div className="col-12 profile-item-two">
                {
                  ///all following list
                  user?.following.map((userData) => {
                    return <ViewFollowings userData={userData} />;
                  })
                }
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Profile;

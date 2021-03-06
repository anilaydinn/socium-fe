import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { acceptOrDeclineFriendRequest } from "../../api";
import { getUserId } from "../../helpers/helpers";
import { fetchUserFriendRequests } from "../../redux/actions/userActions";

const FriendRequestList = (props) => {
  const { friendRequests, fetchUserFriendRequests } = props;

  useEffect(() => {
    fetchUserFriendRequests(getUserId());
  }, []);

  const handleAcceptOrDeclineFriendRequest = async (targetUserId, accept) => {
    await acceptOrDeclineFriendRequest(getUserId(), targetUserId, accept);
    fetchUserFriendRequests(getUserId());
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h4 className="text-center">Friend Requests</h4>
      </div>
      {!friendRequests && (
        <div className="text-center mt-5">No friend requests</div>
      )}
      {friendRequests &&
        friendRequests.map((friendRequest) => (
          <div key={friendRequest.id} className="row">
            <div className="col-md-12">
              <div className="card mb-3">
                <div className="row g-0">
                  {friendRequest.profileImage && (
                    <div className="col-md-1 d-flex align-items-center justify-content-center">
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={"/"}
                      >
                        <img
                          src={friendRequest.profileImage}
                          className="comment-profile-image"
                          height={37}
                          width={37}
                        />
                      </Link>
                    </div>
                  )}
                  <div className="col-md-8">
                    <div className="card-body">
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={"/"}
                      >
                        <h6 className="card-title">{`${friendRequest.name} ${friendRequest.surname}`}</h6>
                      </Link>
                      <button
                        style={{ marginRight: "5px" }}
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleAcceptOrDeclineFriendRequest(
                            friendRequest.id,
                            true
                          )
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleAcceptOrDeclineFriendRequest(
                            friendRequest.id,
                            false
                          )
                        }
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  friendRequests: state.user.friendRequests,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserFriendRequests: (userId) =>
      dispatch(fetchUserFriendRequests(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestList);

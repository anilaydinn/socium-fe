import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserId } from "../../helpers/helpers";
import { fetchUserFriends } from "../../redux/actions/userActions";
import { deleteUserFriend } from "../../api";

const FriendList = (props) => {
  const { friends, fetchUserFriends } = props;

  useEffect(() => {
    fetchUserFriends(getUserId());
  }, []);

  const handleRemoveFriend = async (friendId) => {
    await deleteUserFriend(getUserId(), friendId);
    fetchUserFriends(getUserId());
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h4 className="text-center">Friends</h4>
      </div>
      {!friends && (
        <div className="text-center mt-5">You don't have any friends.</div>
      )}
      {friends &&
        friends.map((friend) => (
          <div key={friend.id} className="row">
            <div className="col-md-12">
              <div className="card mb-3">
                <div className="row g-0">
                  {friend.profileImage && (
                    <div className="col-md-1 d-flex align-items-center justify-content-center">
                      <a
                        style={{ textDecoration: "none", color: "black" }}
                        href={`/profile/${friend.id}`}
                      >
                        <img
                          src={friend.profileImage}
                          className="comment-profile-image"
                          height={37}
                          width={37}
                        />
                      </a>
                    </div>
                  )}
                  <div className="col-md-8">
                    <div className="card-body">
                      <a
                        style={{ textDecoration: "none", color: "black" }}
                        href={`/profile/${friend.id}`}
                      >
                        <h6 className="card-title">{`${friend.name} ${friend.surname}`}</h6>
                      </a>
                      <a href={`/profile/${friend.id}/messages`}>
                        <button
                          style={{ marginRight: "5px" }}
                          className="btn btn-sm btn-success"
                        >
                          Send Message
                        </button>
                      </a>
                      <button
                        style={{ marginRight: "5px" }}
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveFriend(friend.id)}
                      >
                        Remove friend
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
  friends: state.user.friends,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserFriends: (userId) => dispatch(fetchUserFriends(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);

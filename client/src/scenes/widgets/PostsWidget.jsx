import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const reduxToken = useSelector((state) => state.token);
  const token = reduxToken || localStorage.getItem("token");

  const getPosts = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      dispatch(setPosts(Array.isArray(data) ? data : data.posts ?? []));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      dispatch(setPosts([]));
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await fetch(`/api/posts/${userId}/posts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      dispatch(setPosts(Array.isArray(data) ? data : data.posts ?? []));
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
      dispatch(setPosts([]));
    }
  };

  useEffect(() => {
    if (!token) return;

    if (isProfile && userId) {
      getUserPosts();
    } else {
      getPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {Array.isArray(posts) &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
    </>
  );
};

export default PostsWidget;

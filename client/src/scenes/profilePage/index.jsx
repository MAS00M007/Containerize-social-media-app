import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />

      <Box
        maxWidth="1400px"
        margin="0 auto"
        padding="1.5rem"
        display="flex"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        gap="1.75rem"
      >
        {/* LEFT PROFILE SIDEBAR */}
        <Box
          flex={1}
          minWidth={isNonMobileScreens ? "280px" : "100%"}
        >
          <UserWidget userId={userId} picturePath={user.picturePath} />

          <Box mt="1.5rem">
            <FriendListWidget userId={userId} />
          </Box>
        </Box>

        {/* CENTER FEED */}
        <Box
          flex={2}
          minWidth={isNonMobileScreens ? "520px" : "100%"}
        >
          <MyPostWidget picturePath={user.picturePath} />

          <Box mt="1.75rem">
            <PostsWidget userId={userId} isProfile />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

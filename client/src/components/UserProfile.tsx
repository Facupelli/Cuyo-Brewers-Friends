import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserData } from "../redux/reducers/types";
import { getUserByUsername } from "../utils/blogUtils";
import { NavBar } from "./NavBar";

type ParamsType = {
  username: string;
};

type UserProfileState = {
    userProfile: UserData
}

export const UserProfile: React.FC = () => {
  const username = useParams<ParamsType>();
  console.log(username)
  const [userProfile, setUserProfile] = useState<UserProfileState>();
  console.log('USERPROFILE',userProfile)

  useEffect(() => {
    getUserByUsername(username.username)
      .then((data) => setUserProfile({ userProfile: data }))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <NavBar route="userprofile" />
      <div>
          <div>
              <p>USERPROFILE</p>
              <p>{userProfile?.userProfile.ownBlogs.map(el => el)}</p>
          </div>
      </div>
    </div>
  );
};

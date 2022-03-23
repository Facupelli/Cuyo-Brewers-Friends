import React from "react";
import { Link } from "react-router-dom";

type Props = {
  username: string;
};

export const UserData: React.FC<Props> = ({ username }) => {
  return (
    <div className="py-4 border-b border-gray-700">
      <Link to={`/userprofile/${username}`}>
        <p className="text-xl font-semibold text-mainC2 text-center hover:text-mainC2">
          {username}
        </p>
      </Link>
    </div>
  );
};

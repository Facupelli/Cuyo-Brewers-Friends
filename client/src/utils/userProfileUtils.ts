import axios from "axios";

export const deleteFollow = async (userId: string, followedId: string) => {
  await axios.delete(`/follow`, {
    data: {
      userId,
      followedId,
    },
  });
};

export const addFollow = async (userId: string, followingId: string) => {
  await axios.post(`/follow`, {
    userId,
    followingId,
  });
};

const mongodb = require("mongodb");
const { userModel } = require("../models/user");
const ObjectId = mongodb.ObjectId;

class Follow {
  static async addFollower(userId, followingId) {
    try {
      const followerUser = await userModel.findById(ObjectId(userId));
      const followingUser = await userModel.findById(ObjectId(followingId));

      if (followerUser && followingUser) {
        // await userModel.findOneAndUpdate(
        //   { _id: userId },
        //   { $push: { following: recipe_id } }
        // );
        // await userModel.findOneAndUpdate(
        //     {_id: }
        // )
        const alreadyFollowed = followerUser.following.filter(id => id.toString() === followingId)
        if(alreadyFollowed.length > 0){
            throw new Error("User already followed");
        }

        followerUser.following.push(followingId);
        followingUser.followers.push(userId);
        await followerUser.save();
        await followingUser.save();
      } else {
        throw new Error("No (follower or following) user found");
      }
    } catch (e) {
      console.error(`Unable to add follower: ${e}`);
      return { error: e };
    }
  }

  //   static async deleteFav(user_id, recipe_id) {
  //     try {
  //       await userModel.findOneAndUpdate(
  //         { _id: user_id },
  //         { $pull: { favs: recipe_id } }
  //       );
  //     } catch (e) {
  //       console.error(`Unable to delete fav: ${e}`);
  //       return { error: e };
  //     }
  //   }
}

module.exports = Follow;

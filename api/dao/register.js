const { userModel } = require("../models/user");

class RegisterUsers {
  static async addUser(user) {
    try {
      const response = await userModel.create(user);

      console.log(response);
    } catch (e) {
      console.error(`Unable to post user: ${e}`);
      return { error: e };
    }
  }
}

module.exports = {RegisterUsers};

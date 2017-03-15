import Constants from "../constants";

const Actions = {
  signUp: function (user) {
    return {
      type: Constants.USER_REGISTERING,
      user
    }
  },
  registrationsError: function (error) {
    return {
      type: Constants.REGISTRATIONS_ERROR,
      error
    }
  }
  // USER_REGISTERED
};



export default Actions;

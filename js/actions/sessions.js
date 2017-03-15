import {push} from "react-router-redux";
import Constants from "../constants";
import {Socket} from "phoenix";
import {httpGet, httpPost, httpDelete} from "../utils";

const Actions = {
  setCurrentUser: function (user) {
    return {
      type: Constants.SET_CURRENT_USER,
      user
    }
  },
  getCurrentUser: function () {
    return {
      type: Constants.GET_CURRENT_USER,
    }
  },
  signIn: (email, password) => {
    return {
      type: Constants.USER_SIGNING_IN,
      email,
      password
    };
  },
  setSocket: (socket, channel) => {
    return {
      type: Constants.SET_SOCKET,
      socket,
      channel
    }
  },

  signOut: () => {
    return {
      type: Constants.USER_SIGNING_OUT
    };
  },
};

export default Actions;

/* eslint-disable no-case-declarations */
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  SET_USER,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  EMAIL_VERIFY_REQUEST,
  EMAIL_VERIFY_SUCCESS,
  EMAIL_VERIFY_FAIL,
  SET_LIKES_REQUEST,
  SET_LIKES_SUCCESS,
  SET_LIKES_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  USER_UPLOAD_AVATAR_SUCCESS,
  USER_UPLOAD_AVATAR_FAIL,
  UPDATE_PROFILE,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAIL,
  CHECK_AUTH_REQUEST,
  UPDATE_PROFILE_PREF,
  GET_USER_PROFILE,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_EMAIL_SUCCESS,
  SET_NOTIFICATIONS,
  REOMVE_NOTIFICATIONS,
  SEND_RESET_PASSWORD_SUCCESS
} from "../constants/userActionTypes";

const initialState = {
  error: null,
  isAuth: false,
  loading: false,
  authChecking: true,
  likes: [],
  userInfo: {},
  notifications: [],
  isEmailVerified: false,
  userId: localStorage.getItem("userId"),
  isFriends: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_SIGNIN_REQUEST:
    case GET_ALL_USERS_REQUEST:
    case EMAIL_VERIFY_REQUEST:
    case SET_LIKES_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case CHECK_AUTH_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
    case USER_SIGNIN_SUCCESS:
      localStorage.setItem("userId", action.payload.userId);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
        error: null
      };
    case EMAIL_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        isEmailVerified: true,
        ...action.payload,
        error: null
      };
    case RESET_PASSWORD_SUCCESS:
    case SET_LIKES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload
      };
    case CHECK_AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        authChecking: false,
        notifications: action.payload
      };
    case USER_SIGNIN_FAIL:
    case USER_REGISTER_FAIL:
      localStorage.removeItem("userId");
      return {
        ...state,
        userInfo: null,
        isAuth: false,
        loading: false,
        error: action.payload
      };
    case EMAIL_VERIFY_FAIL:
      return {
        ...state,
        isEmailVerified: false,
        loading: false,
        error: action.payload
      };
    case RESET_PASSWORD_FAIL:
    case GET_ALL_USERS_FAIL:
    case SET_LIKES_FAIL:
    case USER_UPLOAD_AVATAR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CHECK_AUTH_FAIL:
      return {
        ...state,
        isAuth: false,
        authChecking: false
      };
    case SET_USER:
      return {
        ...state,
        loading: false,
        userId: action.payload
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        messagedUsers: [...action.payload]
      };
    case USER_UPLOAD_AVATAR_SUCCESS:
      window.href = "/verify-voice";
      return {
        ...state,
        loading: false,
        userInfo: { ...state.userInfo, ...action.payload }
      };
    case GET_USER_PROFILE:
    case UPDATE_PROFILE:
    case UPDATE_PROFILE_PREF:
      return {
        ...state,
        loading: false,
        userInfo: action.payload.profile
      };

    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_EMAIL_SUCCESS:
    case SEND_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    case REOMVE_NOTIFICATIONS:
      const notif = state.notifications;
      const index = notif.findIndex((el) => el.notificationId === action.payload.notificationId);
      if (index !== -1) notif.splice(index, 1);
      return {
        ...state,
        notifications: notif
      };
    default:
      return state;
  }
};

import { SETUSERINFO, SETTOKEN } from './type'
export const setUserInfo = (data: any) => ({
  type: SETUSERINFO,
  data
});

export const setToken = (data: any) => ({
  type: SETTOKEN,
  data
});


export const mapStateToProps = (state: any) => ({
  token: state.token,
  userInfo: state.userInfo,
});

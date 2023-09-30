const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  username: state => state.user.userInfo.username
}
export default getters

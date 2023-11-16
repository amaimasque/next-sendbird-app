import {UPDATE_USER_PROFILE_MODAL} from './types'

export const updateUserProfileModal = (visibility) => ({
  type: UPDATE_USER_PROFILE_MODAL,
  payload: visibility
})
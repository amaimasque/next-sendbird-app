import {UPDATE_USER_PROFILE_MODAL} from '@/actions/types'

const initialState = {
  modals: {
    userProfileModalVisible: false
  }
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          userProfileModalVisible: action.payload
        }
      }
    default: 
      return state
  }
}
export default appReducer
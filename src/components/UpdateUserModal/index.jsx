import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext"
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors"
import Image from 'next/image'
import "./UpdateUserModal.css"
import UploadIcon from "../Icons/UploadIcon"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { updateUserProfileModal } from '@/actions/modalActions'

const UpdateUserModal = () => {
  const [nickName, setNickname] = useState("")
  const [profilePhoto, setProfilePhoto] = useState("")
  const globalStore = useSendbirdStateContext()
  const sdkInstance = sendbirdSelectors.getSdk(globalStore)
  const user = sdkInstance.currentUser
  const dispatch = useDispatch()

  const onFileChange = async (e) => {
    if (e.target?.files[0] && sdkInstance) {
      console.log('You selected ' + e.target.files[0].name)
      try {
        const updatedUser = await sdkInstance.updateCurrentUserInfo({
          profileImage: e.target?.files[0]
        })
        if (updatedUser.plainProfileUrl !== profilePhoto) setProfilePhoto(updatedUser.plainProfileUrl)
      } catch (error) {
        console.log('Error uploading profile: ', error)
      }
    }
  }

  useEffect(() => {
    if (user?.nickname) setNickname(user?.nickname)
    if (user?.profileUrl) setProfilePhoto(user?.plainProfileUrl)
  }, [user])

  useEffect(() => {
    const fileInput = document.getElementById("file-upload")
    fileInput?.addEventListener('change', onFileChange)
    return () => {
      fileInput?.removeEventListener('change', onFileChange)
    }
  }, [])

  const onClickProfilePicture = (e) => {
    e.stopPropagation()
    console.log('onClickProfilePicture')
    const upload = document.getElementById("file-upload")
    if (upload) upload.click()
  }

  const onChangeNickname = (e) => setNickname(e.target?.value ?? "")

  const onBlurNickname = async () => {
    try {
      await sdkInstance.updateCurrentUserInfo({
        nickname: nickName
      })
    } catch (error) {
      console.log('Error updating nickname: ', error)
    }
  }

  const onClickCloseProfileModal = (e) => {
    const currentBg = e.target;
    const bg = document.getElementById("modal_user")
    if (currentBg !== bg) {
      return;
    }
    return  dispatch(updateUserProfileModal(false))
  }

  return (
    <div id="modal_user" onClick={onClickCloseProfileModal}>
      <div id="modal_content">
        <div id="image_container" onClick={onClickProfilePicture}>
          {profilePhoto && <Image
            src={profilePhoto ?? ""}
            width={144}
            height={144}
            alt="User profile picture"
            id="user_profile_picture"
            priority
          />}
          <input type="file" id="file-upload" hidden accept="image/*" />
          <div id="user_image_overlay">
            <UploadIcon/>
          </div>
        </div>
        <label id="nickname_label" htmlFor="user_nickname">Nickname</label>
        <input name="user_nickname" id="user_nickname" value={nickName} onChange={onChangeNickname} onBlur={onBlurNickname} />
      </div>
    </div>
  )
}

export default UpdateUserModal
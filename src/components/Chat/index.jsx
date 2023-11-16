import SendbirdApp from '@sendbird/uikit-react/App'
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext"
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors"
import '@sendbird/uikit-react/dist/index.css'
import { useEffect, useState } from 'react'
import { updateUserProfileModal } from '@/actions/modalActions'
import UpdateUserModal from '@/components/UpdateUserModal'
import { useSelector, useDispatch } from 'react-redux'
import { CreateChannelProvider,  useCreateChannelContext } from '@sendbird/uikit-react/CreateChannel/context';
import CreateChannelUI from '@sendbird/uikit-react/CreateChannel/components/CreateChannelUI';
import SBConversation from '@sendbird/uikit-react/Channel'
import SBChannelList from '@sendbird/uikit-react/ChannelList'
import SBChannelSettings from '@sendbird/uikit-react/ChannelSettings'
import ChatHeader from '@/components/ChatHeader'

const SEND_GRID_APP_ID = process.env.NEXT_PUBLIC_SEND_BIRD_APP_ID ?? ""
const USER_ID = process.env.NEXT_PUBLIC_SEND_BIRD_USER_ID ?? ""

const Chat = () => {
  const globalStore = useSendbirdStateContext()
  const createChannelContext =  useCreateChannelContext()
  const sdkInstance = sendbirdSelectors.getSdk(globalStore)
  const currentUser = sdkInstance.currentUser
  const dispatch = useDispatch()
  const userProfileModalVisible = useSelector((state) => state.modals.userProfileModalVisible)
  const [showChannel, setShowChannel] = useState(false)
  const [selectedChannelURL, setSelectedChannelURL] = useState(null)
  const [showChannelSettings, setShowChannelSettings] = useState(false)

  const openUpdateUser = () => {
    dispatch(updateUserProfileModal(true))
  }

  createChannelContext?.onCreateChannel((channel) => {
    console.log('Created new channel', channel)
  })

  useEffect(() => {
    if (!userProfileModalVisible) {
      
    }
  }, [userProfileModalVisible])

  const onClickAddChannel = () => setShowChannel(true)


  return (
      <div style={{height: "100vh", width: "100vw"}}>
        <CreateChannelProvider onCreateChannel={(channel) => console.log(channel)}>
          {showChannel && <CreateChannelUI className="z-20" onCancel={() => setShowChannel(false)}/>}
          <div className='flex flex-row h-full z-0'>
            <SBChannelList
              renderHeader={() => <ChatHeader onClickAddChannel={onClickAddChannel} onClickProfile={openUpdateUser}/>}
              onChannelSelect={(channel) => setSelectedChannelURL(channel?.url)}
            />
            <SBConversation className="channel_conversation" channelUrl={selectedChannelURL} onChatHeaderActionClick={() => setShowChannelSettings(true)}/>
            {showChannelSettings && <SBChannelSettings channelUrl={selectedChannelURL} onCloseClick={() => setShowChannelSettings(false)} />}
          </div>
          
          {userProfileModalVisible && <UpdateUserModal />}
        </CreateChannelProvider>
      </div>
  );
}

export default Chat
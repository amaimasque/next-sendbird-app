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
import { createChannel } from '@/api/channels'

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

  const onCreateChannel = async (channel) => {
    console.log('Created new channel', channel)
    try {
      // * Save only if 1-1
      if (channel?.memberCount === 2) {
        const {creator, url, members} = channel
        const otherMember = members.find(u => u.userId !== currentUser?.userId)
        console.log('Should create new channel', creator, url, otherMember)
        await createChannel({
          creatorId: creator?.userId,
          channelUrl: url,
          chatMateId: otherMember?.userId
        })
      }
    } catch (error) {
      console.log('Error creating new channel: ', error)
    }
  }

  createChannelContext?.onCreateChannel(onCreateChannel)

  useEffect(() => {
    if (!userProfileModalVisible) {
      
    }
  }, [userProfileModalVisible])

  const onClickAddChannel = () => setShowChannel(true)


  return (
      <div style={{height: "100vh", width: "100vw"}}>
        <CreateChannelProvider onCreateChannel={onCreateChannel}>
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
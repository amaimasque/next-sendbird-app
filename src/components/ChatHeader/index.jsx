import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext"
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors"
import ChannelListHeader from '@sendbird/uikit-react/ChannelList/components/ChannelListHeader'
import Icon from "@sendbird/uikit-react/ui/Icon"
import Avatar from "@sendbird/uikit-react/ui/Avatar"

const ChatHeader = ({onClickAddChannel, onClickProfile}) => {
  const globalStore = useSendbirdStateContext()
  const sdkInstance = sendbirdSelectors.getSdk(globalStore)
  const currentUser = sdkInstance.currentUser

  const onClickCreateHandler = () => currentUser && onClickAddChannel && onClickAddChannel?.()
  const onClickProfileHandler = () => onClickProfile && onClickProfile?.()

  return (
    <ChannelListHeader renderHeader={() => (
      <div className="flex flex-row text-black items-center m-auto w-[290px]">
        <div className="flex flex-row hover:bg-stone-300 rounded-md px-3" onClick={onClickProfileHandler}>
          {currentUser?.profileUrl && <Avatar src={currentUser?.profileUrl ?? ""} width={50} height={50}/>}
          <div className="flex-1 w-[150px] mx-5">
            <p>{currentUser?.nickname}</p>
            <p className="text-xs">{currentUser?.userId}</p>
          </div>
        </div>
        <div className="px-3">
          <Icon type="CREATE" onClick={onClickCreateHandler} />
        </div>
      </div>
    )} />
  )
}

export default ChatHeader
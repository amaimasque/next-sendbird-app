"use client"

import dynamic from 'next/dynamic'
import '@sendbird/uikit-react/dist/index.css'
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { Provider } from 'react-redux'
import store from '@/store'
import {randomUser, createUser} from '@/api/users'
import { useEffect, useState } from 'react';

const DynamicApp = dynamic(() => import('../components/Chat'), {
  ssr: false,
  loading: () => <p>...</p>
})

const SEND_GRID_APP_ID = process.env.NEXT_PUBLIC_SEND_BIRD_APP_ID ?? ""
const DEFAULT_USER_ID = process.env.NEXT_PUBLIC_SEND_BIRD_USER_ID ?? ""
const DEFAULT_PROFILE_PIC = "https://static.vecteezy.com/system/resources/previews/000/420/940/original/avatar-icon-vector-illustration.jpg"

export default function App() {
  const [user, setUser] = useState(null)

  const saveUser = async ({id, nickname, profilePhoto}) => {
    try {
      const saveRes = await createUser({
        id,
        nickname,
        profilePhoto
      })
      console.log(saveRes)
    } catch (error) {
      console.log('Error saving user: ', error)
    }
  }

  const getRandomUserId = async () => {
    try {
      const user = await randomUser()
      console.log(user )
      if (user) {
        const {login, name} = user.data?.results[0]
        setUser({userId: login?.username ?? DEFAULT_USER_ID, nickName: name?.first})
        await saveUser({id: login?.username ?? DEFAULT_USER_ID, nickname: name?.first, profilePhoto: DEFAULT_PROFILE_PIC})
      }
    } catch (error) {
      console.log('Error getting random username: ', error)
    }
  }

  useEffect(() => {
    getRandomUserId()
  }, [])

  return (
    <div>
      {user && (
        <SendbirdProvider
          className='relative'
          appId={SEND_GRID_APP_ID}
          userId={user?.userId}
          nickname={user?.nickName}
          profileUrl={DEFAULT_PROFILE_PIC}>
          <Provider store={store}>
            <DynamicApp/>
          </Provider>
        </SendbirdProvider>
      )}
    </div>
  );
};
"use client"

import dynamic from 'next/dynamic'
import '@sendbird/uikit-react/dist/index.css'
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { Provider } from 'react-redux'
import store from '@/store'

const DynamicApp = dynamic(() => import('../components/Chat'), {
  ssr: false,
  loading: () => <p>...</p>
})

const SEND_GRID_APP_ID = process.env.NEXT_PUBLIC_SEND_BIRD_APP_ID ?? ""
const USER_ID = process.env.NEXT_PUBLIC_SEND_BIRD_USER_ID ?? ""

export default function App() {
  return (
    <SendbirdProvider className='relative' appId={SEND_GRID_APP_ID} userId={USER_ID}>
      <Provider store={store}>
        <DynamicApp/>
      </Provider>
    </SendbirdProvider>
  );
};
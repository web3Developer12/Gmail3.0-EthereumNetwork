import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './fonts.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Loader from './components/Loader'
import Home from './components/Home'
import { getAuthorizedAccounts } from './utils/wallet'
import { useEffect,useRef } from 'react'
import { ComposeMail, fetchInboxSender } from './utils/contract'
import LoadingBar from 'react-top-loading-bar'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [user,setUser] = useState('')
  const [inbox,setInbox] = useState([])
  const [progress,setProgress] = useState(0);
  const ref = useRef(null)

  const refreshInbox=async ()=>{
    fetchInboxSender().then((v)=>setInbox(v))
  }

  useEffect(()=>{
    refreshInbox()
  },[])

  return (
    <div className="App">
      <LoadingBar  progress={progress} color='#0b57d0' onLoaderFinished={() => setProgress(0)} ref={ref}/>
      <Toaster 
        position='bottom-left'
        toastOptions={{
          style: {
            padding: '11px',
            background:"#272727",
            color: 'white',
            fontFamily:"GoogleSansRegular",
            borderRadius:'0px'
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loader user={user} setUser={setUser}/>}/>
          <Route path="/mail" element={<Home refreshInbox={refreshInbox} LoaderRef={ref} user={user} inbox={inbox}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

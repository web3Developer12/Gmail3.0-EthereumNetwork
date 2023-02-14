import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './fonts.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Loader from './components/Loader'
import Home from './components/Home'
import { getAuthorizedAccounts } from './utils/wallet'
import { useEffect,useRef } from 'react'
import { ComposeMail, fetchInboxSender, fetchReadSender, fetchSentSender, fetchTrashSender, fetchUnreadSender } from './utils/contract'
import LoadingBar from 'react-top-loading-bar'
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const [user,setUser]         = useState('')
  const [inbox,setInbox]       = useState([])
  const [trash,setTrash]       = useState([])
  const [sent,setSent]         = useState([])
  const [unread,setUnread]     = useState([])
  const [read,setRead]            = useState([])

  const [progress,setProgress]                 = useState(0)
  const [onFetching,setOnFetching]             = useState(false)
  const [onFetchingTrash,setOnFetchingTrash]   = useState(false)
  const [onFetchingSent,setOnFetchingSent]     = useState(false)
  const [onFetchingUnread,setOnFetchingUnread] = useState(false)
  const [onFetchingRead,setOnFetchingRead]     = useState(false)



  const ref = useRef(null)

  const refreshInbox=async ()=>{

    setOnFetching(true)
    ref.current.continuousStart()

    fetchInboxSender().then((v)=>{
      setInbox(v)
      setOnFetching(false)
      ref.current.complete()
    })
  }

  const refreshTrash=async ()=>{

    setOnFetchingTrash(true)
    ref.current.continuousStart()

    fetchTrashSender().then((v)=>{
      setTrash(v)
      setOnFetchingTrash(false)
      ref.current.complete()
    })
  }

  const refreshSent=async ()=>{

    setOnFetchingSent(true)
    ref.current.continuousStart()

    fetchSentSender().then((v)=>{
      setSent(v)
      setOnFetchingSent(false)
      ref.current.complete()
    })
  }

  const refreshUnread=async ()=>{

    setOnFetchingUnread(true)
    ref.current.continuousStart()

    fetchSentSender().then((v)=>{
      setUnread(v)
      setOnFetchingUnread(false)
      ref.current.complete()
    })
  }

  const refreshRead=async ()=>{

    setOnFetchingRead(true)
    ref.current.continuousStart()

    fetchReadSender().then((v)=>{
      setRead(v)
      setOnFetchingRead(false)
      ref.current.complete()
    })
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
          <Route path="/" element={<Loader refLoader={ref} user={user} setUser={setUser}/>}/>
          <Route path="/mail" element={
          <Home 

            /**Loading state */
            onFetching      = {onFetching} 
            OnFetchingTrash = {onFetchingTrash}
            /**refresher */
            refreshInbox = {refreshInbox} 
            refreshTrash = {refreshTrash}
            refreshSent  = {refreshSent}
            refreshUnread= {refreshUnread}
            refreshRead  = {refreshRead}

            /**Loading bar contoller */
            LoaderRef    = {ref} 
            /**data getter*/
            user         = {user} 
            inbox        = {inbox}
            trash        = {trash}
            sent         = {sent}
            unread       = {unread}
            read         = {read}

            /**data setter*/
            setTrash     = {setTrash}
            setSent      = {setSent}

          />
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

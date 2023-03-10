import './Home.css'
import hamburger from '../assets/img/hamburger.svg'
import logo from '../assets/img/gmail.png';
import search from '../assets/img/search.svg';
import filter from '../assets/img/filter.svg';
import edit from '../assets/img/edit.svg';
import Blockies from 'react-blockies';
import { useEffect, useRef, useState } from 'react';
import Editor from './Editor';
import { BulkAction, fetchReplySender} from '../utils/contract';
import {motion} from 'framer-motion'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function TabContentInbox(props){
    return <div className='data'>
        {
            props.tabContent[props.tabController()].length == 0 && <div className='no-content mediumRegular'>
                
                {
                    props.onFetching == true ?<p>Loading...</p>:<p>You don't have any {props.tabController()} mails.{
                        props.onFocus 
                    }</p>
                }
            </div>
        }
        {
            props.tabContent[props.tabController()].map((e,index)=>{
                return <motion.div 
                    initial    =  {{ x:-100,opacity:0}}
                    animate    =  {{ x: 0  ,opacity:1 }}
                    exit       =  {{ x:-100,opacity:0}}
                    transition =  {{ delay:index * 0.06}}
                    key        =  {index}
                    
                    className={`mail-data ${props.selectionId.includes(e.index)?"mail-data-selected":""}`}
                >
                    <div className='mail-data-start'>
                        <span className="material-symbols-outlined" style={props.onSelect ? {color:"black"}:{color:"rgba(63, 63, 63, 0.342)"}} onClick={()=>{
                            props.setOnSelect(true)
                            props.setSelectionId([...props.selectionId,e.index])
                            if(props.onSelect){
                                if(props.selectionId.includes(e.index)){
                                    const newArray=props.selectionId.filter(function(item) {
                                        return item !== e.index
                                    })
                                    props.setSelectionId(newArray)
                                }else{
                                    props.setSelectionId([...props.selectionId,e.index])
                                }
                            }
                            
                        }}>
                            {props.selectionId.includes(e.index)?"check_box":"check_box_outline_blank"}
                        </span>
                        <span onClick={()=>{
                            if(props.onSelect == false){
                                toast('Star email in bulk mode')
                            }


                        }} className="material-symbols-outlined" style={{color:e.starred&&"#f4b400"}}>star</span>
                        <p className='boldSans' onClick =  {()=>{
                                props.setOnSelect(true)
                                props.setSelectionId([e.index])
                                props.setSelected(e)
                            }} 
                            style={{color:e.read && "gray"}}>{e.subject} </p>
                        </div>
                    <p className='mediumRegular mark' style={{color:e.read && "gray"}}>
                        <span className='boldSans'>{e.markdown.substring(0,23)}</span> - <span className='opp'>{e.markdown.slice(-56)}...</span>
                    </p>
                    <p className='mediumSans hour'>{new Date(e.timeStamp).toLocaleTimeString()}</p>

                    

                </motion.div>
            })
        }
    </div>
}
function TabContentGeneral(props){

    
    const tabContentController = {
        "trash":props.trash,
        "sent" :props.sent,
        "starred":props.star,
        "archive":props.archive,
        "spam":props.spam,
        "unread":props.unread,
        "read":props.read,

    }
    const name = ()=>{
        if(props.indexGeneral == 1){
            return "starred"
        }else if(props.indexGeneral == 2){
            return "sent"
        }else if(props.indexGeneral== 3){
            return "archive"
        }
        else if(props.indexGeneral == 4){
            return "spam"
        }
        else if(props.indexGeneral == 6){
            return "unread"
        }
        else if(props.indexGeneral == 7){
            return "read"
        }
        else if(props.indexGeneral == 8){
            return "trash"
        }

        return ""
    }

    useEffect(()=>{
        props.setSelectionId([])
        if(props.indexGeneral == 2){
            props.refreshSent()
        }else if(props.indexGeneral == 8){
            props.refreshTrash() 
        }else if(props.indexGeneral == 6){
            props.refreshUnread()
        }
        else if(props.indexGeneral == 7){
            props.refreshRead()
        }else if(props.indexGeneral == 4){
            props.refreshSpam()
        }
        else if(props.indexGeneral == 3){
            props.refreshArchive()
        }
        else if(props.indexGeneral == 1){
            props.refreshStar()
        }

    },[props.indexGeneral])

    return <div className='data'>
        {
            tabContentController[name()].length == 0 && <div className='no-content mediumRegular'>
                <p>You don't have any {name()} mails. </p>
                
            </div>
        }
        {
            tabContentController[name()].map((e,index)=>{
                return <motion.div key={index}
                    initial    =  {{ x:-100,opacity:0}}
                    animate    =  {{ x: 0  ,opacity:1 }}
                    exit       =  {{ x:-100,opacity:0}}
                    transition =  {{ delay:index * 0.06}}
                    className={`mail-data ${props.selectionId.includes(e.index)?"mail-data-selected":""}`}
                >
                    <div className='mail-data-start'>
                   
                    <span className="material-symbols-outlined" style={props.onSelect ? {color:"black"}:{color:"rgba(63, 63, 63, 0.342)"}} onClick={()=>{
                            props.setOnSelect(true)
                            props.setSelectionId([...props.selectionId,e.index])
                            if(props.onSelect){
                                if(props.selectionId.includes(e.index)){
                                    const newArray=props.selectionId.filter(function(item) {
                                        return item !== e.index
                                    })
                                    props.setSelectionId(newArray)
                                }else{
                                    props.setSelectionId([...props.selectionId,e.index])
                                }
                            }
                            
                        }}>
                            {props.selectionId.includes(e.index)?"check_box":"check_box_outline_blank"}
                    </span>
                    {
                        e.spam == false ?
                    
                        <span onClick={()=>{

                        }} className="material-symbols-outlined" style={{color:e.starred&&"#f4b400"}}>
                            star
                        </span> :<span className="material-symbols-outlined" style={{color:"#d50000"}}>report</span>
                    }

                        <p className='boldSans'>{e.subject} </p>
                    </div>
                    <p className='mediumRegular mark'>
                        <span className='boldSans'>{e.markdown.substring(0,23)}</span> - <span className='opp'>{e.markdown.slice(-56)}...</span>
                    </p>
                    <p className='mediumSans hour'>{new Date(e.timeStamp).toLocaleTimeString()}</p>
                    

                </motion.div>
            })
        }
    </div>
}

export default function Home(props){

    const [index,setIndex]             = useState(0)
    const [onSelect,setOnSelect]       = useState(false)
    const [tab,setTab]                 = useState(0)
    const [menuToggle,setMenuToggle]   = useState(false)
    const [isOpen,setIsOpen]           = useState(false)
    const [selectionId,setSelectionId] = useState([])
    const [starredId  ,setStarredId]   = useState([])
    const [bulkFlag,setBulkFlag]       = useState(undefined)
    const [onFocus,setOnFocus]         = useState(false)
    const [searchValue,setSearchValue] = useState('')
    const [modalUser,setModalUser]     = useState(false)
    const [suggestion,setSuggestion]   = useState([])
    const [filteredSearch,setFilteredSearch]   = useState(['Google Nodes Team'.toLowerCase()])
    const [selected,setSelected]               = useState(null)
    const [filteredResults,setFilteredResults] = useState([])
    const [reply,setReply]     = useState(false)
    const [forward,setForward] = useState(false)
    const [replyLoading,setReplyLoading] = useState(false)
    const [dataReply,setDataReply]  = useState([])


    const tabContent = {
        "primary": onFocus ? filteredResults:props.inbox,
        "promotions":onFocus ? filteredResults:[],
        "social":onFocus ? filteredResults:[]
    }

    const refSuggestion = useRef(null)
    const modalUserRef  = useRef(null)
    const navigate      = useNavigate()

    const tabController = ()=>{
        if(tab == 0){
            return "primary"
        }else if(tab == 1){
            return "promotions"
        }else{
            return "social"
        }
    }
    const ref = useRef(null);

    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOnFocus(false)
        setFilteredResults([])
      }

    };
  
    useEffect(() => {
        
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    });

    const fetchReplies = async()=>{
        setReplyLoading(true)
        await fetchReplySender(selected.index).then((res)=>{setDataReply(res)})
        setReplyLoading(false)

    }

    useEffect(()=>{
        if(selected != null){
            fetchReplies()
        }
    },[selected])

  
    return <div className='Home'>

        <Editor 
            forward={forward} 
            setForward={setForward} 
            dataReply={dataReply} 
            refreshReply={fetchReplies} 
            selected={selected} 
            reply={reply} 
            setReply={setReply} 
            refreshInbox={props.refreshInbox} 
            isOpen={isOpen} setIsOpen={setIsOpen} 
            LoaderRef={props.LoaderRef}
        />
        
        <div className='Navbar'> 
            <div className='NavMenuTitle'>
                <img src={hamburger} width={28} className='navIcon' onClick={()=>{
                    setMenuToggle(!menuToggle)
                }}/>
                <div>
                    <img src={logo} width={28}/>
                    <p style={{fontSize:20}} className='mediumRegular'>Nodemail</p>
                </div>
            </div>
            
                <div className='searchbar' ref={ref}>
                    <div className={`${onFocus == true ? 'input-focus':''} input`}>

                        <img src={search} width={26} onClick={()=>{
                            if(searchValue.trim().length != 0){
                                if(index == 0){
                                    const filtered = props.inbox.filter((item) =>
                                        item.subject.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
                                        item.markdown.toLowerCase().includes(searchValue.toLowerCase().trim()) 

                                    );
                                    setFilteredResults(filtered)
                                    console.log(filtered)
                                }
                            }
                        }}/>
                        <input value={`${searchValue}`}  onFocus={()=>{
                            setOnFocus(true)
                        }}  onChange={(e)=>{
                    
                            setSearchValue(e.target.value)
                            const res = suggestion.filter(element => element.toLowerCase().includes(e.target.value.toLowerCase()))
                            setFilteredSearch(res.slice(0,1))

                            let pattern  = RegExp(`${e.target.value.toLowerCase()}`)

                            if(refSuggestion.current != null){
                                refSuggestion.current.innerHTML = refSuggestion.current.innerText.toLowerCase().replace(
                                    pattern,match=> `<mark>${match}</mark>`
                                )
                            }
                            if(index == 0){
                                const filtered = props.inbox.filter((item) =>
                                    item.subject.toLowerCase().includes(e.target.value.toLowerCase().trim()) ||
                                    item.markdown.toLowerCase().includes(e.target.value.toLowerCase().trim()) 

                                );
                                setFilteredResults(filtered)
                                console.log(filtered)
                            }
                           

                        }} type="text" placeholder='Search mail' className='mediumRegular'/>
                        <img src={filter} width={26} style={{opacity:!onFocus &&0.1}}/>
                        
                    </div>

                    { onFocus && filteredSearch.length != 0 &&
                    <motion.div 
                    initial    =  {{ y:100,opacity:1}}
                    animate    =  {{ y: 0  ,opacity:1 }}
                    
                        className='searchbar-options'
                    > 
                        <div className='options'>
                            {   filteredSearch.length != 0 &&
                                filteredSearch.map((el,key)=>{
                                    return <motion.p  key={key}
                                    initial    =  {{ opacity:0}}
                                    animate    =  {{ opacity:1 }}
                                    exit       =  {{ opacity:0}}
                                    transition =  {{ delay:index * 1}}

                                    onClick={()=>{
                                        setSearchValue(el)
                                        setOnFocus(false)
                                    }} className='search-autocomplete mediumRegular'>
                                    <span className="material-symbols-outlined" style={{color:"black"}}>history</span> 
                                    <span ref={refSuggestion}>{el}</span>
                                </motion.p>
                                })
                            }
                            {   filteredSearch.length == 0 &&
                                <motion.div 
                                    initial    =  {{ x:-100,opacity:0}}
                                    animate    =  {{ x: 0  ,opacity:1 }}
                                    exit       =  {{ x:-100,opacity:0}}
                                    transition =  {{ delay:0 * 0.06}}
                                    className='no-result mediumSans'>
                                    No previous search keywords 
                                </motion.div>
                            }
                            
                            
                        </div>
                    </motion.div>
                    }
                </div>

            <div className='toolBox'>
                <span className="material-symbols-outlined" id='info-app'>info</span>
                <span className="material-symbols-outlined" id='info-contract'>key</span>
                <div onClick={()=>{setModalUser(!modalUser)}}>
                <Blockies
                    seed={props.user.trim().length != 0?props.user:""}
                    size={10} 
                    scale={3} 
                    color="rgba(255,255,255,.2)" 
                    bgColor="#0b57d0" 
                    spotColor="rgba(255,255,255,.2)"
                    className="identicon" 
                />
                </div>
                
                { modalUser &&
                <motion.div 
                initial    =  {{ y:100,opacity:1}}
                animate    =  {{ y: 0  ,opacity:1 }}
                ref        =  {modalUserRef}
                className='user-more'>
                    <div className='user-more-details'>
                    <Blockies
                        seed={props.user.trim().length != 0?props.user:""}
                        size={18} 
                        scale={3} 
                        color="rgba(255,255,255,.2)" 
                        bgColor="#0b57d0" 
                        spotColor="rgba(255,255,255,.2)"
                        className="identicon" 
                    />
                    <div className='data-user'>
                        <p className='mediumSans'>{props.user.substring(0,6)+"...."+props.user.slice(-6)}</p>
                        <button onClick={()=>{
                            window.open(`https://etherscan.io/address/${props.user}`,'_blank')
                        }} className='mediumSans'>View on Etherscan</button>
                    </div>
                    
                    </div>
                    <button className='signout' onClick={async()=>{
                        await window.ethereum.request({
                            method: "eth_requestAccounts",
                            params: [{eth_accounts: {}}]
                        })
                        props.setUser('')
                        navigate('/')
                        

                    }}>
                        <span className="material-symbols-outlined">logout</span>
                        <span className='mediumSans'>Sign out</span>
                    </button>
                </motion.div>
                    }


            </div>
        </div>

        <div className='body' style={{gridTemplateColumns:menuToggle ? "5% 1fr":"18% 1fr"}}>
            <div className='SideNav'>
                <button onClick={()=>setIsOpen(true)} className={`${menuToggle?"composeToggle":"compose"} mediumRegular`}>
                    <img src={edit} width={28}/>
                    {!menuToggle && 'Compose'}
                </button>

                {
                    menuToggle == false  && <ul>
                    <li onClick={()=>setIndex(0)} className={index == 0 ?"active":""}>
                        <span className="material-symbols-outlined">inbox</span>
                        <span className='mediumRegular'>Inbox</span>
                        {
                            index == 0  &&  
                            <motion.span 
                                initial    =  {{ x:-100,opacity:0}}
                                animate    =  {{ x: 0  ,opacity:1 }}
                                exit       =  {{ x:-100,opacity:0}}
                                transition =  {{ delay:index * 0.06}}
                                className='boldSans inbox-counter'
                                >
                                {props.inbox.length}
                            </motion.span>
                        
                        }

                    </li>
                    <li onClick={()=>setIndex(1)} className={index == 1 ?"active":""}>
                        <span className="material-symbols-outlined">star</span>
                        <span className='mediumRegular'>Starred</span>
                        {
                            index == 1  &&  
                            <motion.span 
                                initial    =  {{ x:-100,opacity:0}}
                                animate    =  {{ x: 0  ,opacity:1 }}
                                exit       =  {{ x:-100,opacity:0}}
                                transition =  {{ delay:index * 0.06}}
                                className='boldSans inbox-counter'
                                >
                                {props.star.length}
                            </motion.span>
                        
                        }
                    </li>
                    <li onClick={()=>setIndex(2)} className={index == 2 ?"active":""}>
                        <span className="material-symbols-outlined">send</span>

                        <span className='mediumRegular'>Sent</span>
                        {
                            index == 2  &&  
                            <motion.span 
                                initial    =  {{ x:-100,opacity:0}}
                                animate    =  {{ x: 0  ,opacity:1 }}
                                exit       =  {{ x:-100,opacity:0}}
                                transition =  {{ delay:index * 0.06}}
                                className='boldSans inbox-counter'
                                >
                                {props.sent.length}
                            </motion.span>
                        
                        }
                    </li>
                    <li onClick={()=>setIndex(3)} className={index == 3 ?"active":""}>
                        <span className="material-symbols-outlined">archive</span>

                        <span className='mediumRegular'>Archive</span>
                        {
                            index == 3  &&  
                            <motion.span 
                                initial    =  {{ x:-100,opacity:0}}
                                animate    =  {{ x: 0  ,opacity:1 }}
                                exit       =  {{ x:-100,opacity:0}}
                                transition =  {{ delay:index * 0.06}}
                                className='boldSans inbox-counter'
                                >
                                {props.archive.length}
                            </motion.span>
                        
                        }
                    </li>
                    <li onClick={()=>setIndex(4)} className={index == 4 ?"active":""}>
                    <span className="material-symbols-outlined">report</span>
                    
                        <span className='mediumRegular'>Spam</span>
                        {
                            index == 4  &&  
                            <motion.span 
                                initial    =  {{ x:-100,opacity:0}}
                                animate    =  {{ x: 0  ,opacity:1 }}
                                exit       =  {{ x:-100,opacity:0}}
                                transition =  {{ delay:index * 0.06}}
                                className='boldSans inbox-counter'
                                >
                                {props.spam.length}
                            </motion.span>
                        
                        }
                    </li>
                    <li onClick={()=>setIndex(6)} className={index == 6 ?"active":""}>
                        <span className="material-symbols-outlined">
                        mark_email_unread
                        </span>

                        <span className='mediumRegular'>Unread</span>

                        {
                            index == 6  &&  
                            <motion.span 
                                initial    =  {{ x:-100,opacity:0}}
                                animate    =  {{ x: 0  ,opacity:1 }}
                                exit       =  {{ x:-100,opacity:0}}
                                transition =  {{ delay:index * 0.06}}
                                className='boldSans inbox-counter'
                                >
                                {props.unread.length}
                            </motion.span>
                        
                        }


                    </li>
                    <li onClick={()=>setIndex(7)} className={index == 7 ?"active":""}>
                        <span className="material-symbols-outlined">
                        mark_email_read
                        </span>
                        <span className='mediumRegular'>Read</span>
                        {
                            index == 7  &&  
                            <motion.span 
                                initial    =  {{ x:-100,opacity:0}}
                                animate    =  {{ x: 0  ,opacity:1 }}
                                exit       =  {{ x:-100,opacity:0}}
                                transition =  {{ delay:index * 0.06}}
                                className='boldSans inbox-counter'
                                >
                                {props.read.length}
                            </motion.span>
                        
                        }
                    </li>

                    <li  onClick={()=>setIndex(8)} className={index == 8 ?"active":""}>
                    <span className="material-symbols-outlined">
                        delete
                        </span>
                        <span className='mediumRegular'>Trash</span>
                        {
                            index == 8  &&  
                            <motion.span 
                                initial    =  {{ x:-100,opacity:0}}
                                animate    =  {{ x: 0  ,opacity:1 }}
                                exit       =  {{ x:-100,opacity:0}}
                                transition =  {{ delay:index * 0.06}}
                                className='boldSans inbox-counter'
                                >
                                {props.trash.length}
                            </motion.span>
                        
                        }
                    </li>


                </ul>
                }
                
            </div>
            <div className='body-email'>
                <div className='header'>
                    <div className='header-tools'>
                        <div className='header-tools-row'>
                            {
                                selected != null && <span className="material-symbols-outlined" onClick={()=>{
                                    setOnSelect(false)
                                    setSelected(null)
                                    setReply(false)
                                    setForward(false)
                                    setSelectionId([])
                                }}>
                                    arrow_back
                                </span>
                            }
                            {   selected == null &&
                                <span style={onSelect ? {color:"black"}:{}} onClick={()=>{
                                    if(selected == null){
                                            setOnSelect(!onSelect)
                                            if(onSelect != true){
                                                setSelectionId([...selectionId])
                                            }else{
                                                setSelectionId([])
                                                setStarredId([])
                                            }
                                            }
                                    }} className="material-symbols-outlined">
                                    {
                                        onSelect ? "check_box":"check_box_outline_blank"
                                    }
                                </span>
                            }   

                            <div className='tool-box-selection'>
                                    {
                                        onSelect && <>
                                        <span className="material-symbols-outlined" onClick={()=>{
                                            setBulkFlag('archive-flag')
                                            
                                        }}
                                        style={{
                                            color:bulkFlag == 'archive-flag'?"#0b57d0":"gray"
                                        }}>archive</span>
                                        
                                        <span style={{
                                            color:bulkFlag == 'star-flag'?"#0b57d0":"gray"
                                        }} 
                                        
                                        onClick={()=>{
                                            setBulkFlag('star-flag')
                                        }}
                                        className="material-symbols-outlined">star</span>

                                        <span style={{
                                            color:bulkFlag == 'spam-flag'?"#0b57d0":"gray"
                                        }} 
                                        onClick={()=>{
                                            setBulkFlag('spam-flag')

                                        }}className="material-symbols-outlined">report</span>

                                        <span style={{
                                            color:bulkFlag == 'unread-flag'?"#0b57d0":"gray"
                                        }}  onClick={()=>{
                                            setBulkFlag('unread-flag')

                                        }}className="material-symbols-outlined">mark_email_unread</span>

                                        <span style={{
                                            color:bulkFlag == 'read-flag'?"#0b57d0":"gray"
                                        }} 
                                        onClick={()=>{
                                            setBulkFlag('read-flag')

                                        }}
                                        className="material-symbols-outlined">mark_email_read</span>

                                        <span style={{
                                            color:bulkFlag == 'trash-flag'?"#0b57d0":"gray"
                                        }} 
                                        onClick={()=>{
                                            setBulkFlag('trash-flag')
                                        }}
                                        className="material-symbols-outlined">delete</span>
                                        </>
                                    }
                                    {
                                        onSelect == false &&  <span className="material-symbols-outlined" onClick={async()=>{
                                            props.LoaderRef.current.continuousStart()
                                            await props.refreshInbox()
                                            props.LoaderRef.current.complete()
    
                                        }}>refresh</span>
                                    }
                                    <span className="material-symbols-outlined">more_vert</span>

                
                            </div>
                            {
                                onSelect &&  <button onClick={async ()=>{
                                    
                                    if(bulkFlag == "star-flag"){
                                        await BulkAction("STAR",selectionId.sort(),props.LoaderRef,setSelectionId)
                                        props.refreshStar()
                                    }
                                    else if(bulkFlag == "archive-flag"){
                                        await BulkAction("ARCHIVE",selectionId.sort(),props.LoaderRef,setSelectionId)
                                        props.refreshArchive()

                                    }else if(bulkFlag == "spam-flag"){
                                        await BulkAction("SPAM",selectionId.sort(),props.LoaderRef,setSelectionId)
                                        props.refreshSpam()

                                    }else if(bulkFlag == "unread-flag"){
                                        await BulkAction("READ",selectionId.sort(),props.LoaderRef,setSelectionId)
                                        props.refreshUnread()
                                    }
                                    else if(bulkFlag == "read-flag"){
                                        await BulkAction("READ",selectionId.sort(),props.LoaderRef,setSelectionId)
                                        props.refreshRead()
                                    }
                                    else if(bulkFlag == "trash-flag"){
                                        await BulkAction("TRASH",selectionId.sort(),props.LoaderRef,setSelectionId)
                                        props.refreshTrash()
                                    }
                                    props.refreshInbox()
                                    if(selected == null){
                                        setOnSelect(false)
                                    }

                                }} className={`bulk mediumSans ${selectionId.length == 0?'bulk-inactive':''}`}>
                                <span className="material-symbols-outlined">fingerprint</span>
                                </button>
                            }
                            
                            
                        </div>
                        
                        <div className='tab-details'>
                            <p className='mediumSans'>1-50 of {/*tabContent[tabController()].length*/}</p>
                            <span onClick={()=>{
                                if(tab > 0){
                                   
                                    setTab(tab-1)
                                }
                            }} className="material-symbols-outlined">chevron_left</span>
                            <span  onClick={()=>{
                                if(tab < 2){
                                    setTab(tab+1)
                                }
                            }} className="material-symbols-outlined">chevron_right</span>
                        </div>
                    </div>
                    {
                        selectionId.length > 0 && selected == null && <div className='selection-banner mediumSans'><span className='num' style={{color:"black"}}>{selectionId.length.toString()}</span> conversations on this page are selected.  You can select more mail as you want in the page</div>
                    }
                    {
                        index == 0 && selected == null && <div className='tabs'>
                        <div className='ceil'>
                            <button onClick={()=>{
                                if(onFocus){
                                    setOnFocus(false)
                                }
                                setTab(0)
                            }} className={tab == 0?"tab-element tab-element-active":"tab-element"}>
                            <span className="material-symbols-outlined" style={{
                                color:tab == 0?"#0b57d0":"rgb(61,61,61)"
                            }}>inbox</span>
                            <span className='mediumSans'>Primary</span>
                            </button>
                        </div>
                        <div className='ceil'>
                            <button onClick={()=>{
                                if(onFocus){
                                    setOnFocus(false)

                                }
                                setTab(1)
                            }} className={tab == 1?"tab-element tab-element-active":"tab-element"}>
                            <span className="material-symbols-outlined" style={{
                                color:tab == 1?"#0b57d0":"rgb(61,61,61)"
                            }}>group</span>
                            <span className='mediumSans'>Promotions</span>
                            </button>
                        </div>
                        <div className='ceil'>
                            <button onClick={()=>{
                                if(onFocus){
                                    setOnFocus(false)
                                }
                                setTab(2)
                            }} className={tab == 2?"tab-element tab-element-active":"tab-element"}>
                            <span className="material-symbols-outlined" style={{
                                color:tab == 2?"#0b57d0":"rgb(61,61,61)"
                            }}>person</span>
                            <span className='mediumSans'>Social</span>
                            </button>
                        </div>
 
                       

                    </div>
                    }
                    
                    {
                        index == 0 && selected == null &&
                        <TabContentInbox 
                            onFocus       = {onFocus}
                            starredId     = {starredId} 
                            setStarredId  = {setStarredId} 
                            onSelect      = {onSelect} 
                            setOnSelect   = {setOnSelect} 
                            selectionId   = {selectionId} 
                            setSelectionId= {setSelectionId} 
                            searchValue    = {searchValue}

                            tabContent    = {tabContent} 
                            tabController = {tabController}

                            setBulkFlag   = {setBulkFlag}
                            onFetching    = {props.onFetching}

                            setSelected   = {setSelected}
                        />
                    }
                    {
                        index > 0 &&
                        <TabContentGeneral 
                            starredId     = {starredId} 
                            setStarredId  = {setStarredId} 
                            onSelect      = {onSelect} 
                            setOnSelect   = {setOnSelect} 
                            selectionId   = {selectionId} 
                            setSelectionId= {setSelectionId} 
                            tabContent    = {tabContent} 
                            tabController = {tabController}
                            setBulkFlag   = {setBulkFlag}
                            onFetching    = {props.onFetching}
                            indexGeneral  = {index}
                            refreshTrash  = {props.refreshTrash}
                            trash         = {props.trash}
                            setTrash      = {props.setTrash}
                            onFetchingTrash = {props.onFetchingTrash}
                            refreshSent     = {props.refreshSent} 

                            sent            = {props.sent}
                            setSent         = {props.setSent}

                            unread          = {props.unread}
                            refreshUnread   = {props.refreshUnread}

                            read            = {props.read}
                            refreshRead     = {props.refreshRead}

                            spam            = {props.spam}
                            refreshSpam     = {props.refreshSpam}

                            archive          = {props.archive}
                            refreshArchive   = {props.refreshArchive}

                            star             = {props.star}
                            refreshStar      = {props.refreshStar}

                            inbox            = {props.inbox}
                            refreshInbox     = {props.refreshInbox}


                        />
                    }
                    {
                        selected != null && <motion.div 
                            className='details-mail'
                            initial = {{opacity:0}}
                            animate = {{opacity:1}}
                            transition ={{delay:.2}}

                        >

                            <div className='details-header'>
                                <p className='head mediumRegular'>{selected.subject}</p>
                                <button className='badge mediumRegular'>inbox</button>
                            </div>

                            <div >
                                <div className='details-body'>
                                    <div className='details-body-ceil'>
                                        <Blockies
                                            seed={selected.from}
                                            size={13} 
                                            scale={3} 
                                            color="#a29bfe" 
                                            bgColor="#6c5ce7" 
                                            spotColor="#a29bfe"
                                            className="identicon" 
                                        />
                                        <div>
                                            <p className='boldSans'>{selected.from}</p>
                                            <p className='to-h mediumRegular'> 
                                            {props.user.toString() === selected.to.toString()? "Me":"View the sender"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='r-side'>
                                        <span className="material-symbols-outlined">star</span>
                                        <p>{new Date(selected.timeStamp).toLocaleTimeString()}</p>
                                    </div>
                                </div>

                                <pre className='text-body'>
                                    {selected.markdown}
                                </pre>
                            </div>

                            {
                                dataReply.length == 0 && !replyLoading && 
                                <div className='reply-forward'>
                                    <button onClick={()=>{setReply(!reply)}}>
                                        <span className="material-symbols-outlined">reply</span>
                                        <span>Reply</span>
                                    </button>
                                    <button onClick={()=>{setForward(!forward)}}>
                                        <span className="material-symbols-outlined">forward</span>
                                        <span>Forward</span>
                                    </button>
                                </div>
                            }
                           

                            {
                                dataReply.map((el,key)=>{
                                    return <motion.div
                                        initial    = {{opacity:0}}
                                        animate    = {{opacity:1}}
                                        transition = {{delay:0.06 * key}}
                                        key = {key}
                                    >
                                    <div className='details-body'>
                                        <div className='details-body-ceil'>
                                            <Blockies
                                                seed={el.from}
                                                size={13} 
                                                scale={3} 
                                                color="#a29bfe" 
                                                bgColor="#6c5ce7" 
                                                spotColor="#a29bfe"
                                                className="identicon" 
                                            />
                                            <div>
                                                <p className='mediumRegular'>{el.from}</p>
                                                <p className='to-h mediumRegular'> 
                                                {props.user.toString() === el.to.toString()? "Me":"View the sender"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='r-side'>
                                            <span className="material-symbols-outlined">reply</span>
                                            <p>{new Date(el.timeStamp).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
    
                                    <pre className='text-body'>
                                        {el.markdown}
                                    </pre>
                                    {
                                        key == dataReply.length-1 && !replyLoading && <
                                            motion.div className='reply-forward'
                                            initial    = {{opacity:0}}
                                            animate    = {{opacity:1}}
                                            transition = {{delay:1}}
                                        >
                                        <button onClick={()=>{setReply(!reply)}}>
                                            <span className="material-symbols-outlined">reply</span>
                                            <span>Reply</span>
                                        </button>
                                        <button onClick={()=>{setForward(!forward)}}>
                                            <span className="material-symbols-outlined">forward</span>
                                            <span>Forward</span>
                                        </button>
                                    </motion.div>
                                    }
                                </motion.div>
                                })
                            }

                        </motion.div>  
                    }
                   
                </div>
            </div>
        </div>


    </div>
}
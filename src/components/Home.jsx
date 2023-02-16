import './Home.css'
import hamburger from '../assets/img/hamburger.svg'
import logo from '../assets/img/gmail.png';
import search from '../assets/img/search.svg';
import filter from '../assets/img/filter.svg';
import edit from '../assets/img/edit.svg';
import Blockies from 'react-blockies';
import { useEffect, useRef, useState } from 'react';
import Editor from './Editor';
import { BulkAction} from '../utils/contract';
import {motion} from 'framer-motion'
import toast from 'react-hot-toast';

function TabContentInbox(props){
    return <div className='data'>
        {
            props.tabContent[props.tabController()].length == 0 && <div className='no-content mediumRegular'>
                
                {
                    props.onFetching == true ?<p>Loading...</p>:<p>You don't have any {props.tabController()} mails.</p>
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
                    className={`mail-data ${props.selectionId.includes(index)?"mail-data-selected":""}`}
                >
                    <div className='mail-data-start'>
                        <span className="material-symbols-outlined" style={props.onSelect ? {color:"black"}:{color:"rgba(63, 63, 63, 0.342)"}} onClick={()=>{
                            props.setOnSelect(true)
                            props.setSelectionId([...props.selectionId,index])
                            if(props.onSelect){
                                if(props.selectionId.includes(index)){
                                    const newArray=props.selectionId.filter(function(item) {
                                        return item !== index
                                    })
                                    props.setSelectionId(newArray)
                                }else{
                                    props.setSelectionId([...props.selectionId,index])
                                }
                            }
                            
                        }}>
                            {props.selectionId.includes(index)?"check_box":"check_box_outline_blank"}
                        </span>
                        <span onClick={()=>{
                            if(props.onSelect == false){
                                toast('Star email in bulk mode')
                            }


                        }} className="material-symbols-outlined" style={{color:props.starredId.includes(index)&&"#f4b400"}}>star</span>
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
function TabContentGeneral(props){

    const [data,setData] = useState([])
    
    const tabContentController = {
        "trash":props.trash,
        "sent" :props.sent,
        "starred":[],
        "draft":[],
        "spam":props.spam,
        "mails":[],
        "unread":props.unread,
        "read":props.read,

    }

    const name = ()=>{
        if(props.indexGeneral == 1){
            return "starred"
        }else if(props.indexGeneral == 2){
            return "sent"
        }else if(props.indexGeneral== 3){
            return "draft"
        }
        else if(props.indexGeneral == 4){
            return "spam"
        }
        else if(props.indexGeneral == 5){
            return "mails"
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
    },[props.indexGeneral])

    return <div className='data'>
        {
            tabContentController[name()].length == 0 && <div className='no-content mediumRegular'>
                <p>You don't have any {name()} mails.</p>
                
            </div>
        }
        {
            tabContentController[name()].map((e,index)=>{
                return <motion.div key={index}
                    initial    =  {{ x:-100,opacity:0}}
                    animate    =  {{ x: 0  ,opacity:1 }}
                    exit       =  {{ x:-100,opacity:0}}
                    transition =  {{ delay:index * 0.06}}
                    className='mail-data'
                >
                    <div className='mail-data-start'>
                        <span className="material-symbols-outlined">check_box_outline_blank</span>
                        <span className="material-symbols-outlined">star</span>
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

    const [suggestion,setSuggestion]   = useState([
        'Google Nodes Team - Ethereum'.toLowerCase()

    ])
    const [filteredSearch,setFilteredSearch] = useState(suggestion)

    const tabContent = {
        "primary":props.inbox,
        "promotions":[],
        "social":[]
    }

    const refSuggestion = useRef(null)

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
      }
    };
  
    useEffect(() => {
        
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    });

  
    return <div className='Home'>
        <Editor refreshInbox={props.refreshInbox} isOpen={isOpen} setIsOpen={setIsOpen} LoaderRef={props.LoaderRef}/>
        
        <div className='Navbar'>
            <div className='NavMenuTitle'>
                <img src={hamburger} width={28} className='navIcon' onClick={()=>{
                    setMenuToggle(!menuToggle)
                }}/>
                <div>
                    <img src={logo} width={36}/>
                    <p className='mediumRegular'>Gmail</p>
                </div>
            </div>
            
                <div className='searchbar' ref={ref}>
                    <div className={`${onFocus == true ? 'input-focus':''} input`}>
                        <img src={search} width={26}/>
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
                           

                        }} type="text" placeholder='Search mail' className='mediumRegular'/>
                        <img src={filter} width={26}/>
                        
                    </div>

                    { onFocus && 
                    <motion.div 
                    initial    =  {{ y:100,opacity:1}}
                    animate    =  {{ y: 0  ,opacity:1 }}
                    transition =  {{ type: 'spring',bounce:1,stiffness: 300,velocity: 6}}
                        className='searchbar-options'
                    > 
                        <div className='options'>
                            {   filteredSearch.length != 0 &&
                                filteredSearch.map((el,key)=>{
                                    return <motion.p  key={key}
                                    initial    =  {{ x:-100,opacity:0}}
                                    animate    =  {{ x: 0  ,opacity:1 }}
                                    exit       =  {{ x:-100,opacity:0}}
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
                                    No results for <span className='boldSans'>{searchValue}</span>
                                </motion.div>
                            }
                            
                            
                        </div>
                    </motion.div>
                    }
                </div>

            <div className='toolBox'>
                <span className="material-symbols-outlined">info</span>
                <span className="material-symbols-outlined">key</span>

                <Blockies
                    seed={props.user.trim().length == 0?props.user:"0xfC4F626a3dfa723E4b501FeE03D1eC5f9f55dcE4"}
                    size={10} 
                    scale={3} 
                    color="rgba(255,255,255,.3)" 
                    bgColor="#0b57d0" 
                    spotColor="rgba(255,255,255,.3)"
                    className="identicon" 
                />
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
                        <span className="material-symbols-outlined">draft</span>

                        <span className='mediumRegular'>Draft</span>
                    </li>
                    <li onClick={()=>setIndex(4)} className={index == 4 ?"active":""}>
                    <span className="material-symbols-outlined">report</span>
                    
                        <span className='mediumRegular'>Spam</span>
                    </li>
                    <li onClick={()=>setIndex(5)} className={index == 5 ?"active":""}>
                    <span className="material-symbols-outlined">mail</span>

                        <span className='mediumRegular'>All Mail</span>
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

                            <span style={onSelect ? {color:"black"}:{}} onClick={()=>{
                                    setOnSelect(!onSelect)
                                    if(onSelect != true){
                                        setSelectionId([...selectionId])
                                    }else{
                                        setSelectionId([])
                                        setStarredId([])
                                    }
                                }} className="material-symbols-outlined">
                                {
                                    onSelect ? "check_box":"check_box_outline_blank"
                                }
                            </span>

                            <div className='tool-box-selection'>
                                    {
                                        onSelect && <>
                                        <span className="material-symbols-outlined" onClick={()=>{
                                            setBulkFlag('archive-flag')
                                            setStarredId([...selectionId])
                                        }}
                                        style={{
                                            color:bulkFlag == 'archive-flag'?"#0b57d0":"gray"
                                        }}>archive</span>
                                        
                                        <span style={{
                                            color:bulkFlag == 'star-flag'?"#0b57d0":"gray"
                                        }} 
                                        
                                        onClick={()=>{
                                            setBulkFlag('star-flag')
                                            setStarredId([...selectionId])
                                        }}
                                        className="material-symbols-outlined">star</span>

                                        <span style={{
                                            color:bulkFlag == 'spam-flag'?"#0b57d0":"gray"
                                        }} 
                                        onClick={()=>{
                                            setBulkFlag('spam-flag')
                                            setStarredId([...selectionId])

                                        }}className="material-symbols-outlined">report</span>

                                        <span className="material-symbols-outlined">mark_email_read</span>
                                        <span className="material-symbols-outlined">mark_email_unread</span>

                                        <span style={{
                                            color:bulkFlag == 'trash-flag'?"#0b57d0":"gray"
                                        }} 
                                        onClick={()=>{
                                            setBulkFlag('trash-flag')
                                            setStarredId([...selectionId])
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
                                            alert(`Move from ${index}`)
                                            if(index == 0 && bulkFlag == "trash-flag"){
                                                await BulkAction(0,3,selectionId).wait()
                                                setOnSelect(false)
                                                props.refreshInbox()


                                            }else if(index == 0 && bulkFlag == "spam-flag"){
                                                await BulkAction(0,2,selectionId).wait()
                                                props.refreshInbox()
                                            }
                                            setOnSelect(false)

                                }} className={`bulk mediumSans ${selectionId.length == 0?'bulk-inactive':''}`}>
                                <span className="material-symbols-outlined">fingerprint</span>
                                </button>
                            }
                            
                            
                        </div>
                        <div className='tab-details'>
                            <p className='mediumSans'>1-50 of {tabContent[tabController()].length}</p>
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
                        selectionId.length > 0 && <div className='selection-banner mediumSans'><span className='num' style={{color:"black"}}>{selectionId.length.toString()}</span> conversations on this page are selected.  You can select more mail as you want in the page</div>
                    }
                    {
                        index == 0 && <div className='tabs'>
                        <div className='ceil'>
                            <button onClick={()=>setTab(0)} className={tab == 0?"tab-element tab-element-active":"tab-element"}>
                            <span className="material-symbols-outlined" style={{
                                color:tab == 0?"#0b57d0":"rgb(61,61,61)"
                            }}>inbox</span>
                            <span >Primary</span>
                            </button>
                        </div>
                        <div className='ceil'>
                            <button onClick={()=>setTab(1)} className={tab == 1?"tab-element tab-element-active":"tab-element"}>
                            <span className="material-symbols-outlined" style={{
                                color:tab == 1?"#0b57d0":"rgb(61,61,61)"
                            }}>confirmation_number</span>
                            <span >Promotions</span>
                            </button>
                        </div>
                        <div className='ceil'>
                            <button onClick={()=>setTab(2)} className={tab == 2?"tab-element tab-element-active":"tab-element"}>
                            <span className="material-symbols-outlined" style={{
                                color:tab == 2?"#0b57d0":"rgb(61,61,61)"
                            }}>group</span>
                            <span >Social</span>
                            </button>
                        </div>
 
                       

                    </div>
                    }
                    
                    {
                        index == 0 &&
                        <TabContentInbox 
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


                        />
                    }
                   
                </div>
            </div>
        </div>


    </div>
}
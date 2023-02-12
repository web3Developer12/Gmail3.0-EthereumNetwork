import './Home.css'
import hamburger from '../assets/img/hamburger.svg'
import logo from '../assets/img/gmail.png';
import search from '../assets/img/search.svg';
import filter from '../assets/img/filter.svg';
import key from '../assets/img/key.svg';
import info from '../assets/img/info.svg';
import edit from '../assets/img/edit.svg';
import inbox from '../assets/img/inbox.svg';
import star from '../assets/img/star.svg';
import sent from '../assets/img/send.svg';
import drafts from '../assets/img/draft.svg';
import spam from '../assets/img/report.svg';
import unread from '../assets/img/unread.svg';
import read from '../assets/img/read.svg';
import trash from '../assets/img/trash.svg';
import allMail from '../assets/img/trash.svg';
import Blockies from 'react-blockies';
import { useEffect, useState } from 'react';
import Editor from './Editor';
import { ComposeMail } from '../utils/contract';
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
                    className={`mail-data ${props.selectionId.includes(index)?"mail-data-selected":""}`} key={index}
                >
                    <div className='mail-data-start'>
                        <span className="material-symbols-outlined" style={props.onSelect ? {color:"black"}:{}} onClick={()=>{
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
function TabContentStarred(props){
    return <div className='data'>
        {
            [].length == 0 && <div className='no-content mediumRegular'>
                <p>You don't have any starred mails.</p>
                
            </div>
        }
        {
            [].map((e,index)=>{
                return <div className='mail-data' key={index}>
                    <div className='mail-data-start'>
                        <span className="material-symbols-outlined">check_box_outline_blank</span>
                        <span className="material-symbols-outlined">star</span>
                        <p className='boldSans'>{e.subject} </p>
                    </div>
                    <p className='mediumRegular mark'>
                        <span className='boldSans'>{e.markdown.substring(0,23)}</span> - <span className='opp'>{e.markdown.slice(-56)}...</span>
                    </p>
                    <p className='mediumSans hour'>{new Date(e.timeStamp).toLocaleTimeString()}</p>

                    

                </div>
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


    const tabContent = {
        "primary":props.inbox,
        "promotions":[],
        "social":[]
    }

    const tabController = ()=>{
        if(tab == 0){
            return "primary"
        }else if(tab == 1){
            return "promotions"
        }else{
            return "social"
        }
    }
    return <div className='Home'>
        <Editor isOpen={isOpen} setIsOpen={setIsOpen} LoaderRef={props.LoaderRef}/>
        
        <div className='Navbar'>
            <div className='NavMenuTitle'>
                <img src={hamburger} width={28} className='navIcon'/>
                <div>
                    <img src={logo} width={36}/>
                    <p className='mediumRegular'>Gmail</p>
                </div>
            </div>
            <div className='searchbar'>
                <div className='input'>
                    <img src={search} width={26}/>
                    <input type="text" placeholder='Search mail' className='mediumRegular'/>
                    <img src={filter} width={26}/>
                </div>
            </div>
            <div className='toolBox'>
                <span class="material-symbols-outlined">info</span>
                <span class="material-symbols-outlined">key</span>

                <Blockies
                    seed={props.user.trim().length == 0?props.user:"0xfC4F626a3dfa723E4b501FeE03D1eC5f9f55dcE4"}
                    size={10} 
                    scale={3} 
                    color="rgba(255,255,255,.2)" 
                    bgColor="#0b57d0" 
                    spotColor="rgba(255,255,255,.2)"
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
                        <span class="material-symbols-outlined">inbox</span>
                        <span className='mediumRegular'>Inbox</span>
                    </li>
                    <li onClick={()=>setIndex(1)} className={index == 1 ?"active":""}>
                        <span class="material-symbols-outlined">star</span>

                        <span className='mediumRegular'>Starred</span>
                    </li>
                    <li onClick={()=>setIndex(2)} className={index == 2 ?"active":""}>
                        <span class="material-symbols-outlined">send</span>

                        <span className='mediumRegular'>Sent</span>
                    </li>
                    <li onClick={()=>setIndex(3)} className={index == 3 ?"active":""}>
                        <span class="material-symbols-outlined">draft</span>

                        <span className='mediumRegular'>Draft</span>
                    </li>
                    <li onClick={()=>setIndex(4)} className={index == 4 ?"active":""}>
                    <span class="material-symbols-outlined">report</span>
                    
                        <span className='mediumRegular'>Spam</span>
                    </li>
                    <li onClick={()=>setIndex(5)} className={index == 5 ?"active":""}>
                    <span class="material-symbols-outlined">mail</span>

                        <span className='mediumRegular'>All Mail</span>
                    </li>
                    <li onClick={()=>setIndex(6)} className={index == 6 ?"active":""}>
                        <span class="material-symbols-outlined">
                        mark_email_unread
                        </span>

                        <span className='mediumRegular'>Unread</span>
                    </li>
                    <li onClick={()=>setIndex(6)} className={index == 7 ?"active":""}>
                        <span class="material-symbols-outlined">
                        mark_email_read
                        </span>
                        <span className='mediumRegular'>Read</span>
                    </li>
                     <li onClick={()=>setIndex(6)} className={index == 8 ?"active":""}>
                        <span class="material-symbols-outlined">
                        mark_email_read
                        </span>
                        <span className='mediumRegular'>Unread</span>
                    </li>
                    <li  onClick={()=>setIndex(7)} className={index == 9 ?"active":""}>
                    <span class="material-symbols-outlined">
                        delete
                        </span>
                        <span className='mediumRegular'>Trash</span>
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
                                        setSelectionId([...selectionId,0])
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
                                        <span className="material-symbols-outlined">archive</span>
                                        <span onClick={()=>{
                                            setBulkFlag('star-flag')
                                            setStarredId([...selectionId])
                                        }}className="material-symbols-outlined">star</span>
                                        <span className="material-symbols-outlined">report</span>
                                        <span className="material-symbols-outlined">mark_email_read</span>
                                        <span className="material-symbols-outlined">mark_email_unread</span>
                                        <span className="material-symbols-outlined">delete</span>
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
                                onSelect &&  <button onClick={()=>{
                                    if(bulkFlag != undefined){
                                        alert(`${bulkFlag} for ${selectionId} smart contract`)
                                    }
                                }} className={`bulk mediumSans ${selectionId.length == 0?'bulk-inactive':''}`}>
                                <span className="material-symbols-outlined">precision_manufacturing</span>
                                Bulk
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
                    <div className='tabs'>
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
                   
                </div>
            </div>
        </div>


    </div>
}
import './Editor.css'
import { motion } from 'framer-motion'
import { ComposeMail, forwardMail, replyMail } from '../utils/contract'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Blockies from 'react-blockies';
import { ethers } from 'ethers'
import EmojiPicker from 'emoji-picker-react';
import ReactMarkdown from 'react-markdown'

export default function Editor(props){
    const variants = {
        open  :{ y: 0  ,opacity:1 },
        closed:{ y:410  ,opacity:1 }
    }
    const [to,setTo] = useState('')
    const [subject,setSubject] = useState('')
    const [body,setBody]       = useState('')
    const [addrValid,setAddrValid] = useState(false)
    const [see,setSee] = useState(false)

    useEffect(()=>{
        if(props.reply){
            props.setIsOpen(true)
            if(props.selected != null){
                setTo(props.selected.to)
                setSubject(`Reply to ${
                    props.selected.to.substring(0,4)+"...."+props.selected.to.slice(-4)
                }`)
            }
        }
    },[props.reply])

    useEffect(()=>{
        if(props.forward){
            props.setIsOpen(true)
            if(props.selected != null){
                setTo()
                setSubject(`Forward [${props.dataReply.length}:thread]`)
                setBody(`[Mail:Ethereum] ${props.selected.subject} ${new Date(props.selected.timeStamp).toLocaleTimeString()} ...`)
            }
        }
    },[props.forward])

    useEffect(()=>{
        if(ethers.utils.isAddress(to)){
            setAddrValid(true)
        }else{
            setAddrValid(false)
        }
    },[to])
 
    return <motion.div 
    
        className="Editor"
        initial    =  {{ y:100,opacity:0}}
        animate    =  {props.isOpen == true?variants.open:variants.closed}
        transition =  {!props.isOpen &&{ type: 'spring',bounce:0.1,duration: 0.1,stiffness: 100,velocity: 2}}
        >
        <div className='header-edit'>
            <p className='mediumRegular'>New Message</p>
            {
                props.isOpen && <motion.span 
                    initial    =  {{ opacity:0}}
                    animate    =  {{ opacity:1}}
                    onClick={()=>{
                        if(props.reply == false){
                            props.setIsOpen(false)
                        }else{
                            props.setReply(false)
                            props.setIsOpen(false)
                        }
                        if(props.forward){
                            props.setForward(false)
                        }
                        setTo('')
                        setSubject('')
                        setBody('')

                    }} className="material-symbols-outlined closeBtn"
                >close</motion.span>
            }
            
        </div>

        <div className='destination'>
            
            <div className='inputEditor mediumSans'>
                <p className='mediumRegular'>To</p>
                <input readOnly={props.reply ?true:false} value={to || ""} onChange={(e)=>{
                    setTo(e.target.value);
                    if(ethers.utils.isAddress(e.target.value)){
                        setAddrValid(true)
                    }else{
                        setAddrValid(false)
                    }
                }} className={` ${addrValid&& "valid-addr"} input1  mediumSans`} type="text" placeholder="0x0000000000000000000000"/>

                {
                    addrValid && <
                        motion.div
                        initial    =  {{ x:20,opacity:1}}
                        animate    =  {{ x: 0  ,opacity:1 }}
                    >
                        <Blockies
                            seed={to}
                            size={10} 
                            scale={3} 
                            color="rgba(255,255,255,.3)" 
                            bgColor="#0b57d0" 
                            spotColor="rgba(255,255,255,.3)"
                        />
                </motion.div>
                }
                
            </div>

            <div className='inputEditor '>
                <input readOnly={props.reply||props.forward?true:false} value={subject} onChange={(e)=>setSubject(e.target.value)} className='input2' type="text" placeholder="Subject"/>
            </div>
        </div>
        <div className='markdownEditor'>
            { see == false?
            <textarea readOnly={props.forward?true:false} className='mediumRegular' value={body} onChange={(e)=>{setBody(e.target.value)}}/>:
            <div className='view'><ReactMarkdown >{body}</ReactMarkdown></div>
            }
            <div className='toolBoxEditor'>
                <div className='toolBoxS'>
                    <motion.button 
                        onClick={async()=>{

                            if(props.reply == false && props.forward == false){

                                const isAddress = ethers.utils.isAddress(to);
                                if(subject.trim().length >= 1 && body.trim().length >= 1 && isAddress){
                                    props.LoaderRef.current.continuousStart()
                                    setSubject('');
                                    setBody('');
                                    const toastId = toast.loading('Sending...');
                                    const action= await ComposeMail(to,subject,body)
                                    props.LoaderRef.current.complete()
                                    props.setIsOpen(false);
                                    await props.refreshInbox()
                                    toast.dismiss(toastId);

                                }else if(subject.trim().length == 0){
                                    toast("The subject cannot be empty !")
                                }else if(body.trim().length == 0){
                                    toast("The body cannot be empty !")
                                }else if(isAddress == false){
                                    toast("Address invalid !")

                                }
                            }else if(props.reply == true && props.forward == false){
                                props.LoaderRef.current.continuousStart()
                                await replyMail(props.selected.index,to,subject,body)
                                props.LoaderRef.current.complete()
                                setTo('');
                                setSubject('')
                                setBody('')
                                props.setReply(false)
                                props.setIsOpen(false)
                                props.refreshReply()
                            }else if(props.reply == false && props.forward == true){
                               
                                if(to != undefined){
                                   await forwardMail(
                                        to,
                                        props.selected.subject,
                                        props.selected.markdown,
                                        props.selected.index
                                    )
                                    props.setForward(false)
                                    
                                }
                            }


                        }}
                        className='mediumRegular'>
                        <span>Send</span>
                        <span className="material-symbols-outlined">send</span>
                    </motion.button>
                    
                    <span onClick={()=>setSee(!see)} style={{color:see && '#0b57d0'}} className="material-symbols-outlined tool-icn">visibility</span>
                    <span className="material-symbols-outlined tool-icn">home_storage</span>

                </div>
                <span className="material-symbols-outlined tool-icn">delete</span>
            </div>
        </div>



    </motion.div>
}
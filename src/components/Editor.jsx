import './Editor.css'
import { motion } from 'framer-motion'
import { ComposeMail } from '../utils/contract'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export default function Editor(props){
    const variants = {
        open  :{ y: 0  ,opacity:1 },
        closed:{ y:410  ,opacity:1 }
    }
    const [to,setTo] = useState('')
    const [subject,setSubject] = useState('')
    const [body,setBody]       = useState('')
 
    return <motion.div 
    
        className="Editor"
        initial    =  {{ y:310,opacity:0}}
        animate    =  {props.isOpen == true?variants.open:variants.closed}
        transition =  {!props.isOpen &&{ type: 'spring',bounce:0.1,duration: 0.1,stiffness: 100,velocity: 2}}
        >

        <div className='header-edit'>
            <p className='mediumRegular'>New Message</p>
            {
                props.isOpen && <motion.span 
                    initial    =  {{ opacity:0}}
                    animate    =  {{ opacity:1}}
                    onClick={()=>{props.setIsOpen(false)}} className="material-symbols-outlined closeBtn"
                >close</motion.span>
            }
            
        </div>

        <div className='destination'>
            <div className='inputEditor mediumRegular'>
                <p className='mediumRegular'>To</p>
                <input value={to} onChange={(e)=>setTo(e.target.value)} className='input1' type="text" placeholder="0x0000000000000000000000000000000000000000"/>
            </div>
            <div className='inputEditor'>
                <input value={subject} onChange={(e)=>setSubject(e.target.value)} className='input2' type="text" placeholder="Subject"/>
            </div>
        </div>
        <div className='markdownEditor'>
            <textarea className='mediumRegular' value={body} onChange={(e)=>{setBody(e.target.value)}}/>
            <div className='toolBoxEditor'>
                <div className='toolBoxS'>
                    <motion.button 
                        onClick={async()=>{
                            if(subject.trim().length >= 1 && body.trim().length >= 1){
                                props.LoaderRef.current.continuousStart()
                                setSubject('');
                                setBody('');
                                props.setIsOpen(false);
                                await ComposeMail(to,subject,body)
                                props.LoaderRef.current.complete()
                                await props.refreshInbox()
                                toast("Message sent")


                            }else if(subject.trim().length == 0){
                                toast("The subject cannot be empty !")
                            }else if(body.trim().length == 0){
                                toast("The body cannot be empty !")
                            }


                        }}
                        className='mediumRegular'>
                        <span>Send</span>
                        <span className="material-symbols-outlined">send</span>
                    </motion.button>
                    
                    <span className="material-symbols-outlined tool-icn">mood</span>
                    <span className="material-symbols-outlined tool-icn">attach_file</span>
                </div>
                <span className="material-symbols-outlined tool-icn">delete</span>
            </div>
        </div>



    </motion.div>
}
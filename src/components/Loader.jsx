import './Loader.css'
import animated  from '../assets/img/gmail.png'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getAuthorizedAccounts,connectAuthorizedAccounts } from '../utils/wallet'
import toast from 'react-hot-toast'

export default function Loader(props){

    const navigate = useNavigate()

    useEffect(()=>{
       
        getAuthorizedAccounts(props.setUser)
        if(props.user != ''){
            toast('Connected successfully')
        }
        
    },[])
    return <motion.div className='Loader'>

        <motion.div
            initial    =  {{ y:-100,opacity:0}}
            animate    =  {{ y: 0  ,opacity:1 }}
            exit       =  {{ y:-100,opacity:0}}
            transition =  {{ type: 'spring',bounce:3,duration: 0.1,stiffness: 100,velocity: 6}}
        >
            <motion.img src={animated} width={220}/>
        </motion.div>

        <motion.div 
            initial    =  {{ opacity:0}}
            animate    =  {{ opacity:1 }}
            exit       =  {{ opacity:0}}
            transition =  {{ delay: .8,type: 'spring',bounce:1,duration: 0.3,stiffness: 100,velocity: 6}}
            className='mediumSans logo-txt'>
            <motion.div
        
                className='darken'>
                Google
            </motion.div> 
            <motion.div
                transition =  {{ delay:.8,type: 'spring',bounce:1,duration: 0.3,stiffness: 100,velocity: 6}}
            > Nodes
            </motion.div>
        </motion.div>
        <motion.p 
            initial    =  {{ opacity:0}}
            animate    =  {{ opacity:1 }}
            exit       =  {{ opacity:0}}
            transition =  {{ delay: .9}}
            className='sub'
        >Consider using a decentralized email service for increased privacy and security.</motion.p>
        <motion.button 
        initial    =  {{ opacity:0}}
        animate    =  {{ opacity:1 }}
        exit       =  {{ opacity:0}}
        transition =  {{ delay: 1}}
        onClick    =  {()=>{
            if(props.user.trim().length == 0){
                connectAuthorizedAccounts(props.setUser)
            }else{
                props.refLoader.current.continuousStart()
                setTimeout(()=>{
                    props.refLoader.current.complete()
                    navigate('/mail')
                },4000)
            }
        }}
        className='connect mediumSans'>{props.user != ''?props.user.substring(0,4)+"..."+props.user.slice(-4):"Connect Wallet"}</motion.button>

    </motion.div>
}
import './Loader.css'
import animated  from '../assets/img/gmail.png'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { getAuthorizedAccounts,connectAuthorizedAccounts } from '../utils/wallet'
import { ethers } from 'ethers'

export default function Loader(props){

    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(()=>{
            getAuthorizedAccounts(props.setUser)
            if(props.user.trim().length == 0){
                connectAuthorizedAccounts(props.setUser)
            }else{
                navigate('/mail')
            }
                
        },4000)
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

        <motion.div className="loader-bar">
                <motion.div
                    className  = "loader-value"
                    initial    = {{ width:'0%'    ,opacity:1  }}
                    animate    = {{
                        width: '100%',
                        opacity:1,

                    }}
                    transition = {{ delay: .5     ,duration:3 }}
                    exit       = {{ opacity:0 }}
                />
        </motion.div>

        <motion.div className='mediumSans logo-txt'>
            <motion.div
                initial    =  {{ y:-100,opacity:0}}
                animate    =  {{ y: 0  ,opacity:1 }}
                exit       =  {{ y:-100,opacity:0}}
                transition =  {{ delay: .8,type: 'spring',bounce:1,duration: 0.3,stiffness: 100,velocity: 6}}
                className='darken'>
                Google
            </motion.div> 
            <motion.div
                initial    =  {{ y:100,opacity:0}}
                animate    =  {{ y: 0  ,opacity:1 }}
                exit       =  {{ y:-100,opacity:0}}
                transition =  {{ delay:.8,type: 'spring',bounce:1,duration: 0.3,stiffness: 100,velocity: 6}}
            > Workspace
            </motion.div>
        </motion.div>

    </motion.div>
}
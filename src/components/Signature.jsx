import './Signature.css'
import {motion} from "framer-motion"

export default function Signature(){
    return <div className='scanner'>
        <motion.div 
            className="fingarprint"
            initial    =  {{ y:-100,opacity:0}}
            animate    =  {{ y:0,opacity:1}}
            transition =  {{ type: 'spring',delay:0.2,bounce:0.1,duration: 0.1,stiffness: 300,velocity: 2}}
        >

        </motion.div>
        <motion.p className='mediumSans'>Confirming the transaction ...</motion.p>
    </div>
}
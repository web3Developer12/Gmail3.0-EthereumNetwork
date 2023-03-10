import { ethers } from "ethers";
import toast from "react-hot-toast";
import ABI from "../artifacts/contracts/Gmail.sol/Gmail.json"

//const addr = "0xcf68237118486F0E7562A83Ba7b4107CF6A8aF00";
const   addr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";


export const fetchInboxSender = async()=>{

    try{        
        const {ethereum}     = window;
        if(ethereum){

            const provider   = new ethers.providers.Web3Provider(ethereum);
            const signer     = provider.getSigner();

            const contract   = new ethers.Contract(addr,ABI.abi,signer);
            const inbox      = await contract.inbox();

            let cleaned =[]
            for(let data of inbox){
                const mailUser={
                    from:data._from,
                    to:data._to,
                    subject:data._subject,
                    markdown:data._markdown,
                    timeStamp:parseInt(data._timeStamp),

                    index    : parseInt(data._index),
                    starred  : data._starred,
                    read     : data._read,

                }

                cleaned.push(mailUser)
            }
            cleaned.reverse()
            return cleaned
            
        }
    }catch(err){
        console.log(err);  
    }
}

export const fetchTrashSender= async()=>{

    try{        
        const {ethereum}     = window;
        if(ethereum){

            const provider   = new ethers.providers.Web3Provider(ethereum);
            const signer     = provider.getSigner();

            const contract   = new ethers.Contract(addr,ABI.abi,signer);
            const res        = await contract.trash();
            let cleaned =[]
            console.log(res)

            for(let data of res){
                const mailUser={
                    from:data._from,
                    to:data._to,
                    subject:data._subject,
                    markdown:data._markdown,
                    timeStamp:parseInt(data._timeStamp._hex,16),

                    index    : parseInt(data._index),
                    starred  : data._starred,
                    read     : data._read,
                    spam     : data._spam,
                    trash    : data._trash
                }
                if(mailUser.trash ){
                    cleaned.push(mailUser)
                }
            }
            cleaned.reverse()
            return cleaned
            
        }
    }catch(err){
        console.log(err);  
    }
}

export const fetchSentSender= async()=>{

    try{        
        const {ethereum}     = window;
        if(ethereum){

            const provider   = new ethers.providers.Web3Provider(ethereum);
            const signer     = provider.getSigner();

            const contract   = new ethers.Contract(addr,ABI.abi,signer);
            const res        = await contract.sent();
            let cleaned =[]
            for(let data of res){
                const mailUser={
                    from:data._from,
                    to:data._to,
                    subject:data._subject,
                    markdown:data._markdown,
                    timeStamp:parseInt(data._timeStamp._hex,16),
                    
                    index    : parseInt(data._index),
                    starred  : data._starred,
                    read     : data._read,
                    spam     : data._spam
                    

                }
                cleaned.push(mailUser)
            }
            cleaned.reverse()
            return cleaned
            
        }
    }catch(err){
        console.log(err);  
    }
}

export const fetchUnreadSender= async()=>{
    

    try{        
        const {ethereum}     = window;
        if(ethereum){

            const provider   = new ethers.providers.Web3Provider(ethereum);
            const signer     = provider.getSigner();

            const contract   = new ethers.Contract(addr,ABI.abi,signer);
            const res        = await contract.inbox();
            let cleaned =[]
            for(let data of res){
                const mailUser={
                    from:data._from,
                    to:data._to,
                    subject:data._subject,
                    markdown:data._markdown,
                    timeStamp:parseInt(data._timeStamp._hex,16),
                    
                    index    : parseInt(data._index),
                    starred  : data._starred,
                    read     : data._read,
                    spam     : data._spam,
                    inbox    : data._inbox,
                    tracked  : data._tracked,
                    trash    : data._trash,
                    sent     : data._sent
                }
                console.log(mailUser)

                if( mailUser.read == false ){  
                    cleaned.push(mailUser)
                }
            }
            cleaned.reverse()
            return cleaned
            
        }
    }catch(err){
        console.log(err);  
    }
}
export const fetchReadSender= async()=>{

    try{        
        const {ethereum}     = window;
        if(ethereum){

            const provider   = new ethers.providers.Web3Provider(ethereum);
            const signer     = provider.getSigner();

            const contract   = new ethers.Contract(addr,ABI.abi,signer);
            const res        = await contract.inbox();
            let cleaned      = []
            
            for(let data of res){
                const mailUser={
                    from:data._from,
                    to:data._to,
                    subject:data._subject,
                    markdown:data._markdown,
                    timeStamp:parseInt(data._timeStamp._hex,16),
                    
                    index    : parseInt(data._index),
                    starred  : data._starred,
                    spam     : data._spam,
                    read     : data._read,
                    tracker  : data._tracked
                }
                if(mailUser.read == true && !mailUser.tracker){
                    cleaned.push(mailUser)
                }
            }
            cleaned.reverse()
            return cleaned
            
        }
    }catch(err){
        console.log(err);  
    }
}
export const fetchSpamSender= async()=>{

    try{        
        const {ethereum}     = window;
        if(ethereum){

            const provider   = new ethers.providers.Web3Provider(ethereum);
            const signer     = provider.getSigner();

            const contract   = new ethers.Contract(addr,ABI.abi,signer);
            const res        = await contract.spam();
            let cleaned =[]
            for(let data of res){
                const mailUser={
                    from:data._from,
                    to:data._to,
                    subject:data._subject,
                    markdown:data._markdown,
                    timeStamp:parseInt(data._timeStamp),

                    index    : parseInt(data._index),
                    starred  : data._starred,
                    read     : data._read,
                    spam     : data._spam,


                }
                cleaned.push(mailUser)
                
            }
            cleaned.reverse()
            return cleaned
            
        }
    }catch(err){
        console.log(err);  
    }
}

export const fetchArchiveSender= async()=>{

    try{        
        const {ethereum}     = window;
        if(ethereum){

            const provider   = new ethers.providers.Web3Provider(ethereum);
            const signer     = provider.getSigner();

            const contract   = new ethers.Contract(addr,ABI.abi,signer);
            const res        = await contract.archive();
            let cleaned =[]
            for(let data of res){
                const mailUser={
                    from:data._from,
                    to:data._to,
                    subject:data._subject,
                    markdown:data._markdown,
                    timeStamp:parseInt(data._timeStamp),
                    
                    index    : parseInt(data._index),
                    starred  : data._starred,
                    read     : data._read,
                    spam     : data._spam
                }
                cleaned.push(mailUser)
                
            }
            cleaned.reverse()
            return cleaned
            
        }
    }catch(err){
        console.log(err);  
    }
}
export const fetchStarredSender= async()=>{

    try{        
        const {ethereum}     = window;
        if(ethereum){

            const provider   = new ethers.providers.Web3Provider(ethereum);
            const signer     = provider.getSigner();

            const contract   = new ethers.Contract(addr,ABI.abi,signer);
            const res        = await contract.star();
            let cleaned =[]
            for(let data of res){
                const mailUser={
                    from:data._from,
                    to:data._to,
                    subject:data._subject,
                    markdown:data._markdown,
                    timeStamp:parseInt(data._timeStamp),

                    index    : parseInt(data._index),
                    starred  : data._starred,
                    read     : data._read,
                    spam     : data._spam,
                    inbox    : data._inbox,
                    tracked  : data._tracked,
                    trash    : data._trash,
                    sent     : data._sent
                }
                if(!mailUser.trash){
                    cleaned.push(mailUser)
                }
                
            }
            cleaned.reverse()
            return cleaned
            
        }
    }catch(err){
        console.log(err);  
    }
}
export const fetchReplySender= async(index)=>{

    try{        
        const {ethereum}     = window;
        if(ethereum){

            const provider   = new ethers.providers.Web3Provider(ethereum);
            const signer     = provider.getSigner();

            const contract   = new ethers.Contract(addr,ABI.abi,signer);
            const res        = await contract.getReply(index);
            let cleaned =[]
            for(let data of res){
                const mailUser={

                    from     :data._from,
                    to       :data._to,
                    subject  :data._subject,
                    markdown :data._markdown,
                    timeStamp:parseInt(data._timeStamp),
                    index    : data._index,
                    starred  : data._starred,
                    read     : data._read,
                    spam     : data._spam,
                    inbox    : data._inbox,
                    tracked  : data._unTracked,
                    trash    : data._trash,
                    sent     : data._sent
                }
                if(!mailUser.trash){
                    cleaned.push(mailUser)
                }
                
            }
            return cleaned
            
        }
    }catch(err){
        console.log(err);  
    }
}


const body = `
I'm thinking about the fact I've ne'er been in United States.So I decided to travel with you because It can be the best experience of my life dude What do you think about it


My twitter link is page is https://twitter.com
`
export const ComposeMail = async(to,subject,body)=>{

    try{        
        const {ethereum}     = window;
        if(ethereum){

            const provider   = new ethers.providers.Web3Provider(ethereum);
            const signer     = provider.getSigner();

            const contract   = new ethers.Contract(addr,ABI.abi,signer);
            const mail       = await contract.compose(
                to,
                subject,
                body
            );
            await mail.wait()
            toast("Message sent");

        }
    }catch(err){
        console.log(err);  
    }
}
export const replyMail = async(index,to,subject,body)=>{

    try{        
        const {ethereum}     = window;
        if(ethereum){

            const provider   = new ethers.providers.Web3Provider(ethereum);
            const signer     = provider.getSigner();

            const contract   = new ethers.Contract(addr,ABI.abi,signer);
            const mail       = await contract.reply(index,to,subject,body);
            await mail.wait()
            toast("Reply sent");

        }
    }catch(err){
        console.log(err);  
    }
}
export const forwardMail = async(to,subject,body,index)=>{

    try{        
        const {ethereum}     = window;
        if(ethereum){

            const provider   = new ethers.providers.Web3Provider(ethereum);
            const signer     = provider.getSigner();

            const contract   = new ethers.Contract(addr,ABI.abi,signer);
            const mail       = await contract.forward(to,subject.toString(),body.toString(),index);
            await mail.wait()
            toast("Forward sent");

        }
    }catch(err){
        console.log(err);  
    }
}

export const BulkAction = async(to,indexes,refLoader,setSelectionId)=>{

    try{        
        const {ethereum}     = window;
        if(ethereum){

            const provider   = new ethers.providers.Web3Provider(ethereum);
            const signer     = provider.getSigner();

            const contract   = new ethers.Contract(addr,ABI.abi,signer);
            refLoader.current.continuousStart()
            const toastId=toast.loading("Confirming transaction");
            const move = await contract.move(to,indexes,{gasLimit:300000})
            await move.wait()
            toast.dismiss(toastId)
            refLoader.current.complete()
            setSelectionId([])

        }
    }catch(err){
        toast.dismiss()
        setSelectionId([])
        refLoader.current.complete()
        console.log(err);  
    }
}
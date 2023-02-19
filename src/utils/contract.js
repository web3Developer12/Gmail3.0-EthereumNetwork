import { ethers } from "ethers";
import ABI from "../artifacts/contracts/MailSystem.sol/MailSystem.json"

const addr = "0x3751536b3d6e540c33cC0bC4C28621e15Cb55df8";

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
                console.log(data._starred)
                const mailUser={
                    from:data._from,
                    to:data._to,
                    subject:data._subject,
                    markdown:data._markdown,
                    timeStamp:parseInt(data._timeStamp),
                    index    : parseInt(data._index),
                    starred  : data._starred
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
            for(let data of res){
                const mailUser={
                    from:data._from,
                    to:data._to,
                    subject:data._subject,
                    markdown:data._markdown,
                    timeStamp:parseInt(data._timeStamp._hex,16),
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
                    read     :data._read
                }
                if(mailUser.read == false){
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
            let cleaned =[]
            for(let data of res){
                const mailUser={
                    from:data._from,
                    to:data._to,
                    subject:data._subject,
                    markdown:data._markdown,
                    timeStamp:parseInt(data._timeStamp._hex,16),
                    read     :data._read
                }
                if(mailUser.read == true){
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
                    read     :data._read
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
                    read     :data._read
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

        }
    }catch(err){
        console.log(err);  
    }
}

export const BulkAction = async(origin,to,indexes,signIn,refLoader,selection)=>{

    try{        
        const {ethereum}     = window;
        if(ethereum){

            const provider   = new ethers.providers.Web3Provider(ethereum);
            const signer     = provider.getSigner();

            const contract   = new ethers.Contract(addr,ABI.abi,signer);
            signIn(true)
            refLoader.current.continuousStart()
            console.log(indexes)
            const move = await contract.move(origin,to,indexes)
            await move.wait()
            signIn(false)
            refLoader.current.complete()
            selection([])

        }
    }catch(err){
        signIn(false)
        selection([])
        refLoader.current.complete()

        console.log(err);  
    }
}
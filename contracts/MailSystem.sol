//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


contract MailSystem{

    struct Mail{

        address _from;
        address _to;
        string  _subject;
        string  _markdown;
        uint256 _timeStamp;
        bool    _read;

        bool    _onInbox;
        bool    _onStarred;
        bool    _onTrashed;
    }

    struct Mails{
        Mail[] _inbox;
        Mail[] _starred;
        Mail[] _sent;
        Mail[] _allMail;
        Mail[] _untrusted;
        Mail[] _trash;
    }

    mapping(address => Mails) users;

    function compose(
        address _to,string calldata _subject,string calldata _markdown
    )external{
        Mail memory _newMail = Mail(msg.sender,_to,_subject,_markdown,block.number,false,false,false,false);
        /**Add the email to the sent emails section*/
        users[msg.sender]._sent.push(_newMail);
        /**Deliver the email to the receiver*/
        users[_to]._inbox.push(_newMail);
    }

    function star_mail(Mail calldata _mail) external {
        /**Star the email and add it the star section*/
        users[msg.sender]._starred.push(_mail);
    }

    function delete_mail(string calldata _key,uint256 _startIndex,uint256 _endIndex) external{
        /*Avoid boundaries index limit error*/
        if(keccak256(abi.encodePacked(_key)) == keccak256(abi.encodePacked("INBOX"))){
            for(uint256 i=_startIndex;i<=_endIndex;i++){
            /*Move the email to the trash section*/
                uint256 sizeInbox = users[msg.sender]._inbox.length;
                users[msg.sender]._trash.push(users[msg.sender]._inbox[i]);
                users[msg.sender]._inbox[i] = users[msg.sender]._inbox[sizeInbox -1];
                users[msg.sender]._inbox.pop();
            }
        }else if(keccak256(abi.encodePacked(_key)) == keccak256(abi.encodePacked("SENT"))){
            for(uint256 i=_startIndex;i<=_endIndex;i++){
            /*Move email from sent to trash*/
                uint256 sizeSent = users[msg.sender]._sent.length;
                users[msg.sender]._sent[i] = users[msg.sender]._sent[sizeSent -1];
                users[msg.sender]._sent.pop();
            }
        }else if(keccak256(abi.encodePacked(_key)) == keccak256(abi.encodePacked("UNTRUSTED"))){
            for(uint256 i=_startIndex;i<=_endIndex;i++){
            /*Move email spam from sent to trash*/
                uint256 sizeUntrused = users[msg.sender]._untrusted.length;
                users[msg.sender]._untrusted[i] = users[msg.sender]._untrusted[sizeUntrused -1];
                users[msg.sender]._untrusted.pop();
            }
        }else if(keccak256(abi.encodePacked(_key)) == keccak256(abi.encodePacked("TRASH"))){
            for(uint256 i=_startIndex;i<=_endIndex;i++){
            /*delete email from trash forever*/
                uint256 sizeTrash = users[msg.sender]._trash.length;
                users[msg.sender]._trash[i] = users[msg.sender]._trash[sizeTrash -1];
                users[msg.sender]._trash.pop();
            }
        }
        
    }   
    function inbox() external view returns(Mail[] memory){
        return users[msg.sender]._inbox;
    }
    function trash() external view returns(Mail[] memory){
        return users[msg.sender]._trash;
    }
    function sent() external view returns(Mail[] memory){
        return users[msg.sender]._sent;
    }
   
}

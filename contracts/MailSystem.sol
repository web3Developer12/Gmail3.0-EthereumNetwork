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
        Mail[] _archive;
        Mail[] _read;
        Mail[] _unRead;


    }

    mapping(address => Mails) users;
    mapping(address => uint256) uid;
    mapping(address => bool)   scam;

    function compose(
        address _to,string calldata _subject,string calldata _markdown
    )external{
        Mail memory _newMail = Mail(msg.sender,_to,_subject,_markdown,block.number,false,false,false,false);
        users[msg.sender]._sent.push(_newMail);
        users[_to]._inbox.push(_newMail);
    }

    function move(uint256 origin,uint destination,uint256[] memory _indexes) external{
        require(_indexes.length >= 1,"DATA NOT FOUND");
        for(uint256 i=0;i<_indexes.length;i++){

            uint256 _mailIndex = _indexes[i];
            /*origin destination STAND FOR THE ORIGIN OF THE MOVE =======> MANAGEMENT*/
            if              (origin == 0){
                /*origin destination:0 => INBOX*/
                if     (destination == 1){
                    /*MOVE EMAIL INBOX TO STARRED*/
                    users[msg.sender]._starred.push(users[msg.sender]._inbox[_mailIndex]);
                    users[msg.sender]._inbox[_mailIndex]._onStarred = true;
                }
                else if(destination == 2){
                    /*MOVE EMAIL INBOX TO SPAM*/
                    users[msg.sender]._untrusted.push(users[msg.sender]._inbox[_mailIndex]);
                }
                else if(destination == 3){
                    /*MOVE EMAIL INBOX TO TRASH*/
                    users[msg.sender]._trash.push(users[msg.sender]._inbox[_mailIndex]);
                }
                else if(destination == 4){
                    /*MOVE EMAIL INBOX TO ARCHIVE*/
                    users[msg.sender]._archive.push(users[msg.sender]._inbox[_mailIndex]);
                }
            }
            else if         (origin == 1){
                /*origin destination:1 => ARCHIVE*/
                if     (destination == 1){
                    /*MOVE EMAIL ARCHIVE TO STARRED*/
                    users[msg.sender]._starred.push(users[msg.sender]._archive[_mailIndex]);
                }
                else if(destination == 2){
                    /*MOVE EMAIL ARCHIVE TO SPAM*/
                    users[msg.sender]._untrusted.push(users[msg.sender]._archive[_mailIndex]);
                }
                else if(destination == 3){
                    /*MOVE EMAIL ARCHIVE TO TRASH*/
                    users[msg.sender]._trash.push(users[msg.sender]._archive[_mailIndex]);
                }
                else if(destination == 4){
                    /*MOVE EMAIL ARCHIVE TO INBOX*/
                    users[msg.sender]._inbox.push(users[msg.sender]._archive[_mailIndex]);
                }
            }
            else if(origin == 2){
                /*origin destination:2 => TRASH*/
                if     (destination == 1){
                    /*MOVE EMAIL TRASH TO STARRED*/
                    users[msg.sender]._starred.push(users[msg.sender]._trash[_mailIndex]);
                    users[msg.sender]._trash[_mailIndex]._onStarred = true;

                }
                else if(destination == 2){
                    /*MOVE EMAIL TRASH TO SPAM*/
                    users[msg.sender]._untrusted.push(users[msg.sender]._trash[_mailIndex]);
                }
                else if(destination == 3){
                    /*MOVE EMAIL TRASH TO ARCHIVE*/
                    users[msg.sender]._archive.push(users[msg.sender]._trash[_mailIndex]);
                }
                else if(destination == 4){
                    /*MOVE EMAIL TRASH TO INBOX*/
                    users[msg.sender]._inbox.push(users[msg.sender]._trash[_mailIndex]);
                }
            }
            else if(origin == 3){
                /*origin destination:3 => REPORTED*/
                users[msg.sender]._untrusted.push(users[msg.sender]._inbox[_mailIndex]);
                if     (destination == 1){
                    /*MOVE EMAIL SPAM TO STARRED*/
                    users[msg.sender]._starred.push(users[msg.sender]._untrusted[_mailIndex]);
                    users[msg.sender]._untrusted[_mailIndex]._onStarred = true;

                }
                else if(destination == 2){
                    /*MOVE EMAIL SPAM TO ARCHIVE*/
                    users[msg.sender]._archive.push(users[msg.sender]._untrusted[_mailIndex]);
                }
                else if(destination == 4){
                    /*MOVE EMAIL SPAM TO INBOX*/
                    users[msg.sender]._inbox.push(users[msg.sender]._untrusted[_mailIndex]);
                }
            }
            else if(origin == 4){
                /*origin destination:4 => STARRED*/
                users[msg.sender]._starred.push(users[msg.sender]._inbox[_mailIndex]);
            }
            else if(origin == 5){
                /*origin destination:5 => READ*/
                users[msg.sender]._read.push(users[msg.sender]._inbox[_mailIndex]);
            }
            else if(origin == 6){
                /*origin destination:5 => UNREAD*/
                users[msg.sender]._unRead.push(users[msg.sender]._inbox[_mailIndex]);
            }

            /*destination STAND FOR THE ORIGIN OF THE MAIL TO DELETE =======> MANAGEMENT*/
            if    (origin == 0){
                /*REMOVE MAIL FROM INBOX*/
                uint256 size  = users[msg.sender]._inbox.length;
                users[msg.sender]._inbox[_mailIndex] = users[msg.sender]._inbox[size-1];
                users[msg.sender]._inbox.pop();
            }
            else if(origin == 1){
                /*REMOVE MAIL FROM STARRED*/
                uint256 size  = users[msg.sender]._starred.length;
                users[msg.sender]._starred[_mailIndex] = users[msg.sender]._starred[size-1];
                users[msg.sender]._starred.pop();
            }
            else if(origin == 2){
                /*REMOVE MAIL FROM SENT*/
                uint256 size  = users[msg.sender]._sent.length;
                users[msg.sender]._sent[_mailIndex] = users[msg.sender]._sent[size-1];
                users[msg.sender]._sent.pop();
            } 
            else if(origin == 3){
                /*REMOVE MAIL FROM UNTRUSTED*/
                uint256 size  = users[msg.sender]._untrusted.length;
                users[msg.sender]._untrusted[_mailIndex] = users[msg.sender]._untrusted[size-1];
                users[msg.sender]._untrusted.pop();
            }  
            else if(origin == 4){
                /*REMOVE MAIL FROM TRASH*/
                uint256 size  = users[msg.sender]._trash.length;
                users[msg.sender]._trash[_mailIndex] = users[msg.sender]._trash[size-1];
                users[msg.sender]._trash.pop();
            }  
            else if(origin == 5){
                /*REMOVE MAIL FROM READ*/
                uint256 size  = users[msg.sender]._read.length;
                users[msg.sender]._read[_mailIndex] = users[msg.sender]._read[size-1];
                users[msg.sender]._read.pop();
            }  
            else if(origin == 6){
                /*REMOVE MAIL FROM UNREAD*/
                uint256 size  = users[msg.sender]._unRead.length;
                users[msg.sender]._unRead[_mailIndex] = users[msg.sender]._unRead[size-1];
                users[msg.sender]._unRead.pop();
            }  
        }
        
    }

    function mark(uint256 origin,uint256 to,uint256[] memory indexes) external{
        /*Mark mail as star,read,unread*/
    } 

    function inbox() external view returns(Mail[] memory){
        return users[msg.sender]._inbox;
    }
    function trash() external view returns(Mail[] memory){
        return users[msg.sender]._trash;
    }
    function starred() external view returns(Mail[] memory){
        return users[msg.sender]._starred;
    }
    function spam() external view returns(Mail[] memory){
        return users[msg.sender]._untrusted;
    }
    function sent() external view returns(Mail[] memory){
        return users[msg.sender]._sent;
    }
    function archive() external view returns(Mail[] memory){
        return users[msg.sender]._archive;
    }
   
}
require('dotenv').config()
const ethers      = require("ethers")
const address     = "0xC801527F2b17908Fad61BF26B35a779649D30fdc";

const ABI = {
  "_format": "hh-sol-artifact-1",
  "contractName": "BetRize",
  "sourceName": "contracts/BetRize.sol",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "betAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "state",
          "type": "bytes32"
        }
      ],
      "name": "BetEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_num",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "rewards",
          "type": "uint256"
        }
      ],
      "name": "Verdict",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "token_amount",
          "type": "uint256"
        }
      ],
      "name": "buy",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBets",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "player",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "betAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "number",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "pool",
              "type": "uint256"
            }
          ],
          "internalType": "struct BetRize.Bet[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCurrentPool",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPool",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "token_amount",
          "type": "uint256"
        }
      ],
      "name": "getPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isOnCurrentPool",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isPaused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "betAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "n",
          "type": "uint256"
        }
      ],
      "name": "placeBet",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "play",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ],
  "bytecode": "0x60c060405234801561001057600080fd5b5060016002819055503373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250503373ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff1681525050600360018190555060805160a05161195e6100ab600039600061060f01526000505061195e6000f3fe6080604052600436106100955760003560e01c8063a6afd5fd11610059578063a6afd5fd14610178578063b187bd26146101a3578063d96a094a146101ce578063e7572230146101ea578063ed6f631f146102275761009c565b8063026b1d5f146100a15780631a595f65146100cc5780634afe62b5146100f7578063722713f71461012057806393e84cd91461014b5761009c565b3661009c57005b600080fd5b3480156100ad57600080fd5b506100b6610252565b6040516100c391906110f2565b60405180910390f35b3480156100d857600080fd5b506100e161025c565b6040516100ee91906110f2565b60405180910390f35b34801561010357600080fd5b5061011e6004803603810190610119919061113e565b6102a3565b005b34801561012c57600080fd5b506101356105c1565b60405161014291906110f2565b60405180910390f35b34801561015757600080fd5b50610160610608565b60405161016f939291906111bf565b60405180910390f35b34801561018457600080fd5b5061018d610daa565b60405161019a919061132b565b60405180910390f35b3480156101af57600080fd5b506101b8610e87565b6040516101c59190611368565b60405180910390f35b6101e860048036038101906101e39190611383565b610e9e565b005b3480156101f657600080fd5b50610211600480360381019061020c9190611383565b610f3f565b60405161021e91906110f2565b60405180910390f35b34801561023357600080fd5b5061023c610f67565b6040516102499190611368565b60405180910390f35b6000600254905090565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b60001515600360009054906101000a900460ff161515146102f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f09061140d565b60405180910390fd5b6001546004805490501161056e57600254600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020540361038a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038190611479565b60405180910390fd5b600082116103cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103c4906114e5565b60405180910390fd5b6103d5611094565b600254600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555033816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050828160200181815250508181606001818152505043816040018181525050600254816080018181525050600481908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020155606082015181600301556080820151816004015550503373ffffffffffffffffffffffffffffffffffffffff167f3ecd76fd64c71aedc9e076ca50dd38853584bb4e7d8e95c4709ddc513d30458784604051610560919061152b565b60405180910390a2506105bd565b3373ffffffffffffffffffffffffffffffffffffffff167f3ecd76fd64c71aedc9e076ca50dd38853584bb4e7d8e95c4709ddc513d304587836040516105b49190611578565b60405180910390a25b5050565b6000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b60008060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461069b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610692906115eb565b60405180910390fd5b600154600480549050146106e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106db90611657565b60405180910390fd5b6106ec611094565b6001600360006101000a81548160ff02191690831515021790555060006103206103e8610717610fc2565b61072191906116d5565b61072b9190611706565b90506000600460008154811061074457610743611748565b5b90600052602060002090600502016003015490506000600190505b600480549050811015610ab657826004828154811061078157610780611748565b5b90600052602060002090600502016003015411156109205782826107a59190611777565b83600483815481106107ba576107b9611748565b5b9060005260206000209060050201600301546107d69190611777565b101561091b57600481815481106107f0576107ef611748565b5b90600052602060002090600502016003015491506004818154811061081857610817611748565b5b906000526020600020906005020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506004818154811061089557610894611748565b5b906000526020600020906005020160010154846020018181525050600481815481106108c4576108c3611748565b5b906000526020600020906005020160030154846060018181525050600481815481106108f3576108f2611748565b5b9060005260206000209060050201600201548460400181815250506002548460800181815250505b610aa3565b818361092c9190611777565b600482815481106109405761093f611748565b5b9060005260206000209060050201600301548461095d9190611777565b1015610aa2576004818154811061097757610976611748565b5b90600052602060002090600502016003015491506004818154811061099f5761099e611748565b5b906000526020600020906005020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505060048181548110610a1c57610a1b611748565b5b90600052602060002090600502016001015484602001818152505060048181548110610a4b57610a4a611748565b5b90600052602060002090600502016003015484606001818152505060048181548110610a7a57610a79611748565b5b9060005260206000209060050201600201548460400181815250506002548460800181815250505b5b8080610aae906117ab565b91505061075f565b50826000015173ffffffffffffffffffffffffffffffffffffffff167f3978215fedaa10ebce7a36be47466edc83e619eeb327b062317f0f18f79246a9846060015160028660200151610b099190611706565b604051610b179291906117f3565b60405180910390a26000600190505b600480549050811015610cf557836000015173ffffffffffffffffffffffffffffffffffffffff1660048281548110610b6257610b61611748565b5b906000526020600020906005020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610c7657600060048281548110610bc557610bc4611748565b5b906000526020600020906005020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060048281548110610c0d57610c0c611748565b5b906000526020600020906005020160010154600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610c6d9190611777565b92505081905550505b60048181548110610c8a57610c89611748565b5b9060005260206000209060050201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905560028201600090556003820160009055600482016000905550508080610ced906117ab565b915050610b26565b5060028360200151610d079190611706565b60056000856000015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610d59919061181c565b925050819055506000600360006101000a81548160ff021916908315150217905550600160026000828254610d8e919061181c565b9250508190555081818460000151955095509550505050909192565b60606004805480602002602001604051908101604052809291908181526020016000905b82821015610e7e57838290600052602060002090600502016040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820154815260200160048201548152505081526020019060010190610dce565b50505050905090565b6000600360019054906101000a900460ff16905090565b60003411610ee1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ed89061189c565b60405180910390fd5b6000610eec82610f3f565b905080341015610f31576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f2890611908565b60405180910390fd5b610f3a82611033565b505050565b6000600166038d7ea4c6800083610f569190611706565b610f6091906116d5565b9050919050565b6000600254600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414610fba5760009050610fbf565b600190505b90565b60008060005b60048054905081101561101b5760048181548110610fe957610fe8611748565b5b90600052602060002090600502016003015482611006919061181c565b91508080611013906117ab565b915050610fc8565b506004805490508161102d91906116d5565b91505090565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611084919061181c565b9250508190555060019050919050565b6040518060a00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081526020016000815260200160008152602001600081525090565b6000819050919050565b6110ec816110d9565b82525050565b600060208201905061110760008301846110e3565b92915050565b600080fd5b61111b816110d9565b811461112657600080fd5b50565b60008135905061113881611112565b92915050565b600080604083850312156111555761115461110d565b5b600061116385828601611129565b925050602061117485828601611129565b9150509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006111a98261117e565b9050919050565b6111b98161119e565b82525050565b60006060820190506111d460008301866110e3565b6111e160208301856110e3565b6111ee60408301846111b0565b949350505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61122b8161119e565b82525050565b61123a816110d9565b82525050565b60a0820160008201516112566000850182611222565b5060208201516112696020850182611231565b50604082015161127c6040850182611231565b50606082015161128f6060850182611231565b5060808201516112a26080850182611231565b50505050565b60006112b48383611240565b60a08301905092915050565b6000602082019050919050565b60006112d8826111f6565b6112e28185611201565b93506112ed83611212565b8060005b8381101561131e57815161130588826112a8565b9750611310836112c0565b9250506001810190506112f1565b5085935050505092915050565b6000602082019050818103600083015261134581846112cd565b905092915050565b60008115159050919050565b6113628161134d565b82525050565b600060208201905061137d6000830184611359565b92915050565b6000602082840312156113995761139861110d565b5b60006113a784828501611129565b91505092915050565b600082825260208201905092915050565b7f5741495420464f5220544845204e45585420504f4f4c00000000000000000000600082015250565b60006113f76016836113b0565b9150611402826113c1565b602082019050919050565b60006020820190508181036000830152611426816113ea565b9050919050565b7f43414e4e4f5420504c4143452032204245545300000000000000000000000000600082015250565b60006114636013836113b0565b915061146e8261142d565b602082019050919050565b6000602082019050818103600083015261149281611456565b9050919050565b7f43414e4e4f5420504c414345204d4f5245205448414e20312042455400000000600082015250565b60006114cf601c836113b0565b91506114da82611499565b602082019050919050565b600060208201905081810360008301526114fe816114c2565b9050919050565b7f4245542052454345495645440000000000000000000000000000000000000000815250565b600060408201905061154060008301846110e3565b61154c60208301611505565b92915050565b7f5741495420464f5220544845204e45585420504f4f4c00000000000000000000815250565b600060408201905061158d60008301846110e3565b61159960208301611552565b92915050565b7f43414e4e4f542053544152542054484520564552444943540000000000000000600082015250565b60006115d56018836113b0565b91506115e08261159f565b602082019050919050565b60006020820190508181036000830152611604816115c8565b9050919050565b7f494e53554646494349454e5420504c41594552204f4e2054484520504f4f4c00600082015250565b6000611641601f836113b0565b915061164c8261160b565b602082019050919050565b6000602082019050818103600083015261167081611634565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006116e0826110d9565b91506116eb836110d9565b9250826116fb576116fa611677565b5b828204905092915050565b6000611711826110d9565b915061171c836110d9565b925082820261172a816110d9565b91508282048414831517611741576117406116a6565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000611782826110d9565b915061178d836110d9565b92508282039050818111156117a5576117a46116a6565b5b92915050565b60006117b6826110d9565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036117e8576117e76116a6565b5b600182019050919050565b600060408201905061180860008301856110e3565b61181560208301846110e3565b9392505050565b6000611827826110d9565b9150611832836110d9565b925082820190508082111561184a576118496116a6565b5b92915050565b7f43414e4e4f542050524f4345454420425559494e470000000000000000000000600082015250565b60006118866015836113b0565b915061189182611850565b602082019050919050565b600060208201905081810360008301526118b581611879565b9050919050565b7f43414e4e4f5420425559205448452043555252454e5420414d4f554e54000000600082015250565b60006118f2601d836113b0565b91506118fd826118bc565b602082019050919050565b60006020820190508181036000830152611921816118e5565b905091905056fea264697066735822122036ba25ed7a8aedf7d9121f6676cd4e2f18bbb55a65ea8f0601af1224e4a5d58b64736f6c63430008110033",
  "deployedBytecode": "0x6080604052600436106100955760003560e01c8063a6afd5fd11610059578063a6afd5fd14610178578063b187bd26146101a3578063d96a094a146101ce578063e7572230146101ea578063ed6f631f146102275761009c565b8063026b1d5f146100a15780631a595f65146100cc5780634afe62b5146100f7578063722713f71461012057806393e84cd91461014b5761009c565b3661009c57005b600080fd5b3480156100ad57600080fd5b506100b6610252565b6040516100c391906110f2565b60405180910390f35b3480156100d857600080fd5b506100e161025c565b6040516100ee91906110f2565b60405180910390f35b34801561010357600080fd5b5061011e6004803603810190610119919061113e565b6102a3565b005b34801561012c57600080fd5b506101356105c1565b60405161014291906110f2565b60405180910390f35b34801561015757600080fd5b50610160610608565b60405161016f939291906111bf565b60405180910390f35b34801561018457600080fd5b5061018d610daa565b60405161019a919061132b565b60405180910390f35b3480156101af57600080fd5b506101b8610e87565b6040516101c59190611368565b60405180910390f35b6101e860048036038101906101e39190611383565b610e9e565b005b3480156101f657600080fd5b50610211600480360381019061020c9190611383565b610f3f565b60405161021e91906110f2565b60405180910390f35b34801561023357600080fd5b5061023c610f67565b6040516102499190611368565b60405180910390f35b6000600254905090565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b60001515600360009054906101000a900460ff161515146102f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f09061140d565b60405180910390fd5b6001546004805490501161056e57600254600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020540361038a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038190611479565b60405180910390fd5b600082116103cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103c4906114e5565b60405180910390fd5b6103d5611094565b600254600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555033816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050828160200181815250508181606001818152505043816040018181525050600254816080018181525050600481908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020155606082015181600301556080820151816004015550503373ffffffffffffffffffffffffffffffffffffffff167f3ecd76fd64c71aedc9e076ca50dd38853584bb4e7d8e95c4709ddc513d30458784604051610560919061152b565b60405180910390a2506105bd565b3373ffffffffffffffffffffffffffffffffffffffff167f3ecd76fd64c71aedc9e076ca50dd38853584bb4e7d8e95c4709ddc513d304587836040516105b49190611578565b60405180910390a25b5050565b6000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b60008060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461069b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610692906115eb565b60405180910390fd5b600154600480549050146106e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106db90611657565b60405180910390fd5b6106ec611094565b6001600360006101000a81548160ff02191690831515021790555060006103206103e8610717610fc2565b61072191906116d5565b61072b9190611706565b90506000600460008154811061074457610743611748565b5b90600052602060002090600502016003015490506000600190505b600480549050811015610ab657826004828154811061078157610780611748565b5b90600052602060002090600502016003015411156109205782826107a59190611777565b83600483815481106107ba576107b9611748565b5b9060005260206000209060050201600301546107d69190611777565b101561091b57600481815481106107f0576107ef611748565b5b90600052602060002090600502016003015491506004818154811061081857610817611748565b5b906000526020600020906005020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506004818154811061089557610894611748565b5b906000526020600020906005020160010154846020018181525050600481815481106108c4576108c3611748565b5b906000526020600020906005020160030154846060018181525050600481815481106108f3576108f2611748565b5b9060005260206000209060050201600201548460400181815250506002548460800181815250505b610aa3565b818361092c9190611777565b600482815481106109405761093f611748565b5b9060005260206000209060050201600301548461095d9190611777565b1015610aa2576004818154811061097757610976611748565b5b90600052602060002090600502016003015491506004818154811061099f5761099e611748565b5b906000526020600020906005020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505060048181548110610a1c57610a1b611748565b5b90600052602060002090600502016001015484602001818152505060048181548110610a4b57610a4a611748565b5b90600052602060002090600502016003015484606001818152505060048181548110610a7a57610a79611748565b5b9060005260206000209060050201600201548460400181815250506002548460800181815250505b5b8080610aae906117ab565b91505061075f565b50826000015173ffffffffffffffffffffffffffffffffffffffff167f3978215fedaa10ebce7a36be47466edc83e619eeb327b062317f0f18f79246a9846060015160028660200151610b099190611706565b604051610b179291906117f3565b60405180910390a26000600190505b600480549050811015610cf557836000015173ffffffffffffffffffffffffffffffffffffffff1660048281548110610b6257610b61611748565b5b906000526020600020906005020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610c7657600060048281548110610bc557610bc4611748565b5b906000526020600020906005020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060048281548110610c0d57610c0c611748565b5b906000526020600020906005020160010154600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610c6d9190611777565b92505081905550505b60048181548110610c8a57610c89611748565b5b9060005260206000209060050201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905560028201600090556003820160009055600482016000905550508080610ced906117ab565b915050610b26565b5060028360200151610d079190611706565b60056000856000015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610d59919061181c565b925050819055506000600360006101000a81548160ff021916908315150217905550600160026000828254610d8e919061181c565b9250508190555081818460000151955095509550505050909192565b60606004805480602002602001604051908101604052809291908181526020016000905b82821015610e7e57838290600052602060002090600502016040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820154815260200160048201548152505081526020019060010190610dce565b50505050905090565b6000600360019054906101000a900460ff16905090565b60003411610ee1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ed89061189c565b60405180910390fd5b6000610eec82610f3f565b905080341015610f31576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f2890611908565b60405180910390fd5b610f3a82611033565b505050565b6000600166038d7ea4c6800083610f569190611706565b610f6091906116d5565b9050919050565b6000600254600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414610fba5760009050610fbf565b600190505b90565b60008060005b60048054905081101561101b5760048181548110610fe957610fe8611748565b5b90600052602060002090600502016003015482611006919061181c565b91508080611013906117ab565b915050610fc8565b506004805490508161102d91906116d5565b91505090565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611084919061181c565b9250508190555060019050919050565b6040518060a00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081526020016000815260200160008152602001600081525090565b6000819050919050565b6110ec816110d9565b82525050565b600060208201905061110760008301846110e3565b92915050565b600080fd5b61111b816110d9565b811461112657600080fd5b50565b60008135905061113881611112565b92915050565b600080604083850312156111555761115461110d565b5b600061116385828601611129565b925050602061117485828601611129565b9150509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006111a98261117e565b9050919050565b6111b98161119e565b82525050565b60006060820190506111d460008301866110e3565b6111e160208301856110e3565b6111ee60408301846111b0565b949350505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61122b8161119e565b82525050565b61123a816110d9565b82525050565b60a0820160008201516112566000850182611222565b5060208201516112696020850182611231565b50604082015161127c6040850182611231565b50606082015161128f6060850182611231565b5060808201516112a26080850182611231565b50505050565b60006112b48383611240565b60a08301905092915050565b6000602082019050919050565b60006112d8826111f6565b6112e28185611201565b93506112ed83611212565b8060005b8381101561131e57815161130588826112a8565b9750611310836112c0565b9250506001810190506112f1565b5085935050505092915050565b6000602082019050818103600083015261134581846112cd565b905092915050565b60008115159050919050565b6113628161134d565b82525050565b600060208201905061137d6000830184611359565b92915050565b6000602082840312156113995761139861110d565b5b60006113a784828501611129565b91505092915050565b600082825260208201905092915050565b7f5741495420464f5220544845204e45585420504f4f4c00000000000000000000600082015250565b60006113f76016836113b0565b9150611402826113c1565b602082019050919050565b60006020820190508181036000830152611426816113ea565b9050919050565b7f43414e4e4f5420504c4143452032204245545300000000000000000000000000600082015250565b60006114636013836113b0565b915061146e8261142d565b602082019050919050565b6000602082019050818103600083015261149281611456565b9050919050565b7f43414e4e4f5420504c414345204d4f5245205448414e20312042455400000000600082015250565b60006114cf601c836113b0565b91506114da82611499565b602082019050919050565b600060208201905081810360008301526114fe816114c2565b9050919050565b7f4245542052454345495645440000000000000000000000000000000000000000815250565b600060408201905061154060008301846110e3565b61154c60208301611505565b92915050565b7f5741495420464f5220544845204e45585420504f4f4c00000000000000000000815250565b600060408201905061158d60008301846110e3565b61159960208301611552565b92915050565b7f43414e4e4f542053544152542054484520564552444943540000000000000000600082015250565b60006115d56018836113b0565b91506115e08261159f565b602082019050919050565b60006020820190508181036000830152611604816115c8565b9050919050565b7f494e53554646494349454e5420504c41594552204f4e2054484520504f4f4c00600082015250565b6000611641601f836113b0565b915061164c8261160b565b602082019050919050565b6000602082019050818103600083015261167081611634565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006116e0826110d9565b91506116eb836110d9565b9250826116fb576116fa611677565b5b828204905092915050565b6000611711826110d9565b915061171c836110d9565b925082820261172a816110d9565b91508282048414831517611741576117406116a6565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000611782826110d9565b915061178d836110d9565b92508282039050818111156117a5576117a46116a6565b5b92915050565b60006117b6826110d9565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036117e8576117e76116a6565b5b600182019050919050565b600060408201905061180860008301856110e3565b61181560208301846110e3565b9392505050565b6000611827826110d9565b9150611832836110d9565b925082820190508082111561184a576118496116a6565b5b92915050565b7f43414e4e4f542050524f4345454420425559494e470000000000000000000000600082015250565b60006118866015836113b0565b915061189182611850565b602082019050919050565b600060208201905081810360008301526118b581611879565b9050919050565b7f43414e4e4f5420425559205448452043555252454e5420414d4f554e54000000600082015250565b60006118f2601d836113b0565b91506118fd826118bc565b602082019050919050565b60006020820190508181036000830152611921816118e5565b905091905056fea264697066735822122036ba25ed7a8aedf7d9121f6676cd4e2f18bbb55a65ea8f0601af1224e4a5d58b64736f6c63430008110033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}


let call_num    = 0
const call = async()=>{

    const provdestinationer = await new ethers.provdestinationers.JsonRpcProvdestinationer(
        "https://smart-proportionate-firefly.avalanche-testnet.discover.quiknode.pro/e50e4c28fa84cc37478458351791557262f126f8/ext/bc/C/rpc"
    );

    const wallet   = new ethers.Wallet(process.env.PRIVATE_KEY, provdestinationer);
    const contract = new ethers.Contract(address,ABI.abi, wallet);
    const data     = await contract.getBets();
    console.log(`Have ${data.length} players`)

    if(data.length == 3){
      const d= await contract.play({gasLimit:400000})
      await d.wait()
      console.log('Verdict and next pool')
    }

    /*if(data.length > 0){
        call_num+=1
        console.log(`[*] BOT CALL CONTRACT destination ${call_num}`)
    }*/
}

console.log(`[*] BOT GOUVERNANCE FOR CONTRACT ${address}`)
call()
/*
setInterval(()=>{

},3000)
*/

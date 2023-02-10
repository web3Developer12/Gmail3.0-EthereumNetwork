import './Home.css'
import hamburger from '../assets/img/hamburger.svg'
import logo from '../assets/img/gmail.png';
import search from '../assets/img/search.svg';
import filter from '../assets/img/filter.svg';
import key from '../assets/img/key.svg';
import info from '../assets/img/info.svg';
import Blockies from 'react-blockies';


export default function Home(){
    return <div className='Home'>

        <div className='Navbar'>
            <div className='NavMenuTitle'>
                <img src={hamburger} width={28} className='navIcon'/>
                <div>
                    <img src={logo} width={36}/>
                    <p className='mediumRegular'>Gmail</p>
                </div>
            </div>
            <div className='searchbar'>
                <div className='input'>
                    <img src={search} width={26}/>
                    <input type="text" placeholder='Search mail' className='mediumRegular'/>
                    <img src={filter} width={26}/>
                </div>
            </div>
            <div className='toolBox'>
                <img src={info} width={26}/>
                <img src={key}  width={26}/>
                <Blockies
                    seed="0xfC4F626a3dfa723E4b501FeE03D1eC5f9f55dcE4" 
                    size={10} 
                    scale={3} 
                    color="white" 
                    bgColor="#6c5ce7" 
                    spotColor="#6c5ce7"
                    className="identicon" 
                />

            </div>
        </div>


    </div>
}
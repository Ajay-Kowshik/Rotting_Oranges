import './Navbar.css';
import b_orange from './Images/bad_orange.png'
function Navbar() {
    return (
        <div className='nav-bar'>
            <div className='nav-content'>
                <img src={b_orange} alt='orange'/>
                <p className='title'>Rotting Oranges</p>
            </div>
        </div>
    )
}
export default Navbar;
import { useState,useRef  } from 'react';
import './Form.css';
import { motion ,AnimatePresence} from "framer-motion";
import Modal from './Modal';

function Forming({handler}) {
    const checkRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const close = () => {
        checkRef.current.target.value = '';
        setModalOpen(false);
    };
    const open = () => setModalOpen(true);
    function clickHandler(e) {
        const rows = e.target.value;
        if (rows > 6 || rows < 1) {
            checkRef.current = e;
            open()
        }
    }

    function submitHandler() {
        handler([document.querySelector('.rows').value, document.querySelector('.columns').value]);
    }


    return (
        <div className='form'>
            <div className="inputbox">
                <input type="text" onChange={clickHandler} className='rows' required="required"/>
                <span>Rows</span>
            </div>
            <div className="inputbox">
                <input type="text" onChange={clickHandler} className='columns' required="required"/>
                <span>Columns</span>
            </div>
            <motion.div whileTap={{scale:0.9}} className="inputbox">
                <input className='hover-button' onClick= {submitHandler} type="button" value="Create Grid"/>
            </motion.div>
            <AnimatePresence initial={false} onExitComplete={() => null}>
                {modalOpen && <Modal text={"Rows and Columns must be between 1 and 6"} handleClose={close} />}
            </AnimatePresence>
        </div>
    );
  }
  export default Forming;
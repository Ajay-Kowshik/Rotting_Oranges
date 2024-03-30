import { motion } from "framer-motion";
import './Modal.css'

const Modal = ({handleClose,text}) =>{
    const dropIn = {
        hidden: {
          y: "-100vh",
          opacity: 0,
        },
        visible: {
          y: "0",
          opacity: 1,
          transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
          },
        },
        exit: {
          y: "32vh",
          opacity: 0,
        },
      };


    return(
        <motion.div className="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" variants={dropIn} initial = "hidden" animate="visible" exit="exit">
                <p>{text}</p>
                <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="modal-button" onClick={handleClose}>Close</motion.button>
            </motion.div>
        </motion.div>
    )
}

export default Modal;
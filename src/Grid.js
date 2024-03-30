import b_orange from './Images/bad_orange.png'
import g_orange from './Images/good_orange.png'
import './Grid.css';
import { useState,useEffect} from 'react';
import { motion ,AnimatePresence} from "framer-motion";
import Modal from './Modal';

function Grid({row,column}){
    let tmp = [];
        for (let i = 0; i < row; i++) {
            let row = [];
            for (let j = 0; j < column; j++) {
                row.push(0);
        }
        tmp.push(row);
    }
    const totalItems = row * column;
    const items = [...Array(totalItems)];

    const [grid,setGrid] = useState(tmp)
    const [type, setType] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        setGrid(tmp);
    }, [row, column]);  
    const close = () => {
        setModalOpen(false);
        setGrid(tmp);
    }
    const clickHandler = (index) => {
        if (type === "") {
            setText("Please select the type of orange");
            setModalOpen(true);
        }
        else{
            let newGrid = [...grid];
            let i = Math.floor(index / column);
            let j = index % column;
            newGrid[i][j] = type;
            setGrid(newGrid);
        }
    }
    
    const handleType = (t) => {
        setType(t);
    }

    const calculateTime = () => {
        if(grid.flat().includes(1) === false){
            setText("No fresh oranges to rot");
            setModalOpen(true);
            return;
        }
        let queue = [], oranges = 0, time = 0;
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === 1) oranges++
            else if (grid[r][c] === 2) queue.push([r,c,0]);
            }
        }
            
        const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
        const endR = grid.length - 1, endC = grid[0].length - 1;
        
        while (queue.length && oranges) {
            const [curR, curC, mins] = queue.shift();       
            if (grid[curR][curC] === 1) {
            grid[curR][curC] = 2;
            oranges--;
            time = mins;
            }
            for (let [addR, addC] of dirs) {
            const [newR, newC] = [curR + addR, curC + addC];
            if (newR < 0 || newR > endR || newC < 0 || newC > endC) continue;
            if (grid[newR][newC] === 1) {
                queue.push([newR, newC, mins + 1])
            }
            }
        }
        if (oranges) {
            setText("All oranges can not be rotten");
            setModalOpen(true);
            return;
        }
        if (time === 1){
            setText("All oranges will be rotten in 1 minute");
            setModalOpen(true);
            return;
        }
        setText(`All oranges will be rotten in ${time} minutes`);
        setModalOpen(true);
    }
    return(
        <div className='right'>
            <div className="radio-buttons">
                <motion.label whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
                <input type="radio" onClick={()=>handleType(0)} name="status" value="None" />
                <span className="radio-button">None</span>
                </motion.label>
                <motion.label whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
                <input type="radio" onClick={()=>handleType(1)}  name="status" value="Fresh" />
                <span className="radio-button">Fresh</span>
                </motion.label>
                <motion.label whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
                <input type="radio" onClick={()=>handleType(2)} name="status" value="Rotten" />
                <span className="radio-button">Rotten</span>
                </motion.label>
            </div>
            <div className="grid-container" style={{gridTemplateColumns: `repeat(${column}, 80px)`}}>
                {items.map((_, index) => (
                    <div key={index} onClick={()=>clickHandler(index)} className="grid-item">
                        {grid[Math.floor(index / column)] && grid[Math.floor(index / column)][index % column]===1 && <img src={g_orange}></img>}
                        {grid[Math.floor(index / column)] && grid[Math.floor(index / column)][index % column]===2 && <img src={b_orange}></img>}
                    </div>
                ))}
            </div>
            <div className="calculate">
                    <motion.button whileTap={{scale:0.9}} onClick={calculateTime} className='calculate-button' type="button">Calculate</motion.button>
            </div>
            <AnimatePresence initial={false} onExitComplete={() => null}>
                {modalOpen && <Modal text={text} handleClose={close} />}
            </AnimatePresence>
        </div>
    )
}

export default Grid;
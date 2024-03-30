import './App.css';
import Form from './Form';
import Navbar from './Navbar';
import Text from './Text';
import Grid from './Grid';
import { useState } from 'react';

function App() {
  const [row, setRow] = useState(3);
  const [column, setColumn] = useState(3);

  const handleValue = (value) => {
    setRow(value[0]);
    setColumn(value[1]);
  }

  return (
    <div className="App">
      <Navbar />
      <div className='content'>
        <div className='left'>
          <div className='left-content'>
            <Text />
            <Form handler={handleValue}/>
          </div>
        </div>
        <Grid row = {row} column = {column}/>        
      </div>
    </div>
  );
}
export default App;

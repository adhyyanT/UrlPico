import './App.css';
import Url from './components/Url';
import { Container } from '@mui/material';
import Backgroud from './components/backgroud/Backgroud';
function App() {
  return (
    <div className='app'>
      <Container maxWidth={false}>
        <Url />
        <Backgroud />
      </Container>
    </div>
  );
}

export default App;

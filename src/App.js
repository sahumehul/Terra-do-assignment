import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateComponant from './componants/PrivateComponant';
import SignUp from './componants/Signup';
import { Header } from './componants/Header';
import { Footer } from './componants/Footer';
import Login from './componants/Login';
import Addtask from './componants/Addtask';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Header/>
      <Routes>
        <Route element={<PrivateComponant/>}>
        <Route path="/addtask" element={<Addtask/>} />
        </Route>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;

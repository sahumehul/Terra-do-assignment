import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateComponant from './componants/PrivateComponant';
import SignUp from './componants/Signup';
import { Header } from './componants/Header';
import { Footer } from './componants/Footer';
import Login from './componants/Login';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Header/>
      <Routes>
        <Route element={<PrivateComponant/>}>
        <Route path="/" element={<Login/>} />
        <Route path="/add" element={<h1>Add product page</h1>} />
        <Route path="/update" element={<h1>Update page</h1>} />
        <Route path="/logout" element={<h1>Logout page</h1>} />
        <Route path="/profile" element={<h1>Profile page</h1>} />
        </Route>
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;

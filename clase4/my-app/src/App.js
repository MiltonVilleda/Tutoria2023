import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Form from './components/form';
import View from './components/view';
import View2 from './components/view2';
import Home from './components/home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/new' Component={Form}/>
        <Route path='/view' Component={() => <View tipo="Solo lectura"/>} />
        <Route path='/view2' Component={View2} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

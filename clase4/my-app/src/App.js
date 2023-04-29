import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Form from './components/form';
import Form2 from './components/form2';
import View from './components/view';
import View2 from './components/view2';
import Home from './components/home';
import Cursos from './components/curso';
import Asignacion from './components/asignacion';
import Kart from './components/kart';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/new' Component={Form}/>
        <Route path='/new2' Component={Form2}/>
        <Route path='/view' Component={() => <View tipo="Solo lectura"/>} />
        <Route path='/view2' Component={View2} />
        <Route path='/kart' Component={Kart} />
        <Route path='/cursos' Component={Cursos} />
        <Route path='/asignacion' Component={Asignacion} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

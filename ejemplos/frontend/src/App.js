import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './components/home';
import View2 from './components/view2';
import Form2 from './components/form2';
/*import Form from './components/form';
import Form2 from './components/form2';
import View from './components/view';
import Home from './components/home';
import Cursos from './components/curso';
import Asignacion from './components/asignacion';
import Kart from './components/kart';
import User from './components/user';
import Graphs from './components/graphs';
import Foro from "./components/foro";
import Bills from './components/bills';
import Photos from './components/photos';*/

/*
<Route path='/new' Component={Form}/>
{<Route path='/new2' Component={Form2}/>**}
<Route path='/view' Component={() => <View tipo="Solo lectura"/>} />
{<Route path='/kart' Component={Kart} />**}
<Route path='/cursos' Component={Cursos} />
<Route path='/asignacion' Component={Asignacion} />
<Route path='/user' Component={User} />
<Route path='/graphs' Component={Graphs} />
<Route path='/foro' Component={Foro} />
<Route path='/bills' Component={Bills} />
<Route path='/photos' Component={Photos} />
*/

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/categories' Component={View2} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
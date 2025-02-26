
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './home.jsx'
import Regiok from './regiok.jsx'
 
function App() {
 
 return(
  <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/regiok" element={<Regiok/>}/>
    </Routes>
    </BrowserRouter>
  </div>
 )
}
 
export default App
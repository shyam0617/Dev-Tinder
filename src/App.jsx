import { useState } from 'react';
import Body from './Body';
import Login from './Login';
import Profile from './Profile';

import { BrowserRouter , Route, Routes} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter basename="/">

          <Routes>
              <Route path="/" element={<Body/>}>
                  <Route path="/Login" element={<Login/>}></Route>
                  <Route path="/Profile" element={<Profile/>}></Route>
              </Route>
          </Routes>

    </BrowserRouter>
    
    </>
  )
}

export default App

import { useState } from 'react';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import Feed from './components/Feed';

import { BrowserRouter , Route, Routes} from 'react-router-dom';
import {Provider} from "react-redux";
import appStore from './utils/appStore';
import Connections from './components/Connections';
import Request from "./components/Request";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={appStore}>
          <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Body/>}>
                        <Route path="/feed" element={<Feed/>}></Route>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/profile" element={<Profile/>}></Route>
                        <Route path="/connections" element={<Connections/>}></Route>
                        <Route path="/requests" element={<Request/>}></Route>
                    </Route>
                </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App

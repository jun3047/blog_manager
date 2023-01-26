import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import LinkEnroll from "./pages/LinkEnroll"
import Intro from "./pages/Intro"
import MyPage from "./pages/MyPage"
import Detail from "./pages/Detail"
import Login from './pages/login';
import Register from './pages/Register';
import ReactG4 from 'react-ga4'

ReactG4.initialize("G-0WD8FQXLEM")

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element= { <LinkEnroll/> }></Route>
        <Route path='/intro' element= { <Intro/> }></Route>
        <Route path='/login' element= { <Login/> }></Route>
        <Route path='/register' element= { <Register/> }></Route>
        <Route path='/myPage/:id' element= { <MyPage/> }></Route>
        <Route path='/detail/:id' element= { <Detail/> }></Route>
      </Routes>
    </div>
  );
}

export default App;
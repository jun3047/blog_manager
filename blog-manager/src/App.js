import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import LinkEnroll from "./pages/LinkEnroll"
import Intro from "./pages/Intro"
import MyPage from "./pages/MyPage"
import Detail from "./pages/Detail"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element= { <LinkEnroll/> }></Route>
        <Route path='/intro' element= { <Intro/> }></Route>
        <Route path='/myPage' element= { <MyPage/> }></Route>
        <Route path='/myPage/:id' element= { <Detail/> }></Route>
      </Routes>
    </div>
  );
}

export default App;
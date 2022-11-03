import { BrowserRouter,Routes,Route } from 'react-router-dom';
// import './App.css';
import ReportState from './context/report/reportState'
import Login from './component/Login';
import Navbar from './component/Navbar';
import Signup from './component/Signup';
// import Symptom from './component/Symptom';
import Reports from './component/Reports';
import Map from './component/Map';
import ReadMore from './component/ReadMore';
import About from './component/About';
import Home from './component/Home';
import Footer from './component/Footer';
import SingleReport from './component/SingleReport';

function App() {
  return (
    <>
    <ReportState>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/login" element ={<Login/>} />
      <Route path="/" element ={<Home/>} />
      <Route path="/about" element ={<About/>} />
      <Route path="/map" element ={<Map/>} />{/* {<Symptom/>}*/}
      <Route path="/signup" element ={<Signup/>} />
      <Route path="/myreport" element ={<Reports/>} />
      <Route path="/readmore" element ={<ReadMore/>} />
      <Route path="/myreport/:postId" element={<SingleReport/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </ReportState>
    {/* <Navbar/>
    <Login/> */}
    {/* <Signup/> */}
    </>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Topbar from './components/topbar/topbar';
import AdminPanel from './pages/AdminPanel/adminPanel';
import Login from './pages/login/login';
import Register from './pages/register/register';
import SubscribePage from './pages/subscribePage/subscribePage';

function App() {
  return (
    <Router>
      <Topbar/>
          <Routes>
            <Route path="/" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/subscribe" element={<SubscribePage/>}></Route>
            <Route path="/adminPanel" element={<AdminPanel/>}></Route>
          </Routes>
      </Router>
  );
}

export default App;

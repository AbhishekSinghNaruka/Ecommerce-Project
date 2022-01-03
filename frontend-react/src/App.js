import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
      <Header />
      <div className="container conatiner-fluid">
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
      </div>
      <Footer />
    </Router>
    </div>
  );
}

export default App;

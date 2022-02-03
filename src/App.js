import './App.css';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Home from './pages/Home';
import Country from './pages/Country';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store} >
        <div className="App">
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/covid-tracker/" element={<Home />} />
              <Route path="/covid-tracker/:country" element={<Country />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
    </Provider>
  );
}

export default App;

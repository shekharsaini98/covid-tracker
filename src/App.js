import './App.css';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Home from './pages/Home';
import Country from './pages/Country';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import States from './pages/States';
import NoFound from './pages/NoFound';

function App() {
  return (
    <Provider store={store} >
        <div className="App">
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:country" element={<Country />} />
              <Route path="/india/:city" element={<States />} />
              <Route path="*" element={<NoFound />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
    </Provider>
  );
}

export default App;

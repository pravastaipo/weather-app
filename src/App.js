
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Weather/>
      <Footer/>
    </div>
  );
}

export default App;

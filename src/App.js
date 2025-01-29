import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Import React Router
import Header from './Components/Header/Header';  // Import your Header component
import Home from './Components/Home/Home';  // Import your Home component
import Player from './Components/Player/Player';  // Capitalize 'Layer' if file is named Layer.jsx
import Footer from './Components/Footer/Footer';  // Import your Footer component

function App() {
  return (
    <Router>  {/* Wrap everything with Router */}
      <Header />  {/* Your Header component */}
      <Routes>  {/* Define the routes */}
        <Route path="/" element={<Home />} />  {/* Home route */}
        <Route path="/Player" element={<Player />} />  {/* Layer route */}
      </Routes>
      <Footer />  {/* Your Footer component */}
    </Router>
  );
}

export default App;

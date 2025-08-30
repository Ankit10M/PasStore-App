import "./App.css";
// import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Manager from "./Components/Manager";
import Footer from "./Components/Footer";

function App() {

  return (
     <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Manager Page with Navbar + Footer */}
        <Route
          path="/manager"
          element={
            <>
              <Navbar />
              <div className="min-h-[87.5vh]">
                <Manager />
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

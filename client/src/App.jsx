import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Prediction from "./components/Prediction";
import Footer from "./components/Footer";
import FloatBtn from "./components/FloatBtn";
import FAQ from "./components/FAQ";

const App = () => {
  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/FAQ" element={<FAQ />} />
            </Routes>
          </div>
          <Footer />
          <FloatBtn />
        </div>
      </Router>
    </>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Colleges from "./pages/Colleges";
import CollegeDetails from "./pages/CollegeDetails";
import Compare from "./pages/Compare";
import Predictor from "./pages/Predictor";
import CompareBar from "./components/CompareBar";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colleges" element={<Colleges />} />
          <Route path="/colleges/:id" element={<CollegeDetails />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/predictor" element={<Predictor />} />
        </Routes>
      </main>
      <CompareBar />
      <Footer />
    </div>
  );
}

export default App;
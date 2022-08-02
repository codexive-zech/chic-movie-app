import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import SharedNav from "./components/SharedNav";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SharedNav />}>
            <Route index element={<Home />} />
            <Route path="movie/:id" element={<h1>Single Movie Page</h1>} />
            <Route path="movies/:type" element={<MovieList />} />
            <Route path="*" element={<h2>Error Page</h2>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

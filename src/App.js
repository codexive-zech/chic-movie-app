import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import SharedNav from "./components/SharedNav";
import Home from "./pages/Home";
import SingleMovie from "./pages/SingleMovie";
import Error from "./pages/Error";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SharedNav />}>
            <Route index element={<Home />} />
            <Route path="movie/:id" element={<SingleMovie />} />
            <Route path="movies/:type" element={<MovieList />} />
            <Route path="movies/:type/movie/:id" element={<SingleMovie />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

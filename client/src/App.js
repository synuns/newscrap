import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import NavBar from "./Components/NavBar";
import News from "./Routes/News";
import Search from "./Routes/Search";
import Scrap from "./Routes/Scrap";
import Trends from "./Routes/Trends";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/search" element={<Search />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/scrap" element={<Scrap />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

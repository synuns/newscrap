import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import NavBar from "./Components/NavBar";
import News from "./Routes/News";
import Search from "./Routes/Search";
import Scrap from "./Routes/Scrap";
import Keywords from "./Routes/Keywords";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/search" element={<Search />} />
        <Route path="/keyword" element={<Keywords />} />
        <Route path="/scrap" element={<Scrap />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

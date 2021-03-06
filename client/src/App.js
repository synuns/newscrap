import { useLayoutEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import News from "./Routes/News";
import Search from "./Routes/Search";
import Scrap from "./Routes/Scrap";
import Template from "./Routes/Template";
import Trends from "./Routes/Trends";
import NavBar from "./Components/Base/NavBar";
import Modals from './Components/Modal/Modals';

const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
} 

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/search" element={<Search />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/scrap" element={<Scrap />} />
          <Route path="/scrap/:template" element={<Template />} />
        </Routes>
      </Wrapper>
      <Modals />
    </BrowserRouter>
  );
}


export default App;

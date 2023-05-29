import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { fetchDataFromApi } from './util/tmdb_api'

import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/SearchResults/SearchResults";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((state) => state.home);
  console.log(url);

  useEffect(()=>{
    apiTesting()
  },[])

  const apiTesting = () => {
    fetchDataFromApi('/configuration').then((res)=>{
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original'
      }
      dispatch(getApiConfiguration(url));
    })
  }

  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App

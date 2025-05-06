import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { CssBaseline, AppBar, Box, Typography, Button, Avatar, Popover, IconButton, Drawer, List, ListItem, ListItemText, ListItemButton, Divider } from '@mui/material'
import Home from './pages/Home'
import ImgCarousel from './pages/ImgCarousel'
import ImgSlider from './pages/ImgSlider'
import Poster from './pages/Poster'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CssBaseline />
      <Box sx={universal}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/imgcarousel' element={<ImgCarousel />} />
          <Route path='/imgslider' element={<ImgSlider />} />
          <Route path='/poster' element={<Poster />} />
        </Routes>
      </Box>
    </>
  )
}

export default App

const universal = {
  px: {
    xs: '1rem',
    sm: '2rem',
    md: '6rem',
    lg: '10rem',
    xl: '16rem',
  }
}
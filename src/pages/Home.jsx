import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { Typography, Box, Avatar, Grid, Button } from '@mui/material'
import Logo from './../assets/logo.png'
import { colorToComponents } from 'pdf-lib'

function Home() {

    const navigate = useNavigate()

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png']
        },
        multiple: true
    })

    return (
        <Box sx={container}>
            <img src={Logo} style={{ width: '40%', height: '40%', marginTop: '5rem', marginBottom: '5rem' }} />
            <Typography sx={{ fontSize: '2rem' }}>เพิ่มข้อมูลหลังบ้าน✏️📄</Typography>
            <Typography sx={{ fontSize: '1.5rem', textAlign: 'center' }}>ข้อมูลที่เพิ่มภายในนี้ จะถูกเพิ่มลงในฐานข้อมูลและจะแสดงผลบนเว็บไซต์แสดงข้อมูลโปรโมชั่น 7-ELEVEN-Pro</Typography>
            <Grid container spacing={2} sx={{ width: '100%', mt: '5rem' }}>
                <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 4 }} sx={{ ...bt_container, bgcolor: 'darkorange' }}>
                    <Button sx={bt} onClick={() => { navigate('/imgcarousel') }}>Carousel</Button>
                </Grid>
                <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 4 }} sx={{ ...bt_container, bgcolor: '#ed1c24' }}>
                    <Button sx={bt} onClick={() => { navigate('/imgslider') }}>Slider</Button>
                </Grid>
                <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 4 }} sx={{ ...bt_container, bgcolor: '#14724f', mb: '5rem' }}>
                    <Button sx={bt} onClick={() => { navigate('/poster') }}>Poster</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home

const container = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    height: '100%',
}

const bt_container = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    height: '100%',
}

const bt = {
    fontSize: '2rem',
    color: 'white',
    height: '100%',
    width: '100%',
}
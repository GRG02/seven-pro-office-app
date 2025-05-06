import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { Typography, Box, Avatar, Grid, Button } from '@mui/material'

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
            <Typography>Home</Typography>
            {/* <Grid sx={dropzone_container}>
                <Box sx={{ ...container, border: '2px dashed gray', height: '400px', width: '100%' }} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Typography>ลากและวางไฟล์</Typography>

                    <Box sx={{ display: 'flex', gap: '1rem', mt: 2 }}>
                        {acceptedFiles.map((file, index) => (
                            <Avatar
                                key={index}
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                sx={{ width: 80, height: 80 }}
                            />
                        ))}
                    </Box>
                </Box>
                <Box sx={{ ...container, border: '2px dashed gray', height: '400px', width: '100%' }} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Typography>ลากและวางไฟล์</Typography>
                    <ul>
                        {acceptedFiles.map(file => (
                            <Avatar key={file} />
                        ))}
                    </ul>
                </Box>
                <Box sx={{ ...container, border: '2px dashed gray', height: '400px', width: '100%' }} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Typography>ลากและวางไฟล์</Typography>
                    <ul>
                        {acceptedFiles.map(file => (
                            <Avatar key={file} src={file} />
                        ))}
                    </ul>
                </Box>
            </Grid> */}
            <Box sx={bt_container}>
                <Button sx={bt} onClick={() => { navigate('/imgcarousel') }}>Carousel</Button>
                <Button sx={bt} onClick={() => { navigate('/imgslider') }}>Slider</Button>
                <Button sx={bt} onClick={() => { navigate('/poster') }}>Poster</Button>
            </Box>
        </Box>
    )
}

export default Home

const container = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    height: '100vh',
    // bgcolor: 'blue'
}

const bt_container = {
    bgcolor: 'yellow',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    width: '100%',
}

const bt = {
    height: '20px',
    width: '100px',
}
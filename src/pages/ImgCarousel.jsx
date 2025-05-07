import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { Avatar, Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import Popup from '../pages/components/Popup'
import Loading from './components/Loading'
import Default from './../assets/defaultimage.png'

function ImgCarousel() {

    const [files, setFiles] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [openLoading, setOpenLoading] = useState(false);
    const poster_type = 'c';
    const [image, setImage] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getAllCarousel = async () => {
            try {
                const res = await axios.get(`https://n8n-bb7z.onrender.com/webhook/e3851d33-6719-44be-8951-6912b6db2e98/seven-pro/carousel/${poster_type}`);
                setImage(res.data.body);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllCarousel();
    }, []);

    const onDrop = useCallback((acceptedFiles) => {
        setFiles((prev) => [...prev, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg']
        },
        noClick: true,
        noKeyboard: true,
        capture: 'environment', //รองรับการเลือกรูปจากโทรศัพท์
        onDropRejected: (fileRejections) => {
            console.log('ไม่สามารถอัปโหลดไฟล์นี้ได้: ', fileRejections);
        },
    });

    const handleClear = () => {
        setFiles([]);
    };

    const handleDeleteCarousel = async (poster_id) => {
        setOpenLoading(true);
        try {
            const res = await axios.get(`https://n8n-bb7z.onrender.com/webhook/e3851d33-6719-44be-8951-6912b6db2e98/seven-pro/carousel/delete/${poster_id}`);
            console.log(res.data);
            setOpenLoading(false);
            setImage((prevImages) => prevImages.filter((image) => image.poster_id !== poster_id));
        } catch (error) {
            setOpenLoading(false);
            console.log(error);
        }
    };

    const showImages = files.slice(0, 15);
    const extraCount = files.length - 15;

    return (
        <Box sx={container}>
            <Box sx={{ height: '4.5rem' }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', width: '100%',  }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>เพิ่มโปสเตอร์บน Carousel</Typography>
                <Button sx={{ fontSize: '1.25rem', ml: 'auto', bgcolor: 'darkorange', color: 'white' }} onClick={() => { navigate('/') }}>กลับสู่หน้าหลัก</Button>
            </Box>
            <Box sx={{ height: '4.5rem' }} />
            <Grid container spacing={2} sx={{ width: '100%' }}>
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 6 }} sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'white' }}>
                    <TableContainer sx={{ maxHeight: '60vh', border: '2px solid darkorange' }}>
                        <Table aria-label="simple table">
                            <TableHead sx={{ bgcolor: 'darkorange' }}>
                                <TableRow>
                                    <TableCell align='center' sx={{ color: 'white' }}>ลำดับ</TableCell>
                                    <TableCell align='center' sx={{ color: 'white' }}>รูป</TableCell>
                                    <TableCell align='center' sx={{ color: 'white' }}>อัพโหลดเมื่อ</TableCell>
                                    <TableCell align='center' sx={{ color: 'white' }}>ลบ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {image.length === 0 ? (
                                    <TableRow sx={{ border: 'none', bgcolor: '#f9f9f9' }}>
                                        <TableCell
                                            colSpan={4}
                                            align="center"
                                            sx={{
                                                border: 'none',
                                                padding: '2rem',
                                                color: '#999',
                                                fontStyle: 'italic'
                                            }}
                                        >
                                            ยังไม่มีข้อมูล
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    image.map((row, index) => (
                                        <TableRow
                                            key={row.poster_id}
                                            sx={{
                                                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                                                '&:hover': { backgroundColor: '#e3f2fd' },
                                            }}
                                        >
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">
                                                <Avatar
                                                    variant="square"
                                                    sx={{ width: 56, height: 56, mx: 'auto' }}
                                                    src={`https://slrjrfzzgnjpsxcruorv.supabase.co/storage/v1/object/public/seven-img/poster/${row.poster_img}`}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                {new Date(row.created_at).toLocaleString('th-TH', {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short',
                                                })} น.
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button sx={{ fontSize: '1.25rem' }} onClick={() => handleDeleteCarousel(row.poster_id)}>❌</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 6 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: '5rem' }}>
                    <Box sx={dropzone_box} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Avatar variant='square' src={Default} sx={{ width: '30%', height: '30%', mb: 2, display: files.length === 0 ? 'block' : 'none' }} />
                        <Typography>ลากและวางไฟล์รูปหลายไฟล์ (รองรับเฉพาะ .jpg, .jpeg และ .png)</Typography>
                        <Grid container spacing={2} sx={{ width: '100%', justifyContent: 'center', mt: 2 }}>
                            {showImages.map((file, index) => (
                                <Grid item key={index}>
                                    <Avatar
                                        variant="square"
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        sx={{ width: '100px', height: '100px' }}
                                    />
                                </Grid>
                            ))}

                            {extraCount > 0 && (
                                <Grid item>
                                    <Box
                                        sx={{
                                            width: '100px',
                                            height: '100px',
                                            bgcolor: 'gray',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: 'white',
                                            fontSize: '1.2rem',
                                            borderRadius: 1,
                                        }}
                                    >
                                        +{extraCount}
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                        <Button onClick={open}>เลือกรูปเพิ่ม</Button>
                        <Button
                            sx={{ ml: 'auto' }}
                            onClick={() => { setOpenPopup(true), console.log(files) }}
                            disabled={files.length === 0}
                        >
                            ตรวจสอบ
                        </Button>
                        <Button onClick={handleClear}>ยกเลิก</Button>

                        <Popup open={openPopup} onClose={() => setOpenPopup(false)} files={files} setFiles={setFiles} type={poster_type} setImage={setImage} />
                        <Loading open={openLoading} onClose={() => setOpenLoading(false)} title="กําลังลบ..." message="กรุณารอสักครู่..." />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ImgCarousel

const container = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    height: '100%',
    // bgcolor: 'blue'
}

const dropzone_box = {
    width: '100%',
    minHeight: '50vh',
    border: '2px dashed gray',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    p: 2
}
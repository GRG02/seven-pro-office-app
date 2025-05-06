import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Avatar, Box, Button, Grid, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Popup from '../pages/components/Popup'
import Default from './../assets/defaultimage.png'

function ImgCarousel() {

    const [files, setFiles] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);

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

    const showImages = files.slice(0, 15);
    const extraCount = files.length - 15;

    return (
        <Box sx={container}>
            <Box sx={{ height: '4.5rem' }} />
            <Typography>ImgCarousel</Typography>
            <Box sx={{ height: '4.5rem' }} />
            <Grid container spacing={2} sx={{ width: '100%' }}>
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 6 }} sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'green' }}>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>ลำดับ</TableCell>
                                    <TableCell align='center'>อัพโหลดเมื่อ</TableCell>
                                    <TableCell align='center'>จำนวนรูป</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 6 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: '' }}>
                    <Box sx={dropzone_box} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Avatar variant='square' src={Default} sx={{ width: '30%', height: '30%', mb: 2, display: files.length === 0 ? 'block' : 'none' }}/>
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
                        <Popup open={openPopup} onClose={() => setOpenPopup(false)} files={files} setFiles={setFiles} />
                        <Button onClick={handleClear}>ยกเลิก</Button>
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
    height: '100vh',
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
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Box,
    TextField
} from '@mui/material';
import axios from 'axios';
import Loading from './Loading';

function Detail({ open, onClose, image, setImage }) {
    const [openLoading, setOpenLoading] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        if (image) {
            setName(image.poster_name || '');
            setDescription(image.poster_desc || '');
            setMinPrice(image.poster_min_cost || '');
            setMaxPrice(image.poster_max_cost || '');
        }
    }, [image]);

    const handleUpdate = async () => {
        if (!name || !description || !minPrice) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }

        const formData = new FormData();
        formData.append('poster_id', image.poster_id);
        formData.append('poster_name', name);
        formData.append('poster_desc', description);
        formData.append('poster_min_cost', minPrice);
        if (maxPrice) formData.append('poster_max_cost', maxPrice);

        setOpenLoading(true);
        try {
            const res = await axios.post(
                'https://n8n-bb7z.onrender.com/webhook/seven-pro/carousel/update',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log(res.data);
            setImage(prev =>
                prev.map(item => item.poster_id === res.data.poster_id ? res.data : item)
            );
            setOpenLoading(false);
            onClose();
        } catch (e) {
            console.log(e);
            setOpenLoading(false);
        }
    };

    const validatePrice = (value) => {
        return value === '' || /^\d+(\.\d{0,2})?$/.test(value);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <DialogTitle>เพิ่มรายละเอียดโปรโมชั่น</DialogTitle>
                    <Button sx={{ ml: 'auto', bgcolor: 'green', color: 'white' }} onClick={handleUpdate}>
                        อัพโหลดขึ้นฐานข้อมูล
                    </Button>
                    <Button sx={{ ml: 1, mr: '1rem', bgcolor: 'darkorange', color: 'white' }} onClick={onClose}>
                        ย้อนกลับ
                    </Button>
                </Box>

                <DialogContent>
                    <TextField
                        label="ชื่อโปรโมชั่น"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="รายละเอียดโปรโมชั่น"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="ราคาขั้นต่ำ"
                        value={minPrice}
                        onChange={(e) => {
                            if (validatePrice(e.target.value)) setMinPrice(e.target.value);
                        }}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="ราคาสูงสุด (ไม่จำเป็น)"
                        value={maxPrice}
                        onChange={(e) => {
                            if (validatePrice(e.target.value)) setMaxPrice(e.target.value);
                        }}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
            </Dialog>

            <Loading open={openLoading} onClose={() => setOpenLoading(false)} title="กําลังเพิ่มข้อมูล..." message="กรุณารอสักครู่..." />
        </>
    );
}

export default Detail;
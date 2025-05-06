import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Button,
    Box
} from '@mui/material';
import axios from 'axios';

function Popup({ open, onClose, files, setFiles }) {

    const handleUpload = async (files) => {
        // อัพโหลดไฟล์ที่เลือกไปยังฐานข้อมูล

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('images', file);
        });
        console.log(formData);

        try {
            const res = await axios.post('https://n8n-bb7z.onrender.com/webhook-test/seven-pro/carousel', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
             
                }
            )
            console.log(res);

        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = (indexToDelete) => {
        setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToDelete));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <DialogTitle>รายการรูปที่อัปโหลด</DialogTitle>
                <Button sx={{ ml: 'auto', bgcolor: 'green', color: 'white' }} onClick={() => { handleUpload(files) }}>อัพโหลดขึ้นฐานข้อมูล</Button>
                <Button sx={{ ml: 1, mr: '1rem', bgcolor: 'darkorange', color: 'white' }} onClick={onClose}>ย้อนกลับ</Button>
            </Box>

            <DialogContent>
                <List>
                    {files.map((file, index) => {
                        const truncatedName = file.name.length > 30
                            ? file.name.slice(0, 30) + '...'
                            : file.name;

                        return (
                            <ListItem
                                key={index}
                                sx={{ alignItems: 'center', bgcolor: index % 2 === 0 ? '#f5f5f5' : '#e0e0e0' }}
                                secondaryAction={
                                    <Button color="error" onClick={() => handleDelete(index)}>ลบ</Button>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        variant="square"
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        sx={{ width: 60, height: 60 }}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={truncatedName}
                                    secondary={`${(file.size / 1024).toFixed(2)} KB`}
                                    sx={{ marginLeft: 2 }}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </DialogContent>
        </Dialog>
    );
}

export default Popup
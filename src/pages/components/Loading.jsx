import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    CircularProgress,
    Box,
    Typography
} from '@mui/material';

function Loading({ open, onClose, title = "กำลังโหลด...", message = "" }) {
    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    onClose();
                }
            }}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center" py={2}>
                    <CircularProgress />
                    {message && (
                        <Typography variant="body2" mt={2} textAlign="center">
                            {message}
                        </Typography>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}


export default Loading;

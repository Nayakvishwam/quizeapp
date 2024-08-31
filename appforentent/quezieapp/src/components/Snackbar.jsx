import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";


export default function SnackbarComponent(params) {
    const [open, setOpen] = useState(params.show);
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={params.type}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {params.message}
            </Alert>
        </Snackbar>
    )
}
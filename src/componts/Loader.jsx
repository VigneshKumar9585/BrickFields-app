import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loader = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                bgcolor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
                backdropFilter: 'blur(5px)', // Glassmorphism effect
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999, // High z-index to sit on top of everything
            }}
        >
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                {/* Outer Circle */}
                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={80}
                    thickness={4}
                    sx={{
                        color: '#e0e0e0', // Light grey track
                        position: 'absolute',
                    }}
                />
                {/* Inner Spinner */}
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    size={80}
                    thickness={4}
                    sx={{
                        color: '#029898', // BrickFields Teal
                        animationDuration: '550ms',
                        [`& .MuiCircularProgress-circle`]: {
                            strokeLinecap: 'round',
                        },
                    }}
                />
            </Box>
            <Typography
                variant="h6"
                sx={{
                    mt: 3,
                    color: '#029898',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    fontSize: '14px',
                    animation: 'pulse 1.5s infinite ease-in-out',
                    '@keyframes pulse': {
                        '0%': { opacity: 0.6 },
                        '50%': { opacity: 1 },
                        '100%': { opacity: 0.6 },
                    }
                }}
            >
                Loading...
            </Typography>
        </Box>
    );
};

export default Loader;

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function EnquiryDetailsPopup({ open, handleClose, enquiryData }) {
  // You would typically manage form state with useState here
  // For demonstration, we'll just show the structure

  const services = ['Service A', 'Service B', 'Service C']; // Example services

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: '#2b2b2b', // Dark background inspired by your image
          color: 'white', // White text color
          borderRadius: '8px',
          border: '1px solid #444' // Subtle border
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, color: 'white', borderBottom: '1px solid #444' }}>
        Enquiry Details
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500',
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers sx={{ p: 2, borderBottom: '1px solid #444' }}>
        <Box sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
          Visitor Details <span style={{ color: 'grey', fontSize: '0.8em' }}>&lt; Edit</span>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Enquiry ID"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: 'white' }, sx: { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#3a3a3a' } }}
              value={enquiryData?.enquiryId || ''}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: 'white' }, sx: { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#3a3a3a' } }}
              value={enquiryData?.name || ''}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: 'white' }, sx: { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#3a3a3a' } }}
              value={enquiryData?.country || ''}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: 'white' }, sx: { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#3a3a3a' } }}
              value={enquiryData?.state || ''}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="District"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: 'white' }, sx: { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#3a3a3a' } }}
              value={enquiryData?.district || ''}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Region"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: 'white' }, sx: { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#3a3a3a' } }}
              value={enquiryData?.region || ''}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: 'white' }, sx: { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#3a3a3a' } }}
              value={enquiryData?.address || ''}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Mobile No."
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: 'white' }, sx: { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#3a3a3a' } }}
              value={enquiryData?.mobileNo || ''}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="E-Mail"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: 'white' }, sx: { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#3a3a3a' } }}
              value={enquiryData?.email || ''}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#3a3a3a' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' } }}>
              <InputLabel id="service-label" style={{ color: '#bbb' }}>Service</InputLabel>
              <Select
                labelId="service-label"
                id="service"
                label="Service"
                style={{ color: 'white' }}
                value={enquiryData?.service || ''}
                // You would typically handle onChange for Select
              >
                {services.map((service) => (
                  <MenuItem key={service} value={service}>
                    {service}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Total Sq. Feet"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: 'white' }, sx: { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#3a3a3a' } }}
              value={enquiryData?.totalSqFeet || ''}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Enquired Date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: 'white' }, sx: { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#3a3a3a' } }}
              value={enquiryData?.enquiredDate || ''}
              disabled
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Button
          onClick={handleClose} // Or handle update logic
          variant="contained"
          sx={{
            backgroundColor: '#0056b3', // Dark blue, similar to your button
            color: 'white',
            '&:hover': {
              backgroundColor: '#004080',
            },
            padding: '8px 24px',
            textTransform: 'none',
            borderRadius: '4px'
          }}
        >
          Update
        </Button>
      </Box>
    </Dialog>
  );
}

export default EnquiryDetailsPopup;
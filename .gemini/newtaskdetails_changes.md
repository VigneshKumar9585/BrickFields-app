# NewTaskDetails Page - Requested Changes

## Summary of Changes Needed:

### 1. **Layout Reorganization**
   - Move "New Tasks" heading to the LEFT side
   - Move filters to the RIGHT side (on the same line)
   
### 2. **Pagination Controls**
   - Add pagination filter dropdown: Show 10, 20, 30, 50 items per page
   - Add Previous/Next buttons with arrow icons
   - Use green color (#029898) for the arrow icons to match the theme
   
### 3. **Blinking Row Animation**
   - If a row has "assigned" field that needs assignment (empty or null)
   - The entire row should blink to alert the admin
   - Use CSS keyframe animation with green color

## Implementation Plan:

### Step 1: Add Required Imports
```javascript
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
```

### Step 2: Add Pagination State Variables
```javascript
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);
```

### Step 3: Add CSS for Blinking Animation
Add to the styled components or inline styles:
```javascript
const blinkAnimation = `
  @keyframes blink {
    0%, 100% { background-color: transparent; }
    50% { background-color: rgba(2, 152, 152, 0.2); }
  }
`;
```

### Step 4: Update the Header Section
Replace the current header with:
```jsx
<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
  <Typography variant="h6" sx={{ fontWeight: 600 }}>New Tasks</Typography>
  
  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
    {/* Pagination Filter */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography sx={{ fontSize: "13px" }}>Show:</Typography>
      <TextField
        select
        value={itemsPerPage}
        onChange={(e) => {
          setItemsPerPage(e.target.value);
          setCurrentPage(1);
        }}
        size="small"
        sx={{ width: 80 }}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </TextField>
    </Box>
    
    {/* Pagination Controls */}
    <Box sx={{ display: "flex", gap: 1 }}>
      <IconButton
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        sx={{ color: "#029898" }}
      >
        <ChevronLeftIcon />
      </IconButton>
      
      <Typography sx={{ display: "flex", alignItems: "center", px: 2 }}>
        Page {currentPage} of {totalPages}
      </Typography>
      
      <IconButton
        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
        sx={{ color: "#029898" }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  </Box>
</Box>
```

### Step 5: Add Blinking Logic to Table Rows
```jsx
<TableRow
  key={index}
  sx={{
    animation: !row.assigned ? "blink 1.5s infinite" : "none",
    "@keyframes blink": {
      "0%, 100%": { backgroundColor: "transparent" },
      "50%": { backgroundColor: "rgba(2, 152, 152, 0.2)" }
    }
  }}
>
```

### Step 6: Calculate Pagination
```javascript
const totalPages = Math.ceil(partners.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const paginatedPartners = partners.slice(startIndex, endIndex);
```


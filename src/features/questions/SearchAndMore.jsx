import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";

function SearchAndMore({
  onSearch,
  open,
  setOpenFilter,
  onChange,
  order,
  size,
  onSize,
}) {
  const newOrder = order === "DESC" ? "ASC" : "DESC";

  return (
    <Box display="flex" gap={2}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          onChange={onSearch}
        />

        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={(event) => setOpenFilter(event.currentTarget)}
        >
          <FilterAltIcon />
        </IconButton>
        <Menu
          id="basic-menu-filter"
          anchorEl={open}
          open={Boolean(open)}
          onClose={() => setOpenFilter(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => onChange({ order: newOrder, sortField: "id" })}
          >
            Sort By {newOrder} ID
          </MenuItem>

          <MenuItem
            onClick={() => onChange({ order: newOrder, sortField: "title" })}
          >
            Sort By {newOrder} Title
          </MenuItem>
          <MenuItem
            onClick={() =>
              onChange({ order: newOrder, sortField: "createdAt" })
            }
          >
            Sort By {newOrder} Created At
          </MenuItem>
          <MenuItem
            onClick={() =>
              onChange({ order: newOrder, sortField: "updatedAt" })
            }
          >
            Sort By {newOrder} Updated At
          </MenuItem>
        </Menu>
      </Paper>

      <FormControl>
        <InputLabel id="size-select-label">Size</InputLabel>
        <Select
          labelId="size-select-label"
          id="size-select"
          label="Size"
          value={size || 10}
          onChange={(e) => onSize(e.target.value)}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SearchAndMore;

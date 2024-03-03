import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton, InputBase, Menu, MenuItem, Paper } from "@mui/material";

function Search({ handleSearch, setOpenFilter, openFilter, handleChange }) {
  return (
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
        placeholder="Search user"
        onChange={(e) => handleSearch(e)}
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
        anchorEl={openFilter}
        open={Boolean(openFilter)}
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
          onClick={() => handleChange({ sortBy: "desc", sortField: "email" })}
        >
          Sort By Email Desc
        </MenuItem>
        <MenuItem
          onClick={() => handleChange({ sortBy: "asc", sortField: "email" })}
        >
          Sort By Email Asc
        </MenuItem>
        <MenuItem
          onClick={() => handleChange({ sortBy: "desc", sortField: "name" })}
        >
          Sort By Name Desc
        </MenuItem>
        <MenuItem
          onClick={() => handleChange({ sortBy: "asc", sortField: "name" })}
        >
          Sort By Name Asc
        </MenuItem>
      </Menu>
    </Paper>
  );
}

export default Search;

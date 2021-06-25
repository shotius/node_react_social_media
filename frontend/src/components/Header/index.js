import React from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  Box,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CropSquareIcon from "@material-ui/icons/CropSquare";
import SearchIcon from "@material-ui/icons/Search";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { Blue } from "../../utils/colors";
import { contentWrapper, sideWrapper } from "../../utils/wrappers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar color="transparent">
      <Toolbar>
        <Box display="flex" style={sideWrapper}>
          <CropSquareIcon fontSize="large" style={{ color: Blue }} />
          <Typography variant="h5" style={{ paddingTop: "2px" }}>
            Square
          </Typography>
        </Box>
        <Box style={contentWrapper}>
          <OutlinedInput
            inputProps={{
              style: {
                padding: 10,
              },
            }}
            placeholder="Search"
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
            style={{ paddingRight: "5px", width: "60%", borderRadius: "10px", backgroundColor: "#f6f9fb"}}
          />
        </Box>
        <PersonAddOutlinedIcon style={{marginLeft: 'auto'}}/>
      </Toolbar>
    </AppBar>
  );
}

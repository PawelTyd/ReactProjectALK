import PropTypes from "prop-types";
import { useState } from "react";

import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  ListItemAvatar,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useBoundStore } from "../../store/useBoundStore";

export const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const { setUsers, setOriginalUsers, originalUsers } = useBoundStore(
    (state) => ({
      setUsers: state.setUsers,
      setOriginalUsers: state.setOriginalUsers,
      originalUsers: state.originalUsers,
    })
  );

  function filter() {
    const filteredUsers = originalUsers.filter((user) => user.id !== row.id);
    setUsers(filteredUsers);
    setOriginalUsers(filteredUsers);
  }

  return (
    <>
      <StyledTableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>
          <ListItemAvatar align="center">
            <StyledAvatar>
              {`${row.name[0]}${row.name.split(" ")[1][0]}`}
            </StyledAvatar>
          </ListItemAvatar>
        </TableCell>
        <TableCell align="center">{row.name.split(" ")[0]}</TableCell>
        <TableCell align="center">{row.name.split(" ")[1]}</TableCell>
        <TableCell align="center">{row.email}</TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <StyledBox>
              <Typography variant="h6" gutterBottom component="div">
                Actions
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <StyledActionTableCell>
                      <Button onClick={() => filter()} variant="contained">
                        User removal
                      </Button>
                    </StyledActionTableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </StyledBox>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const StyledTableRow = styled(TableRow)(({ theme }) =>
  theme.unstable_sx({
    "& > *": { borderBottom: "unset" },
  })
);

const StyledActionTableCell = styled(TableCell)(({ theme }) =>
  theme.unstable_sx({
    paddingLeft: 0,
  })
);

const StyledBox = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    margin: 1,
  })
);

const StyledAvatar = styled(Avatar)(({ theme }) =>
  theme.unstable_sx({
    bgcolor: theme.palette.primary.main,
  })
);

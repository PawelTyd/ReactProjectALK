import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { useApi } from "../../hooks/useApi";

import { Row } from "./Row";
import { useBoundStore } from "../../store/useBoundStore";
import { ReturnButton } from "../../components";

const URL = "https://jsonplaceholder.typicode.com/users";

export const UsersManagementPage = () => {
  const [inputValue, setInputValue] = useState("");

  const { setUsers, setOriginalUsers, originalUsers } = useBoundStore(
    (state) => ({
      setUsers: state.setUsers,
      setOriginalUsers: state.setOriginalUsers,
      originalUsers: state.originalUsers,
    })
  );

  const { isError, isLoading, users } = useApi(URL);

  if (isLoading) {
    return <StyledDiv>Loading...</StyledDiv>;
  }

  if (isError) {
    return <StyledDiv>Something went wrong...</StyledDiv>;
  }

  const handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setInputValue(searchValue);

    const filteredUsers = originalUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        String(user.id).includes(searchValue)
    );

    setUsers(filteredUsers);
  };

  const sortData = (dataOption) => {
    let dataA = null;
    let dataB = null;
    const sortedData = [...users].sort((a, b) => {
      if (dataOption === "firstName") {
        dataA = a.name.split(" ")[0].toUpperCase();
        dataB = b.name.split(" ")[0].toUpperCase();
      } else if (dataOption === "secondName") {
        dataA = a.name.split(" ")[1].toUpperCase();
        dataB = b.name.split(" ")[1].toUpperCase();
      } else {
        dataA = a.email.toUpperCase();
        dataB = b.email.toUpperCase();
      }

      if (dataA < dataB) {
        return -1;
      }
      if (dataA > dataB) {
        return 1;
      }
      return 0;
    });

    setUsers(sortedData);
    setOriginalUsers(sortedData);
  };

  return (
    <StyledGridContainer
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <ReturnButton />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          fullWidth
          value={inputValue}
          onChange={handleChange}
          id="outlined-basic"
          label="Search..."
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        {users.length === 0 ? (
          <StyledDiv>
            Sorry. No data available. Try searching for another phrase
          </StyledDiv>
        ) : (
          <StyledTableContainer component={Paper}>
            <StyledTable aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <StyledTableCell
                    onClick={() => {
                      const sortedId = [...users].sort((a, b) => a.id - b.id);
                      setUsers(sortedId);
                      setOriginalUsers(sortedId);
                    }}
                  >
                    ID
                  </StyledTableCell>
                  <TableCell align="center">Avatar</TableCell>
                  <StyledTableCell
                    onClick={() => {
                      sortData("firstName");
                    }}
                    align="center"
                  >
                    First name
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      sortData("secondName");
                    }}
                    align="center"
                  >
                    Last name
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      sortData("email");
                    }}
                    align="center"
                  >
                    E-mail
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <Row key={row.id} row={row} />
                ))}
              </TableBody>
            </StyledTable>
          </StyledTableContainer>
        )}
      </Grid>
    </StyledGridContainer>
  );
};

const StyledGridContainer = styled(Grid)(({ theme }) =>
  theme.unstable_sx({
    p: 2,
  })
);

const StyledTextField = styled(TextField)(({ theme }) =>
  theme.unstable_sx({
    mt: 3,
  })
);

const StyledTable = styled(Table)(({ theme }) =>
  theme.unstable_sx({
    mt: 3,
    minWidth: 650,
    "@media (max-width: 600px)": {
      display: "block",
      overflowX: "auto",
    },
  })
);

const StyledTableCell = styled(TableCell)(({ theme }) =>
  theme.unstable_sx({
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  })
);

const StyledTableContainer = styled(TableContainer)(({ theme }) =>
  theme.unstable_sx({
    overflow: "auto",
  })
);

const StyledDiv = styled("div")(({ theme }) =>
  theme.unstable_sx({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  })
);

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { Suspense } from "react";
import { getUserId } from "../service/auth";
import { httpClient } from "../service/http";
import { CreateSuspenseResource } from "../service/util";
import DefaultError from "./DefaultError";
import ErrorBoundary from "./ErrorBoundary";
import FullscreenSpinner from "./FullscreenSpinner";

export default function Home() {
  const fetchUser = (userId) => {
    return {
      user: CreateSuspenseResource(
        httpClient.get("/api/users/" + userId),
        (r) => r.data
      ),
    };
  };

  const resource = fetchUser(getUserId());

  const UserDetails = () => {
    const user = resource.user.read();
    return (
      <Paper>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right">Email :</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Dob :</TableCell>
              <TableCell>{user.dob}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  };

  return (
    <ErrorBoundary fallback={DefaultError()}>
      <Suspense fallback={FullscreenSpinner()}>
        <UserDetails />
      </Suspense>
    </ErrorBoundary>
  );
}

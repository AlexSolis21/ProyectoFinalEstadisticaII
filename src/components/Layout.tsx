import { FC } from "react";
import { Box } from "@mui/material";
import { Navbar } from "./NavBar";

interface Props {
  title?: string;
  children: JSX.Element;
}

export const Layout: FC<Props> = ({ title = "Home", children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <title>{title}</title>
      <Navbar />
      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};

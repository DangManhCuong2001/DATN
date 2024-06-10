import { Box } from "@mui/material";
import Header from "./header/Header";
import Content from "./content/Content";

import HomePage from "../views/HomePage/HomePage";
import Providers from "../context/Providers";

export default function Layout() {
  return (
    <Providers>
      <Box>
        <Header />
        {/* <HomePage /> */}
        <Content />
      </Box>
    </Providers>
  );
}

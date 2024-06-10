import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LinkCustom({
  url,
  target,
  children,
}: {
  url: string;
  target?: "_blank" | "_parent" | "_self" | "_top" | undefined;
  children: ReactNode;
}) {
  const navigator = useNavigate();
  return (
    <Typography
      onClick={() => {
        navigator(url);
      }}
      sx={{ cursor: "pointer" }}
      // target={target}
      // style={{
      //   textDecoration: "none",
      //   color: "unset",
      // }}
    >
      {children}
    </Typography>
  );
}

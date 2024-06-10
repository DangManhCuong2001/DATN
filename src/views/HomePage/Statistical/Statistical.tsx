import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function Statistical() {
  return (
    <Box sx={{ backgroundColor: "#e8f2f7", pb: 10 }}>
      <Container>
        <Box
          sx={{
            background:
              "linear-gradient(84.1deg, #00b5f1 33.44%, #00e0ff 132.9%)",
            height: "400px",
            borderRadius: "15px",
            // mt: 8,
            py: 3,
            px: 10,
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: "50px",
              textAlign: "center",
              mb: 6,
            }}
          >
            Thống kê
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  mb: 2,
                }}
              ></Box>
              <Typography
                sx={{ color: "white", fontSize: "30px", fontWeight: 600 }}
              >
                2.2M+
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "25px", fontWeight: 500 }}
              >
                Lượt khám
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  mb: 2,
                }}
              ></Box>
              <Typography
                sx={{ color: "white", fontSize: "30px", fontWeight: 600 }}
              >
                2.2M+
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "25px", fontWeight: 500 }}
              >
                Lượt khám
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  mb: 2,
                }}
              ></Box>
              <Typography
                sx={{ color: "white", fontSize: "30px", fontWeight: 600 }}
              >
                2.2M+
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "25px", fontWeight: 500 }}
              >
                Lượt khám
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  mb: 2,
                }}
              ></Box>
              <Typography
                sx={{ color: "white", fontSize: "30px", fontWeight: 600 }}
              >
                2.2M+
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "25px", fontWeight: 500 }}
              >
                Lượt khám
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  mb: 2,
                }}
              ></Box>
              <Typography
                sx={{ color: "white", fontSize: "30px", fontWeight: 600 }}
              >
                2.2M+
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "25px", fontWeight: 500 }}
              >
                Lượt khám
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

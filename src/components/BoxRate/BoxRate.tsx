import React from "react";
import { TDataRated } from "../../views/Doctor/RateComment/RateComment";
import { Box, Rating, Typography } from "@mui/material";
import { labelsRate } from "../../views/ProfileUser/ModalRate/ModalRate";

export default function BoxRate({ dataRated }: { dataRated: TDataRated }) {
  return (
    <Box sx={{ display: "flex", placeItems: "center", mb: 2, gap: 10 }}>
      <Box sx={{ display: "flex", placeItems: "center", gap: 1 }}>
        <img
          src={dataRated.image}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "12px",
            marginRight: "10px",
          }}
        />
        <Box>
          <Typography fontWeight={600}>{dataRated.userName}</Typography>
          <Typography>{dataRated.timeCreate}</Typography>
        </Box>
      </Box>
      <Box>
        <Box sx={{ display: "flex" }}>
          <Rating name="read-only" value={Number(dataRated.point)} readOnly />
          <Typography>
            {dataRated.point !== null && (
              <Box sx={{ ml: 2 }}>{labelsRate[Number(dataRated.point)]}</Box>
            )}
          </Typography>
        </Box>
        <Typography>{dataRated.rateContent}</Typography>
      </Box>
    </Box>
  );
}

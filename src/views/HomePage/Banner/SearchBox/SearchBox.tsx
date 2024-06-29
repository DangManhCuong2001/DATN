import { Box, ClickAwayListener, MenuItem, Typography } from "@mui/material";
import { IconSearch } from "../../../../assets/icon/icon";
import { useEffect, useState } from "react";
import { getDataSearch } from "../../../../services/PatientService/PatientService";
import { useNavigate } from "react-router-dom";

type TDataFilled = {
  id: string;
  image: string;
  name: string;
  address: string;
  typeHospital: string;
};
export default function SearchBox() {
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [listDoctorFilled, setListDoctorFilled] = useState<TDataFilled[]>([]);
  const [listHospitalFilled, setListHospitalFilled] = useState<TDataFilled[]>(
    []
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  console.log(open);
  async function getData() {
    setLoading(true);
    try {
      const response = await getDataSearch(value);

      console.log(response);

      const dataDoctor = response.data.data.dataUser.map((item: any) => {
        return {
          id: item.id,
          image: item.image,
          name: item.firstName + " " + item.lastName,
          address: item.address,
        };
      });

      const dataHospital = response.data.data.dataHospital.map((item: any) => {
        return {
          id: item.id,
          image: item.image,
          name: item.name,
          address: item.address,
          typeHospital: item.type,
        };
      });
      setListDoctorFilled(dataDoctor);
      setListHospitalFilled(dataHospital);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  const handleClickAway = () => {
    setOpen(false);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      getData();
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [value]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{
          width: "500px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          boxShadow: " 0px 3px 6px 0px rgba(0, 0, 0, 0.08);",
          borderRadius: "25px",
          px: 2,
          py: 1,
          columnGap: 1,
          "& .inputStyle": {
            color: "text.primary",
            fontFamily: "'Open Sans',sans-serif",
          },
          position: "relative",
        }}
      >
        <IconSearch sx={{ color: "red" }} />
        <input
          className="inputStyle"
          style={{
            border: "none",
            background: "none",
            outline: "none",
            width: "calc(100% - 25px)",
            fontSize: "14px",
          }}
          placeholder="Search...."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClick={() => setOpen(true)}
        ></input>
        {open ? (
          <Box
            sx={{
              position: "absolute",
              top: "60px",
              right: 0,
              width: "530px",
              borderRadius: "16px",
              boxShadow: 4,
              backgroundColor: "white",
            }}
          >
            <Typography
              sx={{
                background: "#e6f2ff",
                color: "black",
                px: 2,
                py: 1,
                fontWeight: 600,
                borderTopRightRadius: "16px",
                borderTopLeftRadius: "16px",
              }}
            >
              Bác sĩ
            </Typography>
            {listDoctorFilled.length > 0 ? (
              <Box>
                {listDoctorFilled.map((item, index) => {
                  return (
                    <MenuItem
                      key={"doctor filled" + index}
                      sx={{ mb: 0.5 }}
                      onClick={() => {
                        navigate(`/doctor/${item.id}`);
                      }}
                    >
                      <Box sx={{ display: "flex", placeItems: "center" }}>
                        <img
                          src={item.image}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "8px",
                            marginRight: "10px",
                          }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          sx={{ color: "black" }}
                        >
                          {item.name}{" "}
                          <Typography
                            fontWeight={500}
                            sx={{ color: "black" }}
                            component={"span"}
                          >
                            ({item.address})
                          </Typography>
                        </Typography>
                      </Box>
                    </MenuItem>
                  );
                })}
              </Box>
            ) : (
              <Box sx={{ textAlign: "center", py: 2 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  <path
                    d="M17.5 55C14.0417 55 11.0933 53.7808 8.655 51.3425C6.21667 48.9042 4.99834 45.9567 5 42.5C5 39.0417 6.21917 36.0933 8.6575 33.655C11.0958 31.2167 14.0433 29.9983 17.5 30C20.9583 30 23.9067 31.2192 26.345 33.6575C28.7833 36.0958 30.0017 39.0433 30 42.5C30 45.9583 28.7808 48.9067 26.3425 51.345C23.9042 53.7833 20.9567 55.0017 17.5 55ZM51.5 52.5L35.5 36.5C35 35.9583 34.4692 35.4067 33.9075 34.845C33.3458 34.2833 32.7933 33.7517 32.25 33.25C33.8333 32.25 35.1042 30.9167 36.0625 29.25C37.0208 27.5833 37.5 25.75 37.5 23.75C37.5 20.625 36.4058 17.9683 34.2175 15.78C32.0292 13.5917 29.3733 12.4983 26.25 12.5C23.125 12.5 20.4683 13.5942 18.28 15.7825C16.0917 17.9708 14.9983 20.6267 15 23.75C15 24 15.0108 24.24 15.0325 24.47C15.0542 24.7 15.085 24.9392 15.125 25.1875C14.375 25.2708 13.5525 25.4375 12.6575 25.6875C11.7625 25.9375 10.96 26.2292 10.25 26.5625C10.1667 26.1042 10.1042 25.6458 10.0625 25.1875C10.0208 24.7292 10 24.25 10 23.75C10 19.2083 11.5733 15.365 14.72 12.22C17.8667 9.075 21.71 7.50167 26.25 7.5C30.7917 7.5 34.635 9.07333 37.78 12.22C40.925 15.3667 42.4983 19.21 42.5 23.75C42.5 25.5417 42.2183 27.24 41.655 28.845C41.0917 30.45 40.3108 31.9183 39.3125 33.25L55 49L51.5 52.5ZM13.0625 48.6875L17.5 44.25L21.875 48.6875L23.6875 46.9375L19.25 42.5L23.6875 38.0625L21.9375 36.3125L17.5 40.75L13.0625 36.3125L11.3125 38.0625L15.75 42.5L11.3125 46.9375L13.0625 48.6875Z"
                    fill="#4CADD3"
                  />
                </svg>
                <Typography sx={{ color: "#11a2f3" }}>
                  Không tìm thấy
                </Typography>
              </Box>
            )}
            <Typography
              sx={{
                background: "#e6f2ff",
                color: "black",
                px: 2,
                py: 1,
                fontWeight: 600,
                // borderTopRightRadius: "16px",
                // borderTopLeftRadius: "16px",
              }}
            >
              Bệnh viện
            </Typography>
            {listHospitalFilled.length > 0 ? (
              <Box>
                {listHospitalFilled.map((item, index) => {
                  return (
                    <MenuItem
                      key={"doctor filled" + index}
                      onClick={() =>
                        navigate(`/${item.typeHospital}/${item.id}`)
                      }
                      sx={{ mb: 0.5 }}
                    >
                      <Box sx={{ display: "flex", placeItems: "center" }}>
                        <img
                          src={item.image}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "8px",
                            marginRight: "10px",
                          }}
                        />
                        <Box>
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            sx={{ color: "black" }}
                          >
                            {item.name}{" "}
                          </Typography>
                          <Typography
                            fontWeight={500}
                            sx={{ color: "black" }}
                            component={"span"}
                          >
                            {item.address}
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  );
                })}
              </Box>
            ) : (
              <Box sx={{ textAlign: "center", py: 2 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  <path
                    d="M17.5 55C14.0417 55 11.0933 53.7808 8.655 51.3425C6.21667 48.9042 4.99834 45.9567 5 42.5C5 39.0417 6.21917 36.0933 8.6575 33.655C11.0958 31.2167 14.0433 29.9983 17.5 30C20.9583 30 23.9067 31.2192 26.345 33.6575C28.7833 36.0958 30.0017 39.0433 30 42.5C30 45.9583 28.7808 48.9067 26.3425 51.345C23.9042 53.7833 20.9567 55.0017 17.5 55ZM51.5 52.5L35.5 36.5C35 35.9583 34.4692 35.4067 33.9075 34.845C33.3458 34.2833 32.7933 33.7517 32.25 33.25C33.8333 32.25 35.1042 30.9167 36.0625 29.25C37.0208 27.5833 37.5 25.75 37.5 23.75C37.5 20.625 36.4058 17.9683 34.2175 15.78C32.0292 13.5917 29.3733 12.4983 26.25 12.5C23.125 12.5 20.4683 13.5942 18.28 15.7825C16.0917 17.9708 14.9983 20.6267 15 23.75C15 24 15.0108 24.24 15.0325 24.47C15.0542 24.7 15.085 24.9392 15.125 25.1875C14.375 25.2708 13.5525 25.4375 12.6575 25.6875C11.7625 25.9375 10.96 26.2292 10.25 26.5625C10.1667 26.1042 10.1042 25.6458 10.0625 25.1875C10.0208 24.7292 10 24.25 10 23.75C10 19.2083 11.5733 15.365 14.72 12.22C17.8667 9.075 21.71 7.50167 26.25 7.5C30.7917 7.5 34.635 9.07333 37.78 12.22C40.925 15.3667 42.4983 19.21 42.5 23.75C42.5 25.5417 42.2183 27.24 41.655 28.845C41.0917 30.45 40.3108 31.9183 39.3125 33.25L55 49L51.5 52.5ZM13.0625 48.6875L17.5 44.25L21.875 48.6875L23.6875 46.9375L19.25 42.5L23.6875 38.0625L21.9375 36.3125L17.5 40.75L13.0625 36.3125L11.3125 38.0625L15.75 42.5L11.3125 46.9375L13.0625 48.6875Z"
                    fill="#4CADD3"
                  />
                </svg>
                <Typography sx={{ color: "#11a2f3" }}>
                  Không tìm thấy
                </Typography>
              </Box>
            )}
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}

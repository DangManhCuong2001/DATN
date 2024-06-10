import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useLoginContext } from "../../../context/login-context";
import { useNavigate } from "react-router-dom";
import { useHospitalContext } from "../../../context/hospital-context";
import { bookingAppointment } from "../../../services/PatientService/PatientService";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function MyselfForm() {
  const { isLogin, dataLogin } = useLoginContext();
  const { dataForm, setDataForm } = useHospitalContext();
  console.log(dataForm, dataLogin);

  const navigate = useNavigate();
  async function handleClickBook() {
    const id = uuidv4();
    const addDataForm = { ...dataForm, id: id };
    if (isLogin) {
      try {
        console.log(addDataForm);
        const response = await bookingAppointment(addDataForm);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/Login");
    }
  }

  useEffect(() => {
    setDataForm((prev) => {
      return {
        ...prev,
        patientId: dataLogin.idUser,
      };
    });
  }, [isLogin]);

  return (
    <Box sx={{ px: 50 }}>
      <Box
        sx={{
          border: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          py: 1.5,
          px: 2,
          width: "100%",
        }}
      >
        <PersonIcon sx={{ mr: 1 }} />
        <input
          className="inputStyle"
          style={{
            border: "none",
            background: "none",
            outline: "none",
            width: "calc(100% - 25px)",
            fontSize: "14px",
          }}
          placeholder="Họ và tên bệnh nhân(Bắt buộc)"
        ></input>
      </Box>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        row
        sx={{ mt: 1 }}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
      <Box
        sx={{
          border: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          py: 1.5,
          px: 2,
          width: "100%",
        }}
      >
        <LocalPhoneIcon sx={{ mr: 1 }} />
        <input
          className="inputStyle"
          style={{
            border: "none",
            background: "none",
            outline: "none",
            width: "calc(100% - 25px)",
            fontSize: "14px",
          }}
          placeholder="Số điện thoại liên hệ(Bắt buộc)"
        ></input>
      </Box>
      <Box
        sx={{
          border: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          py: 1.5,
          px: 2,
          width: "100%",
          mt: 2,
        }}
      >
        <CalendarMonthIcon sx={{ mr: 1 }} />
        <input
          className="inputStyle"
          style={{
            border: "none",
            background: "none",
            outline: "none",
            width: "calc(100% - 25px)",
            fontSize: "14px",
          }}
          placeholder="Năm sinh(Bắt buộc)"
        ></input>
      </Box>
      <Box
        sx={{
          border: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          py: 1.5,
          px: 2,
          width: "100%",
          mt: 2,
        }}
      >
        <LocationOnIcon sx={{ mr: 1 }} />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //   value={age}
          label="Age"
          //   onChange={handleChange}
          sx={{ width: "100%", border: "none" }}
          //   variant="outlined"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Box>
      <Box
        sx={{
          border: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          py: 1.5,
          px: 2,
          width: "100%",
          mt: 2,
        }}
      >
        <LocationOnIcon sx={{ mr: 1 }} />
        <input
          className="inputStyle"
          style={{
            border: "none",
            background: "none",
            outline: "none",
            width: "calc(100% - 25px)",
            fontSize: "14px",
          }}
          placeholder="Địa chỉ cụ thể(Bắt buộc)"
        ></input>
      </Box>
      <Box
        sx={{
          border: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          py: 1.5,
          px: 2,
          width: "100%",
          mt: 2,
        }}
      >
        <LocalHospitalIcon sx={{ mr: 1 }} />
        <input
          className="inputStyle"
          style={{
            border: "none",
            background: "none",
            outline: "none",
            width: "calc(100% - 25px)",
            fontSize: "14px",
          }}
          placeholder="Lý do khám(Bắt buộc)"
        ></input>
      </Box>
      <Typography sx={{ mt: 1, textAlign: "center" }}>
        Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ
        tục khám
      </Typography>
      <Box
        sx={{
          background: "#D4EFFC",
          px: 2,
          py: 2,
          borderRadius: "10px",
          mt: 1,
          width: "100%",
        }}
      >
        <Typography>LƯU Ý</Typography>
        <Typography>
          Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi
          điền thông tin anh/chị vui lòng:
        </Typography>
        <Typography>
          Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn Phú{" "}
        </Typography>
        <Typography>
          Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn "Xác
          nhận"
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{ mt: 2, width: "100%" }}
        onClick={handleClickBook}
      >
        Xác nhận đặt lịch khám
      </Button>
    </Box>
  );
}

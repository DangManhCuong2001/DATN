import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
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
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import useNotifier from "../../../hooks/useNotifier";
import { Container } from "../../../components/container/Container";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";

type TtimeType = "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7" | "T8";
const timeType: { [k in TtimeType]: string } = {
  T1: "8:00 - 9:00",
  T2: "9:00 - 10:00",
  T3: "10:00 - 11:00",
  T4: "8:00 - 12:00",
  T5: "14:00 - 15:00",
  T6: "15:00 - 16:00",
  T7: "16:00 - 17:00",
  T8: "17:00 - 18:00",
};
export default function MyselfForm() {
  const { isLogin, dataLogin } = useLoginContext();
  const { dataForm, setDataForm } = useHospitalContext();
  console.log(dataForm, dataLogin);
  const { notifyError, notifySuccess } = useNotifier();
  const navigate = useNavigate();
  const [isvalid, setIsvalid] = useState<boolean>(true);

  console.log(isvalid);
  const renderTimeBooking = (dataTime: any) => {
    if (dataTime) {
      let time = timeType[dataForm.hourSelected as TtimeType];
      let date = moment.unix(+dataTime / 1000).format("dddd - DD/MM/YYYY");
      return `${time}-${date}`;
    }

    return "";
  };

  async function handleClickBook() {
    const id = uuidv4();
    const addDataForm = { ...dataForm, id: id };
    if (isLogin) {
      try {
        console.log(addDataForm);
        const response = await bookingAppointment(addDataForm);
        console.log(response);
        notifySuccess("Đặt lịch thành công. Vui lòng xác nhận Email!");
      } catch (err) {
        notifyError("Đặt lịch thất bại");
        console.log(err);
      }
    } else {
      navigate("/Login");
    }
  }

  useEffect(() => {
    // renderTimeBooking(),
    setDataForm((prev) => {
      return {
        ...prev,
        patientId: dataLogin.idUser,
        email: dataLogin.email,
        timeString: renderTimeBooking(dataForm.daySelected),
      };
    });
  }, [isLogin]);

  function Validate() {
    return (
      <>
        {isvalid ? (
          <Typography sx={{ color: isvalid ? "red" : undefined, py: 1 }}>
            Vui lòng nhập đầy đủ thông tin!
          </Typography>
        ) : null}
      </>
    );
  }

  useEffect(() => {
    if (
      dataForm.fullName == "" ||
      dataForm.phoneNumber == "" ||
      dataForm.address == "" ||
      dataForm.reason == "" ||
      dataForm.gender == "" ||
      dataForm.dateOfBirth == ""
    ) {
      setIsvalid(true);
    } else {
      setIsvalid(false);
    }
  }, [
    dataForm.fullName,
    dataForm.phoneNumber,
    dataForm.address,
    dataForm.reason,
    dataForm.gender,
    dataForm.dateOfBirth,
  ]);

  return (
    <Container>
      <Box sx={{ textAlign: "center" }}>
        <Validate />
      </Box>
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
          value={dataForm.fullName}
          onChange={(e) =>
            setDataForm({ ...dataForm, fullName: e.target.value })
          }
          className="inputStyle"
          style={{
            border: "none",
            background: "none",
            outline: "none",
            width: "calc(100% - 25px)",
            fontSize: "14px",
          }}
          placeholder="Họ và tên bệnh nhân (Bắt buộc)"
          required
          type="text"
        ></input>
      </Box>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Nam"
        name="radio-buttons-group"
        row
        sx={{ mt: 1 }}
        value={dataForm.gender}
        onChange={(e) => setDataForm({ ...dataForm, gender: e.target.value })}
      >
        <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
        <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
        <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
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
          value={dataForm.phoneNumber}
          onChange={(e) =>
            setDataForm({ ...dataForm, phoneNumber: e.target.value })
          }
          style={{
            border: "none",
            background: "none",
            outline: "none",
            width: "calc(100% - 25px)",
            fontSize: "14px",
          }}
          type="number"
          placeholder="Số điện thoại liên hệ (Bắt buộc)"
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
          value={dataForm.dateOfBirth}
          onChange={(e) =>
            setDataForm({ ...dataForm, dateOfBirth: e.target.value })
          }
          type="date"
          placeholder="Năm sinh (Bắt buộc)"
        ></input>
      </Box>
      {/* <Box
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
      </Box> */}
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
          value={dataForm.address}
          onChange={(e) =>
            setDataForm({ ...dataForm, address: e.target.value })
          }
          placeholder="Địa chỉ cụ thể (Bắt buộc)"
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
          value={dataForm.reason}
          onChange={(e) => setDataForm({ ...dataForm, reason: e.target.value })}
          placeholder="Lý do khám (Bắt buộc)"
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
        variant={isvalid ? "outlined" : "contained"}
        sx={{
          mt: 2,
          width: "100%",
          background: isvalid
            ? null
            : "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
        }}
        onClick={handleClickBook}
        type="submit"
        disabled={isvalid}
      >
        Xác nhận đặt lịch khám
      </Button>
    </Container>
  );
}

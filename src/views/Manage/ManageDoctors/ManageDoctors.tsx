import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useManageContext } from "../../../context/manage-context";
import { v4 as uuidv4 } from "uuid";
import {
  getInfoDoctor,
  saveInfoDoctor,
} from "../../../services/DoctorService/DoctorService";
import { BACKEND_DOMAIN } from "../../../services/BackendDomain";
import axios from "axios";

// type TPrice = '200.000VND'|'300.000VND'|'400.000VND'|'500.000VND'
export type TInfoDoctor = {
  doctorSelected: string;
  intro: string;
  price: string;
  province: string;
  note: string;
  specialtySelected: string;
  hospitalSelected: string;
};

const initDoctor: TInfoDoctor = {
  doctorSelected: "",
  intro: "",
  price: "",
  province: "",
  note: "",
  specialtySelected: "",
  hospitalSelected: "",
};

export default function ManageDoctors() {
  const [infoDoctor, setInfoDoctor] = useState<TInfoDoctor>(initDoctor);
  const { doctors, specialtys, hospitals } = useManageContext();

  console.log(doctors);
  console.log(infoDoctor);

  async function getDataInfoDoctor() {
    try {
      const response = await axios.get(
        `${BACKEND_DOMAIN}/api/get-info-doctor?id=${infoDoctor.doctorSelected}`
      );
      console.log(response);
      if (response.data.doctorInfo.Doctor_Info) {
        const resInfo = response.data.doctorInfo.Doctor_Info;
        console.log(resInfo);
        setInfoDoctor((prev) => {
          return {
            ...prev,
            note: resInfo.note,
            province: resInfo.provinceId,
            specialtySelected: resInfo.specialtyId,
            hospitalSelected: resInfo.clinicId,
            price: resInfo.priceId,
          };
        });
      } else {
        setInfoDoctor((prev) => {
          return {
            ...prev,
            intro: "",
            price: "",
            province: "",
            note: "",
            specialtySelected: "",
            hospitalSelected: "",
          };
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  // function handleSelectDoctor(doctorId: string) {
  //   console.log(doctorId);
  //   setInfoDoctor((prev) => {

  //   });
  // }

  async function handleAddInfoDoctor() {
    const id = uuidv4();
    const addInfoDoctor = { ...infoDoctor, id: id };
    console.log(addInfoDoctor);

    try {
      const response = await saveInfoDoctor(addInfoDoctor);
      // setSpecialtys((prev) => [...prev, addInfoDoctor]);
      // setInfoDoctor(initDoctor);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDataInfoDoctor();
  }, [infoDoctor.doctorSelected]);

  return (
    <Box sx={{ px: 5 }}>
      <Typography
        sx={{ textAlign: "center", fontSize: "30px", fontWeight: 600, mb: 3 }}
      >
        Thông tin bác sĩ
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box>
            <Typography>Chọn bác sĩ</Typography>
            <FormControl fullWidth>
              <Select
                value={infoDoctor.doctorSelected}
                onChange={(e) =>
                  setInfoDoctor({
                    ...infoDoctor,
                    doctorSelected: e.target.value,
                  })
                }
                // onChange={(e) => handleSelectDoctor(e.target.value)}
              >
                {doctors.map((doctor, index) => {
                  return (
                    <MenuItem key={"doctor selected" + index} value={doctor.id}>
                      {doctor.firstName} {doctor.lastName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box>
            <Typography>thong tin gioi thieu</Typography>
            <TextField
              sx={{ width: "100%" }}
              value={infoDoctor.intro}
              onChange={(e) =>
                setInfoDoctor({ ...infoDoctor, intro: e.target.value })
              }
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Typography>chọn giá</Typography>
            <TextField
              sx={{ width: "100%" }}
              value={infoDoctor.price}
              onChange={(e) =>
                setInfoDoctor({ ...infoDoctor, price: e.target.value })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          {/* <Box>
            <Typography>Chọn phương thức thanh toán</Typography>
            <Select
              sx={{ width: "100%" }}
              // value={this.state.selectedPayment}
              // onChange={this.handleChangeSelectDoctorInfo}
              // options={this.state.listPayment}
              // name="selectedPayment"
            />
          </Box> */}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <Typography>Chọn tỉnh thành</Typography>
            <TextField
              sx={{ width: "100%" }}
              value={infoDoctor.province}
              onChange={(e) =>
                setInfoDoctor({ ...infoDoctor, province: e.target.value })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          {/* <Box>
            <Typography>Tên phòng khám</Typography>
            <TextField
              sx={{ width: "100%" }}
              // onChange={(event) => {
              //   this.handleOnChangeText(event, "nameClinic");
              // }}
              // value={this.state.nameClinic}
            ></TextField>
          </Box> */}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* <Box>
            <Typography>Địa chỉ phòng khám</Typography>
            <TextField
              sx={{ width: "100%" }}
              // onChange={(event) => {
              //   this.handleOnChangeText(event, "addressClinic");
              // }}
              // value={this.state.addressClinic}
            ></TextField>
          </Box> */}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <Typography>Note</Typography>
            <TextField
              sx={{ width: "100%" }}
              value={infoDoctor.note}
              onChange={(e) =>
                setInfoDoctor({ ...infoDoctor, note: e.target.value })
              }
            ></TextField>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <Typography>Chọn chuyên khoa</Typography>
            <Select
              value={infoDoctor.specialtySelected}
              fullWidth
              onChange={(e) =>
                setInfoDoctor({
                  ...infoDoctor,
                  specialtySelected: e.target.value,
                })
              }
            >
              {specialtys.map((specialty, index) => {
                return (
                  <MenuItem
                    key={"specialty selected" + index}
                    value={specialty.id}
                  >
                    {specialty.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <Typography>Chọn bệnh viện</Typography>
            <Select
              value={infoDoctor.hospitalSelected}
              fullWidth
              onChange={(e) =>
                setInfoDoctor({
                  ...infoDoctor,
                  hospitalSelected: e.target.value,
                })
              }
            >
              {hospitals.map((hospital, index) => {
                return (
                  <MenuItem
                    key={"hospital selected" + index}
                    value={hospital.id}
                  >
                    {hospital.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Grid>
        <Box>
          {/* <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
          value={this.state.contentMarkdown}
        /> */}
        </Box>
      </Grid>
      <Button variant="contained" onClick={handleAddInfoDoctor} sx={{ mt: 4 }}>
        Save
      </Button>
    </Box>
  );
}

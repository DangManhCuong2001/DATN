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
  getDoctors,
  getInfoDoctor,
  saveInfoDoctor,
} from "../../../services/DoctorService/DoctorService";
import { BACKEND_DOMAIN } from "../../../services/BackendDomain";
import axios from "axios";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import useNotifier from "../../../hooks/useNotifier";
import {
  TDoctor,
  THospital,
  TSpecialty,
} from "../../../context/constants/typeData";
import { getHospital } from "../../../services/HospitalService/HospitalService";
import { getSpecialty } from "../../../services/SpecialtyService/SpecialtyService";

// type TPrice = '200.000VND'|'300.000VND'|'400.000VND'|'500.000VND'
export type TInfoDoctor = {
  doctorSelected: string;
  price: string;
  province: string;
  note: string;
  specialtySelected: string;
  hospitalSelected: string;
  description: string;
  contentHTML: string;
  contentMarkdown: string;
};

const initDoctor: TInfoDoctor = {
  doctorSelected: "",
  price: "",
  province: "",
  note: "",
  specialtySelected: "",
  hospitalSelected: "",
  description: "",
  contentMarkdown: "",
  contentHTML: "",
};

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function ManageDoctors() {
  const [infoDoctor, setInfoDoctor] = useState<TInfoDoctor>(initDoctor);
  // const { specialtys, hospitals } = useManageContext();
  const { notifyError, notifySuccess } = useNotifier();
  const [doctors, setDoctors] = useState<TDoctor[]>([]);
  const [specialtys, setSpecialtys] = useState<TSpecialty[]>([]);
  // const [contentMarkdown, setContentMarkdown] = useState<string>();
  // const [contentHTML, setContentHTML] = useState<string>();
  const [hospitals, setHospitals] = useState<THospital[]>([]);

  async function getDataHospitals() {
    try {
      const response = await getHospital();
      console.log(response);
      setHospitals(response.data.hospitals);
    } catch (err) {
      console.log(err);
    }
  }

  async function getDataSpecialtys() {
    try {
      const response = await getSpecialty();
      console.log(response);
      setSpecialtys(response.data.specialtys);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(doctors);
  console.log(infoDoctor);

  async function getDataDoctors() {
    try {
      const response = await getDoctors();
      console.log(response);
      setDoctors(response);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDataDoctors();
  }, []);

  async function getDataInfoDoctor() {
    try {
      const response = await axios.get(
        `${BACKEND_DOMAIN}/api/get-info-doctor?id=${infoDoctor.doctorSelected}`
      );
      console.log(response);
      if (response.data.doctorInfo.data.Doctor_Info) {
        const resInfo = response.data.doctorInfo.data.Doctor_Info;
        console.log(resInfo);
        setInfoDoctor((prev) => {
          return {
            ...prev,
            note: resInfo.note,
            province: resInfo.provinceId,
            specialtySelected: resInfo.specialtyId,
            hospitalSelected: resInfo.clinicId,
            price: resInfo.priceId,
            description: response.data.doctorInfo.data.Markdown.description,
            contentMarkdown:
              response.data.doctorInfo.data.Markdown.contentMarkdown,
            contentHTML: response.data.doctorInfo.data.Markdown.contentHTML,
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
            contentHTML: "",
            contentMarkdown: "",
            description: "",
          };
        });
      }
    } catch (err) {
      setInfoDoctor((prev) => {
        return {
          ...prev,
          intro: "",
          price: "",
          province: "",
          note: "",
          specialtySelected: "",
          hospitalSelected: "",
          contentHTML: "",
          contentMarkdown: "",
          description: "",
        };
      });
    }
  }
  // function handleSelectDoctor(doctorId: string) {
  //   console.log(doctorId);
  //   setInfoDoctor((prev) => {

  //   });
  // }

  async function handleAddInfoDoctor() {
    const id = uuidv4();
    const addInfoDoctor = {
      ...infoDoctor,
      id: id,
    };
    console.log(addInfoDoctor);

    try {
      const response = await saveInfoDoctor(addInfoDoctor);
      // setSpecialtys((prev) => [...prev, addInfoDoctor]);
      // setInfoDoctor(initDoctor);
      notifySuccess("Thêm thông tin bác sĩ thành công!");
    } catch (err) {
      console.log(err);
      notifyError("Thêm thông tin bác sĩ thất bại!");
    }
  }

  const handleEditorChange = ({
    html,
    text,
  }: {
    html: string;
    text: string;
  }) => {
    setInfoDoctor((prev) => {
      return {
        ...prev,
        contentHTML: html,
        contentMarkdown: text,
      };
    });
    console.log("handleEditorChange", html, text);
  };

  useEffect(() => {
    getDataInfoDoctor();
  }, [infoDoctor.doctorSelected]);

  useEffect(() => {
    getDataHospitals();
    getDataSpecialtys();
  }, []);
  return (
    <Box sx={{ backgroundColor: "#1B2626", borderRadius: "20px", my: 8, p: 3 }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: 600,
          my: 3,
          color: "#95A7AC",
        }}
      >
        Thông tin bác sĩ
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box>
            <Typography sx={{ color: "#95A7AC", mb: 1 }}>
              Chọn bác sĩ
            </Typography>
            <FormControl fullWidth>
              <Select
                value={infoDoctor.doctorSelected}
                onChange={(e) =>
                  setInfoDoctor({
                    ...infoDoctor,
                    doctorSelected: e.target.value,
                  })
                }
                sx={{
                  color: "#95A7AC",

                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#95A7AC",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#95A7AC",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#95A7AC",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "#95A7AC !important",
                  },
                }}
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
            <Typography sx={{ color: "#95A7AC", mb: 1 }}>
              Thông tin giới thiệu chung
            </Typography>
            <TextField
              value={infoDoctor.description}
              onChange={(e) =>
                setInfoDoctor({ ...infoDoctor, description: e.target.value })
              }
              sx={{
                width: "100%",
                color: "white !important",

                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                ".MuiSvgIcon-root ": {
                  fill: "#95A7AC !important",
                },
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Typography sx={{ color: "#95A7AC", mb: 1 }}>Giá</Typography>
            <TextField
              sx={{
                width: "100%",
                color: "#95A7AC",

                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                ".MuiSvgIcon-root ": {
                  fill: "#95A7AC !important",
                },
              }}
              value={infoDoctor.price}
              onChange={(e) =>
                setInfoDoctor({ ...infoDoctor, price: e.target.value })
              }
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Typography sx={{ color: "#95A7AC", mb: 1 }}>Tỉnh thành</Typography>
            <TextField
              sx={{
                width: "100%",
                color: "#95A7AC",

                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                ".MuiSvgIcon-root ": {
                  fill: "#95A7AC !important",
                },
              }}
              value={infoDoctor.province}
              onChange={(e) =>
                setInfoDoctor({ ...infoDoctor, province: e.target.value })
              }
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Typography sx={{ color: "#95A7AC", mb: 1 }}>Note</Typography>
            <TextField
              sx={{
                width: "100%",
                color: "#95A7AC",

                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                ".MuiSvgIcon-root ": {
                  fill: "#95A7AC !important",
                },
              }}
              value={infoDoctor.note}
              onChange={(e) =>
                setInfoDoctor({ ...infoDoctor, note: e.target.value })
              }
            ></TextField>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <Typography sx={{ color: "#95A7AC", mb: 1 }}>
              Chọn chuyên khoa
            </Typography>
            <Select
              value={infoDoctor.specialtySelected}
              fullWidth
              onChange={(e) =>
                setInfoDoctor({
                  ...infoDoctor,
                  specialtySelected: e.target.value,
                })
              }
              sx={{
                color: "#95A7AC",

                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                ".MuiSvgIcon-root ": {
                  fill: "#95A7AC !important",
                },
              }}
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
            <Typography sx={{ color: "#95A7AC", mb: 1 }}>
              Chọn bệnh viện
            </Typography>
            <Select
              value={infoDoctor.hospitalSelected}
              fullWidth
              onChange={(e) =>
                setInfoDoctor({
                  ...infoDoctor,
                  hospitalSelected: e.target.value,
                })
              }
              sx={{
                color: "#95A7AC",

                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#95A7AC",
                },
                ".MuiSvgIcon-root ": {
                  fill: "#95A7AC !important",
                },
              }}
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
        <Grid item xs={12}>
          <Box sx={{ height: "400px" }}>
            <MdEditor
              style={{ height: "400px", width: "100%" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              value={infoDoctor.contentMarkdown}
            />
          </Box>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleAddInfoDoctor} sx={{ mt: 4 }}>
        Save
      </Button>
    </Box>
  );
}

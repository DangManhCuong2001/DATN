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
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

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
  const { doctors, specialtys, hospitals } = useManageContext();
  // const [contentMarkdown, setContentMarkdown] = useState<string>();
  // const [contentHTML, setContentHTML] = useState<string>();

  console.log(doctors);
  console.log(infoDoctor);

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
    } catch (err) {
      console.log(err);
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
            <Typography>Thông tin giới thiệu chung</Typography>
            <TextField
              sx={{ width: "100%" }}
              value={infoDoctor.description}
              onChange={(e) =>
                setInfoDoctor({ ...infoDoctor, description: e.target.value })
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
        <Grid item xs={12}>
          <Box sx={{ height: "200px" }}>
            <MdEditor
              style={{ height: "200px", width: "100%" }}
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

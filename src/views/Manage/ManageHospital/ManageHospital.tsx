import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DividerCustom from "../../../components/DividerCustom/DividerCustom";
import { v4 as uuidv4 } from "uuid";
import CommonUtils from "../../../utils/CommonUtils";
import {
  EditHospital,
  addNewHospital,
} from "../../../services/HospitalService/HospitalService";
import { useManageContext } from "../../../context/manage-context";
import { THospital, TTypeHospital } from "../../../context/constants/typeData";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

type TNewHospital = {
  id: string;
  name: string;
  type: TTypeHospital;
  image: string;
  previewImage: string;
  address: string;
  contentHTML: string;
  contentMarkdown: string;
  description: string;
};

const initNewHospital: TNewHospital = {
  id: "",
  name: "",
  type: "benhVienCong",
  image: "",
  previewImage: "",
  address: "",
  contentHTML: "",
  contentMarkdown: "",
  description: "",
};

export default function ManageHospital() {
  const [show, setShow] = useState<boolean>(false);
  const [newHospital, setNewHospital] = useState<TNewHospital>(initNewHospital);
  const [editing, setEdit] = useState<boolean>(false);
  // const [previewImage, setPreviewImage] = useState<string>("");
  const { hospitals, setHospitals } = useManageContext();
  console.log(newHospital);
  console.log(hospitals);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleEditorChange = ({
    html,
    text,
  }: {
    html: string;
    text: string;
  }) => {
    setNewHospital((prev) => {
      return {
        ...prev,
        contentHTML: html,
        contentMarkdown: text,
      };
    });
    console.log("handleEditorChange", html, text);
  };

  const handleChangeImage = async (event: any) => {
    const data = event.target.files;
    const file = data[0];
    console.log(file);
    if (file) {
      const base64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      setNewHospital({
        ...newHospital,
        image: base64 as string,
        previewImage: objectUrl,
      });
      // setPreviewImage(objectUrl);
    }
  };

  const onEdit = (HospitalEdit: any) => {
    setEdit(true);
    if (editing == true) {
      setNewHospital({ ...HospitalEdit, HospitalEdit });
      handleShow();
      console.log("HospitalEdit", HospitalEdit);
    }
  };

  async function handleAddHospital() {
    setShow(true);
    const id = uuidv4();
    const addHospital = { ...newHospital, id: id };
    console.log(addHospital);

    try {
      const response = await addNewHospital(addHospital);
      setHospitals((prev) => [...prev, addHospital]);
      // setNewHospital(initNewHospital);

      setShow(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateHospital() {
    setEdit(false);
    let id = newHospital.id;
    try {
      const response = await EditHospital(newHospital);
      setHospitals(hospitals.map((i) => (i.id === id ? newHospital : i)));
    } catch (err) {
      console.log(err);
    }

    setNewHospital(initNewHospital);

    setShow(false);
  }

  async function handleDeleteHospital(currentHospital: THospital) {
    try {
      //   const response = await DeleteSpeciality(currentSpeciality.id as string);
      setHospitals(hospitals.filter((i) => i.id !== currentHospital.id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box>
      <Typography
        sx={{ textAlign: "center", fontSize: "20px", fontWeight: 600, mb: 5 }}
      >
        Quản lý bệnh viện
      </Typography>
      <Button variant="contained" onClick={handleShow} sx={{ mb: 3 }}>
        Thêm bệnh viện
      </Button>
      <Box>
        <Grid container>
          <Grid item xs={1}>
            #
          </Grid>
          <Grid item xs={1.8}>
            Tên bệnh viện
          </Grid>
          <Grid item xs={1.8}>
            Kiểu bệnh viện
          </Grid>
          <Grid item xs={1.8}>
            Địa chỉ
          </Grid>
          <Grid item xs={1.8}>
            Hình ảnh
          </Grid>
          <Grid item xs={1.8}>
            Action
          </Grid>
        </Grid>
        <DividerCustom />
        <Box>
          {hospitals.length > 0 ? (
            hospitals.map((hospital, index) => {
              // const xx = hospital.image;
              // console.log(xx);
              // const b64 = new Buffer(xx).toString('base64')
              // const objectUrl = URL.createObjectURL(hospital.image);

              return (
                <>
                  <Grid container key={"hospital" + hospital}>
                    <Grid item xs={1}>
                      {index + 1}
                    </Grid>
                    <Grid item xs={1.8}>
                      {hospital.name}
                    </Grid>
                    <Grid item xs={1.8}>
                      {hospital.type}
                    </Grid>
                    <Grid item xs={1.8}>
                      {hospital.address}
                    </Grid>
                    <Grid item xs={1.8}>
                      {/* {hospital.image} */}
                      <Box
                        sx={{
                          backgroundImage: `url(${hospital.image})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          width: "120px",
                          height: "120px",
                        }}
                      ></Box>
                    </Grid>
                    <Grid item xs={1.8}>
                      <Button
                        variant="outlined"
                        onClick={() => onEdit(hospital)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outlined"
                        title="Delete hospital"
                        onClick={() => handleDeleteHospital(hospital)}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                  <DividerCustom />
                </>
              );
            })
          ) : (
            <Box>
              <Typography>No Hospital found.</Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Dialog open={show} onClose={handleClose}>
        <DialogContent>
          <Typography sx={{ fontWeight: 600, textAlign: "center" }}>
            Bệnh viện
          </Typography>
        </DialogContent>
        <Box sx={{ px: 3, py: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Typography>Tên bệnh viện</Typography>
            <TextField
              value={newHospital.name}
              onChange={(e) =>
                setNewHospital({ ...newHospital, name: e.target.value })
              }
              sx={{ width: "100%" }}
            ></TextField>
          </Box>
          <Box>
            <Typography>Kiểu bệnh viện</Typography>
            <FormControl fullWidth>
              <Select
                value={newHospital.type}
                onChange={(e) =>
                  setNewHospital({
                    ...newHospital,
                    type: e.target.value as TTypeHospital,
                  })
                }
                // onChange={(e) => handleSelectDoctor(e.target.value)}
              >
                <MenuItem value={"benhVienCong"}>Bệnh viện công</MenuItem>
                <MenuItem value={"benhVienTu"}>Bệnh viện tư</MenuItem>
                <MenuItem value={"phongkham"}>Phòng khám</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography>Địa chỉ</Typography>
            <TextField
              value={newHospital.address}
              onChange={(e) =>
                setNewHospital({ ...newHospital, address: e.target.value })
              }
              sx={{ width: "100%" }}
            ></TextField>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography>Thông tin giới thiệu chung</Typography>
            <TextField
              sx={{ width: "100%" }}
              value={newHospital.description}
              onChange={(e) =>
                setNewHospital({ ...newHospital, description: e.target.value })
              }
              multiline
            />
          </Box>
          <Box>
            <Typography>Tải ảnh lên</Typography>
            <TextField
              type="file"
              onChange={(e) => {
                handleChangeImage(e);
              }}
              sx={{ mb: 1 }}
            ></TextField>
            {/* <Box
              sx={{
                backgroundImage: `url(${newHospital.previewImage})`,
                backgroundRepeat: "no-repeat",

                width: "100%",
                height: "200px",
              }}
            ></Box> */}
          </Box>

          <Box>
            <MdEditor
              style={{ height: "300px", width: "100%" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              value={newHospital.contentMarkdown}
            />
          </Box>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="warning">
              Close
            </Button>
            {editing === true ? (
              <Button
                color="success"
                onClick={() => handleUpdateHospital()}
                variant="contained"
              >
                Update
              </Button>
            ) : (
              <Button
                color="success"
                onClick={handleAddHospital}
                variant="contained"
              >
                Add
              </Button>
            )}
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

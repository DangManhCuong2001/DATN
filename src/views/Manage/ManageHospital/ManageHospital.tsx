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
import { useEffect, useState } from "react";
import DividerCustom from "../../../components/DividerCustom/DividerCustom";
import { v4 as uuidv4 } from "uuid";
import CommonUtils from "../../../utils/CommonUtils";
import {
  DeleteHospital,
  EditHospital,
  addNewHospital,
  getHospital,
} from "../../../services/HospitalService/HospitalService";
import { useManageContext } from "../../../context/manage-context";
import { THospital, TTypeHospital } from "../../../context/constants/typeData";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import useNotifier from "../../../hooks/useNotifier";

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
  const { notifyError, notifySuccess } = useNotifier();

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
      console.log(response);
      if (response.data.errCode == 1) {
        notifyError("Vui lòng điền đầy đủ thông tin!");
      } else {
        getDataHospitals();
        setShow(false);

        notifySuccess("Thêm bệnh viện thành công!");
      }
      // setHospitals((prev) => [...prev, addHospital]);

      // setNewHospital(initNewHospital);
    } catch (err) {
      console.log(err);
      notifyError("Thêm bệnh viện thất bại!");
    }
  }

  async function handleUpdateHospital() {
    setEdit(false);
    let id = newHospital.id;
    try {
      const response = await EditHospital(newHospital);
      if (response.data.errCode == 1) {
        notifyError("Vui lòng điền đầy đủ thông tin!");
      } else {
        setShow(false);
        getDataHospitals();
        notifySuccess("Cập nhật bệnh viện thành công!");
      }
      // setHospitals(hospitals.map((i) => (i.id === id ? newHospital : i)));
    } catch (err) {
      console.log(err);

      notifyError("Cập nhật bệnh viện thất bại!");
    }

    setNewHospital(initNewHospital);
  }

  async function handleDeleteHospital(hospitalId: string) {
    try {
      const response = await DeleteHospital(hospitalId);
      if (response.data.message == "Delete success") {
        getDataHospitals();
        notifySuccess("Xoá bệnh viện thành công!");
      } else {
        notifyError("Xoá bệnh viện thất bại!");
      }
    } catch (err) {
      console.log(err);
      notifyError("Xoá bệnh viện thất bại!");
    }
  }

  useEffect(() => {
    getDataHospitals();
  }, []);
  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: 600,
          my: 3,
          color: "#95A7AC",
        }}
      >
        Thông tin bệnh viện
      </Typography>
      <Button variant="contained" onClick={handleShow} sx={{ mb: 3 }}>
        Thêm bệnh viện
      </Button>
      <Box>
        <Grid container>
          <Grid item xs={1}>
            <Typography
              sx={{
                color: "#95A7AC",
              }}
            >
              #
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                color: "#95A7AC",
              }}
            >
              Tên bệnh viện
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              sx={{
                color: "#95A7AC",
              }}
            >
              Kiểu bệnh viện
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              sx={{
                color: "#95A7AC",
              }}
            >
              Địa chỉ
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              sx={{
                color: "#95A7AC",
              }}
            >
              Hình ảnh
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              sx={{
                color: "#95A7AC",
              }}
            >
              Action
            </Typography>
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
                      <Typography
                        sx={{
                          color: "#95A7AC",
                        }}
                      >
                        {index + 1}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        sx={{
                          color: "#95A7AC",
                        }}
                      >
                        {hospital.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        sx={{
                          color: "#95A7AC",
                        }}
                      >
                        {hospital.type}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        sx={{
                          color: "#95A7AC",
                        }}
                      >
                        {hospital.address}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {/* {hospital.image} */}
                      {/* <Box
                        sx={{
                          backgroundImage: `url(${hospital.image})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          width: "120px",
                          height: "120px",
                        }}
                      ></Box> */}
                      <img
                        src={hospital.image}
                        style={{ width: "120px", height: "120px" }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        onClick={() => onEdit(hospital)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outlined"
                        title="Delete hospital"
                        onClick={() => handleDeleteHospital(hospital.id)}
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

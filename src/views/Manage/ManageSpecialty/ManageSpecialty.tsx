import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DividerCustom from "../../../components/DividerCustom/DividerCustom";
import { v4 as uuidv4 } from "uuid";
import {
  addNewSpecialty,
  DeleteSpecialty,
  EditSpeciality,
  getSpecialty,
} from "../../../services/SpecialtyService/SpecialtyService";
import CommonUtils from "../../../utils/CommonUtils";
import { useManageContext } from "../../../context/manage-context";
import { TSpecialty } from "../../../context/constants/typeData";
import useNotifier from "../../../hooks/useNotifier";

const initNewSpecialty: TSpecialty = {
  id: "",
  name: "",
  image: "",
  previewImage: "",
};

export default function ManageSpecialty() {
  const [show, setShow] = useState<boolean>(false);
  const [newSpecialty, setNewSpecialty] =
    useState<TSpecialty>(initNewSpecialty);
  const [editing, setEdit] = useState<boolean>(false);
  const { notifyError, notifySuccess } = useNotifier();
  // const [previewImage, setPreviewImage] = useState<string>("");
  const [specialtys, setSpecialtys] = useState<TSpecialty[]>([]);

  console.log(specialtys);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  async function getDataSpecialtys() {
    try {
      const response = await getSpecialty();
      console.log(response);
      setSpecialtys(response.data.specialtys);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChangeImage = async (event: any) => {
    const data = event.target.files;
    const file = data[0];
    console.log(file);
    if (file) {
      const base64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      setNewSpecialty({
        ...newSpecialty,
        image: base64 as string,
        previewImage: objectUrl,
      });
      // setPreviewImage(objectUrl);
    }
  };

  const onEdit = (SpecialtyEdit: any) => {
    setEdit(true);
    if (editing == true) {
      setNewSpecialty({ ...SpecialtyEdit, SpecialtyEdit });
      handleShow();
      console.log("SpecialtyEdit", SpecialtyEdit);
    }
  };

  async function handleAddSpecialty() {
    setShow(true);
    const id = uuidv4();
    const addSpecialty = { ...newSpecialty, id: id };
    console.log(addSpecialty);

    try {
      const response = await addNewSpecialty(addSpecialty);
      notifySuccess("Thêm chuyên khoa thành công");
      // setSpecialtys((prev) => [...prev, addSpecialty]);
      setNewSpecialty(initNewSpecialty);

      setShow(false);
    } catch (err) {
      console.log(err);
      notifyError("Thêm chuyên khoa thất bại");
    }
  }

  async function handleUpdateSpecialty() {
    setEdit(false);
    // const newSpecialty2 = { ...newSpecialty, id: id };
    try {
      console.log(newSpecialty);
      const response = await EditSpeciality(newSpecialty);
      console.log(response);
      if (response.data.errMessage == "Missing parameter") {
        notifyError("Vui lòng điền đầy đủ thông tin!");
      } else {
        notifySuccess("Thay đổi thông tin chuyên khoa thành công!");
        getDataSpecialtys();
        setShow(false);
      }
    } catch (err) {
      console.log(err);
    }

    setNewSpecialty(initNewSpecialty);
  }

  async function handleDeleteSpecialty(specialtyId: string) {
    try {
      const response = await DeleteSpecialty(specialtyId);
      notifySuccess("Xoá chuyên khoa thành công!");
      getDataSpecialtys();
    } catch (err) {
      console.log(err);
      notifyError("Xoá chuyên khoa thất bại!");
    }
  }

  useEffect(() => {
    getDataSpecialtys();
  }, []);

  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: 600,
          my: 5,
          color: "#95A7AC",
        }}
      >
        Quản lý chuyên khoa
      </Typography>
      <Button variant="contained" onClick={handleShow} sx={{ mb: 3 }}>
        Thêm chuyên khoa
      </Button>
      <Box>
        <Grid container>
          <Grid item xs={3}>
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
              Tên chuyên khoa
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                color: "#95A7AC",
              }}
            >
              Hình ảnh
            </Typography>
          </Grid>
          <Grid item xs={3}>
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
          {specialtys.length > 0 ? (
            specialtys.map((specialty, index) => {
              // const xx = specialty.image;
              // console.log(xx);
              // const b64 = new Buffer(xx).toString('base64')
              // const objectUrl = URL.createObjectURL(specialty.image);

              return (
                <>
                  <Grid container key={"specialty" + specialty}>
                    <Grid item xs={3}>
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
                        {specialty.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      {/* {specialty.image} */}
                      <Box
                        sx={{
                          backgroundImage: `url(${specialty.image})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          width: "120px",
                          height: "120px",
                        }}
                      ></Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="outlined"
                        onClick={() => onEdit(specialty)}
                        sx={{ mr: 2 }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outlined"
                        title="Delete specialty"
                        onClick={() => handleDeleteSpecialty(specialty.id)}
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
              <Typography>No Specialty found.</Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Dialog open={show} onClose={handleClose}>
        <DialogContent>
          <Typography sx={{ fontWeight: 600, textAlign: "center" }}>
            Chuyên khoa
          </Typography>
        </DialogContent>
        <Box sx={{ px: 3, py: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Typography>Tên chuyên khoa</Typography>
            <TextField
              value={newSpecialty.name}
              onChange={(e) =>
                setNewSpecialty({ ...newSpecialty, name: e.target.value })
              }
              sx={{ width: "100%" }}
            ></TextField>
          </Box>
          <Box>
            <Typography>Tải ảnh lên</Typography>
            <TextField
              type="file"
              onChange={(e) => {
                handleChangeImage(e);
              }}
            ></TextField>
            <Box
              sx={{
                backgroundImage: `url(${newSpecialty.previewImage})`,
                backgroundRepeat: "no-repeat",

                width: "100%",
                height: "200px",
              }}
            ></Box>
          </Box>
          <Box>
            {/* <MdEditor
            style={{ height: "400px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.descriptionMarkdown}
          /> */}
          </Box>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="warning">
              Close
            </Button>
            {editing === true ? (
              <Button
                color="success"
                onClick={handleUpdateSpecialty}
                variant="contained"
              >
                Update
              </Button>
            ) : (
              <Button
                color="success"
                onClick={handleAddSpecialty}
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

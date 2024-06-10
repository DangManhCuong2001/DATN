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
  getSpecialty,
} from "../../../services/SpecialtyService/SpecialtyService";
import CommonUtils from "../../../utils/CommonUtils";
import { useManageContext } from "../../../context/manage-context";
import { TSpecialty } from "../../../context/constants/typeData";

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
  const { specialtys, setSpecialtys } = useManageContext();
  // const [previewImage, setPreviewImage] = useState<string>("");

  console.log(specialtys);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

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
      setSpecialtys((prev) => [...prev, addSpecialty]);
      setNewSpecialty(initNewSpecialty);

      setShow(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateSpecialty() {
    setEdit(false);
    let id = newSpecialty.id;
    try {
      //   const response = await EditSpeciality(newSpecialty);
      setSpecialtys(specialtys.map((i) => (i.id === id ? newSpecialty : i)));
    } catch (err) {
      console.log(err);
    }

    setNewSpecialty(initNewSpecialty);

    setShow(false);
  }

  async function handleDeleteSpecialty(currentSpecialty: TSpecialty) {
    try {
      //   const response = await DeleteSpeciality(currentSpeciality.id as string);
      setSpecialtys(specialtys.filter((i) => i.id !== currentSpecialty.id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box>
      <Typography
        sx={{ textAlign: "center", fontSize: "20px", fontWeight: 600, mb: 5 }}
      >
        Quản lý chuyên khoa
      </Typography>
      <Button variant="contained" onClick={handleShow} sx={{ mb: 3 }}>
        Thêm chuyên khoa
      </Button>
      <Box>
        <Grid container>
          <Grid item xs={3}>
            #
          </Grid>
          <Grid item xs={3}>
            Tên chuyên khoa
          </Grid>
          <Grid item xs={3}>
            Hình ảnh
          </Grid>
          <Grid item xs={3}>
            Action
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
                      {index + 1}
                    </Grid>
                    <Grid item xs={3}>
                      {specialty.name}
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
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outlined"
                        title="Delete specialty"
                        onClick={() => handleDeleteSpecialty(specialty)}
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
                onClick={() => handleUpdateSpecialty()}
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

export type TTypeHospital = "benhVienCong" | "benhVienTu" | "phongKham";
export type TDoctor = {
  id: string;
  firstName: string;
  lastName: string;
  doctorInfoId: string;
};

export type TSpecialty = {
  id: string;
  name: string;
  image: string;
  previewImage: string;
};

export type THospital = {
  id: string;
  name: string;
  type: TTypeHospital;
  image: string;
  previewImage: string;
  address: string;
};

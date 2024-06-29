import React from "react";
import Banner from "./Banner/Banner";
import Statistical from "./Statistical/Statistical";
import TypicalHospital from "./TypicalHospital/TypicalHospital";
import BannerQuickBook from "./BannerQuickBook/BannerQuickBook";
import Footer from "./Footer/Footer";
import TypicalSpeciality from "./TypicalSpeciality/TypicalSpeciality";

export default function HomePage() {
  return (
    <>
      <Banner />
      <Statistical />
      <TypicalSpeciality />
      <TypicalHospital />
      <BannerQuickBook />
      {/* <Footer /> */}
    </>
  );
}

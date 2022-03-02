import BlackLogo from "assets/images/black-logo.png";
import WhiteLogo from "assets/images/white-logo.png";
import { useSelector } from "react-redux";

const Footer = () => {
  const { isDarkMode } = useSelector(({ ui }) => ui);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        margin: "100px 0",
        padding: "0 80px 80px 0",
      }}
    >
      <h1
        style={{
          margin: 0,
          marginRight: "40px !important",
          color: !isDarkMode ? "#fff" : "#000",
        }}
      >
        Powered By
      </h1>

      {!isDarkMode ? (
        <img src={WhiteLogo} alt="" style={{ width: 150, height: "auto" }} />
      ) : (
        <img src={BlackLogo} alt="" style={{ width: 150, height: "auto" }} />
      )}
    </div>
  );
};

export default Footer;

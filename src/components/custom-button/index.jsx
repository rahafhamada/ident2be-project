// Styles Elements
import { useSelector } from "react-redux";
import { CustomButtonWrapper } from "./styles";

const CustomButton = ({ children, text, type, style }) => {
  const {mainColor} = useSelector(({ui}) => ui)
  
  return (
    <CustomButtonWrapper  maincolor={mainColor} type={type} style={{ ...style }}>
      {children} <span>{text}</span>
    </CustomButtonWrapper>
  );
};

export default CustomButton;

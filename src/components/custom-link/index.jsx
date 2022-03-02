import { CustomLinkWrapper } from "./styles";

const CustomLink = ({ children, to, style }) => {
  return (
    <CustomLinkWrapper to={to} style={{ ...style }}>
      {children}
    </CustomLinkWrapper>
  );
};

export default CustomLink;

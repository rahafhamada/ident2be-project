import { useState } from "react";
import { Link } from "react-router-dom";
import { Switch } from "antd";
import { ChromePicker } from "react-color";
import { Modal } from "antd";
import { CustomContainer } from "../../contants";
import CustomButton from "../custom-button";
import {
  NavbarContent,
  NavbarSearchWrapper,
  NavbarWrapper,
  NavbarSearchSearchCircle,
  NavbarSearchInput,
  NavbarSearchFilter,
} from "./styles";
import { BsFillMoonFill, BsFilter, BsSunFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setApMainColorAction, setDarkMode } from "../../redux/ui/ui.action";

const Navbar = () => {
  const { mainColor, isDarkMode } = useSelector(({ ui }) => ui);
  const [color, setColor] = useState(mainColor);
  const [showColorModal, setShowColorModal] = useState(false);
  const dispatch = useDispatch();
  const onChange = checked => {
    dispatch(setDarkMode(checked));
  };

  const handleChangeComplete = color => {
    setColor(color.hex);
  };

  const handlePickColor = () => {
    dispatch(setApMainColorAction(color));
    setShowColorModal(false);
  };

  return (
    <NavbarWrapper>
      <CustomContainer>
        <NavbarContent maincolor={mainColor}>
          <Link to="/">Logo</Link>
          <NavbarSearchWrapper>
            <NavbarSearchSearchCircle maincolor={mainColor}>
              <AiOutlineSearch />
            </NavbarSearchSearchCircle>
            <NavbarSearchInput type="text" placeholder="Search..." />
            <NavbarSearchFilter maincolor={mainColor}>
              <BsFilter />
            </NavbarSearchFilter>
          </NavbarSearchWrapper>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              onClick={() => setShowColorModal(true)}
              style={{
                marginRight: 15,
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                cursor: "pointer",
                backgroundColor: mainColor,
              }}
            />

            <Switch
              style={{ marginRight: 15 }}
              checkedChildren={<BsSunFill style={{ color: "yellow" }} />}
              unCheckedChildren={<BsFillMoonFill style={{ color: "yellow" }} />}
              checked={isDarkMode ? false : true}
              onChange={onChange}
            />
            <CustomButton text="Logout" type="button" />
          </div>
        </NavbarContent>
        <Modal
          title="Please, Pick your favorite color!"
          style={{ top: 20 }}
          visible={showColorModal}
          centered
          onOk={handlePickColor}
          onCancel={() => setShowColorModal(false)}
          okText="Save Color & Exit"
          bodyStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChromePicker
            color={color}
            onChange={color => setColor(color.hex)}
            onChangeComplete={handleChangeComplete}
          />
        </Modal>
      </CustomContainer>
    </NavbarWrapper>
  );
};

export default Navbar;

import { useState } from "react";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/material";
import PageSidebar from "components/page-sidebar/index";
import Snackbar from "@mui/material/Snackbar";
import { useSelector } from "react-redux";
import { PersonPageNabNavigator, PersonPageWrapper } from "./styles";

import personTabs from "./utils/tabs";

const ProductsPage = () => {
  const { mainColor } = useSelector(({ ui }) => ui);

  const [activeTab, setActiveTab] = useState("add-person");
  const [personCreated, setPersonCreated] = useState(false);

  const personCreatedHandler = () => {
    setPersonCreated(true);
  };

  return (
    <>
      <div className="container">
        <PersonPageWrapper>
          <PageSidebar />

          <div>
            <Box sx={{ width: "100%" }}>
              <PersonPageNabNavigator color={mainColor}>
                {personTabs.map(({ name, icon, title }, idx) => (
                  <li
                    // className="active"
                    className={activeTab === name ? "active" : ""}
                    key={idx}
                    onClick={() => setActiveTab(name)}
                  >
                    {icon}
                    <Tooltip title={title} placement="bottom">
                      <span className="name">{title}</span>
                    </Tooltip>
                  </li>
                ))}
              </PersonPageNabNavigator>

              <div className="main-content">
                {personTabs.map(
                  ({ name, component }, idx) =>
                    activeTab === name && <div key={idx}>{component}</div>
                )}
              </div>
            </Box>
          </div>

          <Snackbar
            open={personCreated}
            autoHideDuration={6000}
            onClose={personCreatedHandler}
            message={`Persoon wordt teogevoegd`}
          />
        </PersonPageWrapper>
      </div>
    </>
  );
};

export default ProductsPage;

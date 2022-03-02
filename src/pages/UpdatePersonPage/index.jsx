// ** Imports
import { useState, memo, useEffect } from "react";
import { Tooltip } from "antd";

import UpdatePersonTab from "components/update-person-tab";
import UpdatePersonAddressesTab from "components/update-person-address-tab";
import UpdatePersonFunctieTab from "components/update-person-functie-tab";
import UpdatePersonIdentificatieTab from "components/update-person-identificatie-tab";

// ** Redux Stuff
import { useSelector, useDispatch } from "react-redux";
import PageSidebar from "components/page-sidebar";
import { PersonPageWrapper } from "components/add-person-tab/styles";
import personTabs from "./utils/tabs";
import { PersonPageNabNavigator } from "pages/AddPersonPage/styles";
import { Box } from "@mui/material";
import { fetchCompaniesList } from "redux/company/company.actions";
import { getSinglePerson } from "redux/persons/persons.actions";
import { useParams } from "react-router-dom";

const UpdatePersonPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // ** State
  const [activeTab, setActiveTab] = useState("update-person");
  const { mainColor } = useSelector(({ ui }) => ui);

  const [tabOne, setTabOne] = useState({
    birthname: "",
    birthnameprep: "",
    corrprefix: "",
    enddate: "",
    firstname: "",
    fullname: "FULL NAME",
    gender: "",
    initials: "",
    isactive: false,
    misc: "",
    nameprep: "",
    nationality: "",
    persno: "",
    persontype: "",
    remark: "",
    startdate: "",
    surname: "",
  });

  useEffect(() => {
    dispatch(fetchCompaniesList());
    dispatch(getSinglePerson(id));
  }, [dispatch, id]);

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
                {activeTab === "update-person" && (
                  <UpdatePersonTab tabOne={tabOne} setTabOne={() => setTabOne()} />
                )}
                {activeTab === "create-person-address" && <UpdatePersonAddressesTab />}
                {activeTab === "create-person-functie" && <UpdatePersonFunctieTab />}
                {activeTab === "create-person-identificatie" && <UpdatePersonIdentificatieTab />}
              </div>
            </Box>
          </div>
        </PersonPageWrapper>
      </div>
    </>
  );
};

export default memo(UpdatePersonPage);

import { Collapse } from "antd";
import Sticky from "react-sticky-el";

import { AiOutlineHome, AiOutlineUser, AiOutlineStar } from "react-icons/ai";

import {
  PersonPageLeftSide,
  PersonPageLeftSideCollapse,
  PersonPageLeftSideCollapseLink,
  PersonPageLeftSidePerson,
} from "./styles";
import Person from "../../assets/images/person.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "components/loading-spinner";
import { FaAngleDown } from "react-icons/fa";

const { Panel } = Collapse;

const PageSidebar = () => {
  const { mainColor } = useSelector(({ ui }) => ui);

  const { loading, data, error } = useSelector(({ company }) => company);

  const text = `
  Groep toevoegen

  `;

  const callback = key => {
    // console.log(key);
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  if (loading) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        <Sticky topOffset={300}>
          <PersonPageLeftSide>
            <PersonPageLeftSidePerson>
              <img src={Person} alt="person" />
              <div>Rahaf Hammada</div>
              <div>info@gmail.com</div>
            </PersonPageLeftSidePerson>

            <PersonPageLeftSideCollapse>
              <PersonPageLeftSideCollapseLink to="/">
                <AiOutlineHome style={{ color: mainColor }} />
                <span>Home</span>
              </PersonPageLeftSideCollapseLink>
              <Collapse
                onChange={callback}
                ghost
                expandIcon={() => <FaAngleDown style={{ color: mainColor, fontSize: "1.2rem" }} />}
              >
                <Panel header="Companies" key="1">
                  {data?.data?.map(company => (
                    <div style={{ marginBottom: 5 }} key={company?.id}>
                      <Link to={`/company/${company?.id}`} style={{ color: "#aaa !important" }}>
                        {company?.name}
                      </Link>
                    </div>
                  ))}
                </Panel>
              </Collapse>
              <Collapse
                defaultActiveKey={["1"]}
                onChange={callback}
                ghost
                expandIcon={() => <FaAngleDown style={{ color: mainColor, fontSize: "1.2rem" }} />}
              >
                <Panel header="Personen" key="1">
                  <div style={{ marginBottom: 5 }}>
                    <Link to="/persons" style={{ color: "#aaa !important" }}>
                      Personen
                    </Link>
                  </div>
                  <div style={{ marginBottom: 5 }}>
                    <Link to="/add-person" style={{ color: "#aaa !important" }}>
                      Persoon Toevoegen
                    </Link>
                  </div>
                  <div style={{ marginBottom: 5 }}>
                    <Link to="/test" style={{ color: "#aaa !important" }}>
                      {text}
                    </Link>
                  </div>
                  <div style={{ marginBottom: 5 }}>
                    <Link to="/" style={{ color: "#aaa !important" }}>
                      {text}
                    </Link>
                  </div>
                </Panel>
              </Collapse>

              <PersonPageLeftSideCollapseLink to="/">
                <AiOutlineUser style={{ color: mainColor }} />
                <span>Groepen</span>
              </PersonPageLeftSideCollapseLink>

              <PersonPageLeftSideCollapseLink to="/">
                <AiOutlineStar style={{ color: mainColor }} />
                <span>Verbruik</span>
              </PersonPageLeftSideCollapseLink>
            </PersonPageLeftSideCollapse>
          </PersonPageLeftSide>
        </Sticky>
      </>
    );
  }
};

export default PageSidebar;

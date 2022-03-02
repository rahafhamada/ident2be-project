import { useState } from "react";
import { useSelector } from "react-redux";
import identificatieTabs from "./identificatieTabs";

const styles = {
  tabsGrid: {
    display: "grid",
    gap: 20,
    gridTemplateColumns: "200px 1fr",
  },
};

const AddPersonIdentificatieTab = () => {
  const { mainColor } = useSelector(({ ui }) => ui);

  const [activeTab, setActiveTab] = useState("RFID-kaart");

  return (
    <div className="" style={styles.tabsGrid}>
      <ul>
        {identificatieTabs.map(({ name, icon, title }, idx) => (
          <li
            // className="active"
            className={`${
              activeTab === name ? "active" : ""
            } flex items-center mb-3 p-2 cursor-pointer rounded-sm`}
            key={idx}
            onClick={() => setActiveTab(name)}
            style={{
              backgroundColor: activeTab === name ? mainColor : "#b3b3b3",
              color: activeTab === name ? "#fff" : "#000",
            }}
          >
            {icon}
            <span className="name">{title}</span>
          </li>
        ))}
      </ul>
      <div className="main-content">
        {identificatieTabs.map(
          ({ name, component }, idx) => activeTab === name && <div key={idx}>{component}</div>
        )}
      </div>
    </div>
  );
};

export default AddPersonIdentificatieTab;

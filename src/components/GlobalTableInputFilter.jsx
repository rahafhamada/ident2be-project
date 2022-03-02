import { ShowFilterMenu } from "./custom-table/styles";
import { BsFilter } from "react-icons/bs";
import { useState } from "react";
import { Modal } from "antd";

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px auto",
  },
  input: {
    padding: "7px 5px 7px 20px",
    width: "300px",
    borderRadius: "20px",
    outline: "none",
    fontSize: ".8rem",
    fontStyle: "italic",
  },
};
const GlobalTableInputFilter = ({ filter, setFilter, children }) => {
  const [showColorModal, setShowColorModal] = useState(false);

  const handlePickColor = () => {
    setShowColorModal(false);
  };

  return (
    <div style={styles.wrapper}>
      <input
        style={styles.input}
        type="text"
        value={filter || ""}
        onChange={e => setFilter(e.target.value)}
        placeholder="Search by Name, Email, Gender..."
      />

      <ShowFilterMenu onClick={() => setShowColorModal(true)}>
        <BsFilter />
      </ShowFilterMenu>

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
        {children}
      </Modal>
    </div>
  );
};

export default GlobalTableInputFilter;

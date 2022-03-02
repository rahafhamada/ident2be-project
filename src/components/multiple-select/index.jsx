import { Select } from "antd";

const { Option } = Select;

const MultipleSelect = ({ loading, setSelected, arr, defaultArr }) => {
  const renderChildren = () => {
    return arr?.map(({ id, name, code }) => (
      <Option key={id} value={code}>
        {name}
      </Option>
    ));
  };

  const handleChange = value => {
    setSelected(value);
  };

  return (
    <>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        defaultValue={defaultArr}
        onChange={handleChange}
        loading={loading}
      >
        {renderChildren()}
      </Select>
    </>
  );
};

export default MultipleSelect;

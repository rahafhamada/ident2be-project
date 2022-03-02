import React, { useState } from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Modal, Tooltip } from "antd";
import { useTable, useRowSelect } from "react-table";
import { BsTrash } from "react-icons/bs";
import { MdPerson, MdLabelOutline } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillCheckSquare, AiOutlineCheckSquare } from "react-icons/ai";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import {
  CharSelectWrapper,
  InputTrigger,
  SelectedTableHeader,
  TablePersonsChar,
} from "./styles";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

// ** Generate a random color
const randomColorBg = () => {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  return "rgb(" + x + "," + y + "," + z + ")";
};

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <label className="container">
          <input type="checkbox" ref={resolvedRef} {...rest} />
          <span className="checkmark"></span>
        </label>
      </>
    );
  }
);

const SelectedPersonsTable = ({ columns, data }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSeeMoreMenu, setShowSeeMoreMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const seeMoreMenuOpenHandler = event => {
    setAnchorEl(event.currentTarget);
  };
  const seeMoreMenuCloseHandler = () => {
    setAnchorEl(null);
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div style={{ padding: "0 10px" }}>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <InputTrigger>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </InputTrigger>
          ),
        },
        ...columns,
      ]);
    }
  );

  // Render the UI for your table
  return (
    <>
      {Object.keys(selectedRowIds).length ? (
        <SelectedTableHeader className="selected-table-header">
          {headerGroups.map(headerGroup => (
            <div>
              {headerGroup.headers.slice(0, 1).map((column, idx) => (
                <div key={idx} style={{ marginRight: 20 }}>
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
          <Tooltip
            placement="bottom"
            title={`Delete ${Object.keys(selectedRowIds).length} Person`}
          >
            <div
              onClick={() => setShowDeleteModal(true)}
              style={{
                cursor: "pointer",
                color: "red",
                marginRight: 20,
                fontSize: 20,
              }}
            >
              <BsTrash />
            </div>
          </Tooltip>
          <Tooltip
            placement="bottom"
            title={`Set ${Object.keys(selectedRowIds).length} Person Active`}
          >
            <div
              onClick={() => setShowDeleteModal(true)}
              style={{
                cursor: "pointer",
                color: "#4698f1",
                marginRight: 20,
                fontSize: 20,
              }}
            >
              <AiFillCheckSquare />
            </div>
          </Tooltip>
          <Tooltip
            placement="bottom"
            title={`Set ${Object.keys(selectedRowIds).length} Person Inactive`}
          >
            <div
              onClick={() => setShowDeleteModal(true)}
              style={{
                cursor: "pointer",
                color: "#464242",
                marginRight: 20,
                fontSize: 20,
              }}
            >
              <AiOutlineCheckSquare />
            </div>
          </Tooltip>
          <Tooltip placement="bottom" title={`More Options`}>
            <div
              onClick={seeMoreMenuOpenHandler}
              style={{
                cursor: "pointer",
                color: "#464242",
                marginRight: 20,
                fontSize: 20,
              }}
            >
              <BiDotsVerticalRounded />
            </div>
          </Tooltip>
        </SelectedTableHeader>
      ) : null}

      <table {...getTableProps()}>
        {!Object.keys(selectedRowIds).length ? (
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, idx) => (
                  <th key={idx}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
        ) : null}

        <tbody {...getTableBodyProps()}>
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row);
            return (
              <CharSelectWrapper
                {...row.getRowProps()}
                showInput={selectedRowIds[`${i}`]}
                bg={true}
              >
                {row.cells.map((cell, idx) => {
                  const char = `${
                    cell.row.original.fullname.split("-")[0][0]
                  } ${cell.row.original.fullname.split("-")[1][0]}`;

                  return (
                    <td style={{ padding: 20 }} key={idx}>
                      {idx === 0 ? (
                        <div className="person-chars-input-wrapper">
                          <TablePersonsChar
                            showInput={selectedRowIds[`${i}`]}
                            bg={randomColorBg()}
                            className="person-chars"
                            // style={{
                            //   backgroundColor: randomColorBg(),
                            //   color:
                            //     randomColorBg() === "rgb(255, 255, 255)"
                            //       ? "#000"
                            //       : "#fff"
                            // }}
                          >
                            {char}
                          </TablePersonsChar>
                          <div className="person-chars-input">
                            {cell.render("Cell")}
                          </div>
                        </div>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </CharSelectWrapper>
            );
          })}
        </tbody>
      </table>

      {/* Delete modal */}
      <Modal
        title="Are you sure your want Delete these persons?!"
        centered
        visible={showDeleteModal}
        onOk={() => setShowDeleteModal(false)}
        onCancel={() => setShowDeleteModal(false)}
      >
        {selectedFlatRows.map(d => (
          <div>{d.original.fullName}</div>
        ))}
      </Modal>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={seeMoreMenuCloseHandler}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={seeMoreMenuCloseHandler}>
          <ListItemIcon>
            <MdPerson />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={seeMoreMenuCloseHandler}>
          <ListItemIcon>
            <MdLabelOutline />
          </ListItemIcon>
          Label
        </MenuItem>
      </Menu>
      {/* Delete modal */}
    </>
  );
};

export default SelectedPersonsTable;

{
  /* <Table columns={columns} data={data} /> */
}

// ** Imports
import { useState, useEffect, useMemo, useRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import { Modal, Checkbox, Menu, Dropdown, Alert, Tooltip, Button } from "antd";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { BsTrash } from "react-icons/bs";
import { MdPerson, MdLabelOutline } from "react-icons/md";
import { AiFillCheckSquare, AiOutlineCheckSquare } from "react-icons/ai";
import MaterialMenu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import MaterialModal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MaterialButton from "@mui/material/Button";
import { textSlicer } from "utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { GrSearchAdvanced } from "react-icons/gr";

// ** Redux Stuff
import { useDispatch, useSelector } from "react-redux";
import {
  changePersonActiveStatus,
  DeletePerson,
  DeleteSelectedPersons,
  getPersonsList,
  updateSelectedPersonToActive,
  updateSelectedPersonToUnActive,
} from "redux/persons/persons.actions";

import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import {
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
  AiOutlineFontSize,
  AiOutlineClose,
} from "react-icons/ai";

// ** Styles elements (Styled Components)
import {
  CustomTableWrapper,
  TablePagination,
  FontSizeWrapper,
  ModelContentWrapper,
  ShowColumnsFilterWrapper,
  ShowColumnsFilter,
  TableActionMenuWrapper,
  TablePersonsChar,
  SearchColumnsWrapper,
  PersonsSearchForm,
  SearchColumnsInputsWrapper,
  SearchColumnsInput,
  PersonTableSelectWrap,
  SelectedTableHeader,
  CharSelectWrapper,
  SearchFullNameInput,
} from "./styles";

// ** Icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiTableLine } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";

// ** Assets
import COLUMNS from "mock/columns";
import { colorPicker } from "utils/index";

// ** Components
import LoadingSpinner from "components/loading-spinner";
import PersonTableSeeMoreTable from "components/person-table-see-more-modal";
import { Snackbar } from "@mui/material";

const { SubMenu } = Menu;

// ** React Table Stuff

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <label className="select-container">
        <input type="checkbox" ref={resolvedRef} {...rest} />
        <span className="checkmark"></span>
      </label>
    </>
  );
});

const advancedSearchModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const PersonTable = () => {
  // ** States
  const [copied, setCopied] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [seeMoreModal, setSeeMoreModal] = useState(false);
  const [seeMoreModalArr, setSeeMoreModalArr] = useState([]);
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateActivePersonsModal, setShowUpdateActivePersonsModal] = useState(false);
  const [showUpdateInActivePersonsModal, setShowUpdateInActivePersonsModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [loading] = useState(false);
  const [showDeletePersonModal, setShowDeletePersonModal] = useState(false);
  const [showPersonActiveModal, setShowPersonActiveModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [personIdToDelete, setPersonIdToDelete] = useState(null);
  const [personIdToUpdate, setPersonIdToUpdate] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit] = useState(50);
  // const [personsDataArr, setPersonData] = useState([]);
  const [queryObj, setQueryObj] = useState({
    fullname: "",
    email: "",
    company: "",
    persno: "",
    identity: "",
  });
  const [advancedQueryObj, setAdvancedQueryObj] = useState({
    fullname: "",
    email: "",
    company: "",
    persno: "",
    identity: "",
  });

  const [personSearchBy, setPersonSearchBy] = useState("searchByFullname");
  const [showFontModal, setShowFontModal] = useState(false);
  const [fontSize, setFontSize] = useState("18px");
  const [paddingSize, setPaddingSize] = useState(`0px`);
  // eslint-disable-next-line
  const [circleSize, setCircleSize] = useState(`40px`);

  // ** Redux Stuff
  const {
    personsListLoading: personsLoading,
    personsListData: personsDataArr,
    personsListError,
    personsDeleteListLoading,
    changePersonToActiveLoading,
    changePersonToUnActiveLoading,
  } = useSelector(({ person }) => person);

  const { mainColor } = useSelector(({ ui }) => ui);
  const dispatch = useDispatch();

  // ** React Table Stuff
  const {
    loading: personLoading,
    data: personData,
    error: personError,
  } = useSelector(({ person }) => person);
  const columns = useMemo(() => COLUMNS, []);
  const tableData = useMemo(() => (personsDataArr ? personsDataArr?.data : []), [personsDataArr]);

  // ** Handlers
  const seeMoreMenuOpenHandler = event => {
    setAnchorEl(event.currentTarget);
  };
  const seeMoreMenuCloseHandler = () => {
    setAnchorEl(null);
  };

  const removeSearchKeywords = key => {
    if (key === "fullname") {
      setAdvancedQueryObj({ ...advancedQueryObj, [key]: "" });
      dispatch(
        getPersonsList(
          `https://devel.ident2be.com:1443/person?navigate[page]=${pageNumber}&navigate[limit]=${pageLimit}&filter[persno]=${advancedQueryObj.persno}&filter[fullname]=&filter[email]=${advancedQueryObj.email}&filter[cardno]=${advancedQueryObj.identity}&filter[company]=${advancedQueryObj.company}`
        )
      );
    }
    if (key === "company") {
      setAdvancedQueryObj({ ...advancedQueryObj, [key]: "" });
      dispatch(
        getPersonsList(
          `https://devel.ident2be.com:1443/person?navigate[page]=${pageNumber}&navigate[limit]=${pageLimit}&filter[persno]=${advancedQueryObj.persno}&filter[fullname]=${advancedQueryObj.fullname}&filter[email]=${advancedQueryObj.email}&filter[cardno]=${advancedQueryObj.identity}&filter[company]=`
        )
      );
    }
    if (key === "email") {
      setAdvancedQueryObj({ ...advancedQueryObj, [key]: "" });
      dispatch(
        getPersonsList(
          `https://devel.ident2be.com:1443/person?navigate[page]=${pageNumber}&navigate[limit]=${pageLimit}&filter[persno]=${advancedQueryObj.persno}&filter[fullname]=${advancedQueryObj.fullname}&filter[email]=&filter[cardno]=${advancedQueryObj.identity}&filter[company]=${advancedQueryObj.company}`
        )
      );
    }
    if (key === "identity") {
      setAdvancedQueryObj({ ...advancedQueryObj, [key]: "" });
      dispatch(
        getPersonsList(
          `https://devel.ident2be.com:1443/person?navigate[page]=${pageNumber}&navigate[limit]=${pageLimit}&filter[persno]=${advancedQueryObj.persno}&filter[fullname]=${advancedQueryObj.fullname}&filter[email]=${advancedQueryObj.email}&filter[cardno]=&filter[company]=${advancedQueryObj.company}`
        )
      );
    }
    if (key === "persno") {
      setAdvancedQueryObj({ ...advancedQueryObj, [key]: "" });
      dispatch(
        getPersonsList(
          `https://devel.ident2be.com:1443/person?navigate[page]=${pageNumber}&navigate[limit]=${pageLimit}&filter[persno]=&filter[fullname]=${advancedQueryObj.fullname}&filter[email]=${advancedQueryObj.email}&filter[cardno]=${advancedQueryObj.identity}&filter[company]=${advancedQueryObj.company}`
        )
      );
    }
  };

  const personSearchHandler = async e => {
    e.preventDefault();
    // setLoading(true);
    dispatch(
      getPersonsList(
        `https://devel.ident2be.com:1443/person?navigate[page]=${pageNumber}&navigate[limit]=${pageLimit}&filter[persno]=${queryObj.persno}&filter[fullname]=${queryObj.fullname}&filter[email]=${queryObj.email}&filter[cardno]=${queryObj.identity}&filter[company]=${queryObj.company}`
      )
    );
    // setLoading(false);
    // setPersonData(data);
  };

  const personAdvancedSearchHandler = async e => {
    e.preventDefault();
    setShowFilterOptions(true);

    setAdvancedSearchOpen(false);
    dispatch(
      getPersonsList(
        `https://devel.ident2be.com:1443/person?navigate[page]=${pageNumber}&navigate[limit]=${pageLimit}&filter[persno]=${advancedQueryObj.persno}&filter[fullname]=${advancedQueryObj.fullname}&filter[email]=${advancedQueryObj.email}&filter[cardno]=${advancedQueryObj.identity}&filter[company]=${advancedQueryObj.company}`
      )
    );
    // setLoading(false);
    // setPersonData(data);
  };

  const handleChangeFont = () => {
    setShowFontModal(false);
  };

  const deletePersonHandler = () => {
    if (!personData?.OK) {
      dispatch(DeletePerson(personIdToDelete));
      setShowDeleteAlert(true);
    }

    if (personData?.OK) {
      window.location.reload(true);
    }
    if (personError) {
      setShowDeleteAlert(true);
      setShowDeletePersonModal(false);
    }
  };

  const togglePersonActivity = () => {
    dispatch(changePersonActiveStatus(personIdToUpdate, false));
    if (personData?.OK) {
      window.location.reload(true);
    }
  };

  useEffect(() => {
    dispatch(
      getPersonsList(
        `https://devel.ident2be.com:1443/person?navigate[page]=${pageNumber}&navigate[limit]=${pageLimit}filter[fullname]=&filter[company]=`
      )
    );
  }, [dispatch, pageNumber, pageLimit]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // eslint-disable-next-line
    allColumns,
    page,
    setPageSize,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageSize: pageLimit },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
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
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  // ** Menus
  const tableOptionsMenu = (
    <Menu>
      <Menu.Item onClick={() => setShowFontModal(true)}>
        <AiOutlineFontSize style={{ marginRight: 10 }} /> Font
      </Menu.Item>
      <SubMenu
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <RiTableLine style={{ marginRight: 10 }} /> Toggle columns
          </div>
        }
      >
        <ShowColumnsFilterWrapper>
          {allColumns
            .filter((column, idx) => idx !== 0 || idx === 1)
            .map(column => (
              <div>
                <ShowColumnsFilter key={column.id}>
                  <Checkbox {...column.getToggleHiddenProps()}>
                    <span style={{ textTransform: "capitalize" }}>{column.id}</span>
                  </Checkbox>
                </ShowColumnsFilter>
              </div>
            ))}
        </ShowColumnsFilterWrapper>
      </SubMenu>
    </Menu>
  );

  if (personsLoading) {
    return <LoadingSpinner />;
  }
  if (personsListError?.length) {
    return <h1>error</h1>;
  }
  if (!personsLoading && !personsListError?.length) {
    return (
      <CustomTableWrapper maincolor={mainColor} fontsize={fontSize} padding={paddingSize}>
        <Modal
          title="Show or Hide columns"
          style={{ top: 20 }}
          visible={showFontModal}
          centered
          onOk={handleChangeFont}
          onCancel={() => setShowFontModal(false)}
          okText="Save"
          footer={null}
        >
          <ModelContentWrapper>
            <FontSizeWrapper>
              <h5>Table Font Size: </h5>
              <ul>
                <li
                  onClick={() => {
                    setFontSize("12px");
                    setPaddingSize("0px");
                    setCircleSize("30px");
                    setPageSize(40);
                  }}
                >
                  Small
                </li>
                <li
                  onClick={() => {
                    setFontSize("18px");
                    setPaddingSize("0px");
                    setCircleSize("35px");
                    setPageSize(25);
                  }}
                >
                  Medium
                </li>
                <li
                  onClick={() => {
                    setFontSize("21px");
                    setPaddingSize("0px");
                    setCircleSize("40px");
                    setPageSize(10);
                  }}
                >
                  Large
                </li>
              </ul>
            </FontSizeWrapper>
          </ModelContentWrapper>
        </Modal>

        <PersonsSearchForm onSubmit={personSearchHandler}>
          <SearchColumnsWrapper>
            <div
              className="h-16 flex items-center justify-center  cursor-pointer"
              onClick={() => setAdvancedSearchOpen(true)}
              style={{ borderRight: "1px solid #cbcbcb" }}
            >
              <GrSearchAdvanced className="mr-2 text-4xl" />
            </div>
            <SearchColumnsInputsWrapper>
              {personSearchBy === "searchByFullname" && (
                <SearchFullNameInput>
                  <SearchColumnsInput
                    type="text"
                    placeholder="Full Name"
                    value={queryObj.fullname}
                    onChange={e => setQueryObj({ ...queryObj, fullname: e.target.value })}
                    onKeyPress={e => {
                      if (e.key === "Enter") {
                        personSearchHandler(e);
                      }
                    }}
                  />
                  {queryObj.fullname.length > 0 && (
                    <AiOutlineClose onClick={() => setQueryObj({ ...queryObj, fullname: "" })} />
                  )}
                </SearchFullNameInput>
              )}
              {personSearchBy === "searchByCompany" && (
                <SearchFullNameInput>
                  <SearchColumnsInput
                    type="text"
                    placeholder="Company"
                    value={queryObj.company}
                    onChange={e => setQueryObj({ ...queryObj, company: e.target.value })}
                    onKeyPress={e => {
                      if (e.key === "Enter") {
                        personSearchHandler(e);
                      }
                    }}
                  />
                  {queryObj.company.length > 0 && (
                    <AiOutlineClose onClick={() => setQueryObj({ ...queryObj, company: "" })} />
                  )}
                </SearchFullNameInput>
              )}
              {personSearchBy === "searchByEmail" && (
                <SearchFullNameInput>
                  <SearchColumnsInput
                    type="text"
                    placeholder="Email Address"
                    value={queryObj.email}
                    onChange={e => setQueryObj({ ...queryObj, email: e.target.value })}
                    onKeyPress={e => {
                      if (e.key === "Enter") {
                        personSearchHandler(e);
                      }
                    }}
                  />
                  {queryObj.email.length > 0 && (
                    <AiOutlineClose onClick={() => setQueryObj({ ...queryObj, email: "" })} />
                  )}
                </SearchFullNameInput>
              )}
              {personSearchBy === "searchByIdentity" && (
                <SearchFullNameInput>
                  <SearchColumnsInput
                    type="text"
                    placeholder="Identity"
                    value={queryObj.identity}
                    onChange={e => setQueryObj({ ...queryObj, identity: e.target.value })}
                    onKeyPress={e => {
                      if (e.key === "Enter") {
                        personSearchHandler(e);
                      }
                    }}
                  />
                  {queryObj.identity.length > 0 && (
                    <AiOutlineClose onClick={() => setQueryObj({ ...queryObj, identity: "" })} />
                  )}
                </SearchFullNameInput>
              )}
              {personSearchBy === "searchByPersno" && (
                <SearchFullNameInput>
                  <SearchColumnsInput
                    type="text"
                    placeholder="Person ID"
                    value={queryObj.persno}
                    onChange={e => setQueryObj({ ...queryObj, persno: e.target.value })}
                    onKeyPress={e => {
                      if (e.key === "Enter") {
                        personSearchHandler(e);
                      }
                    }}
                  />
                  {queryObj.persno.length > 0 && (
                    <AiOutlineClose onClick={() => setQueryObj({ ...queryObj, persno: "" })} />
                  )}
                </SearchFullNameInput>
              )}

              <Box sx={{ minWidth: 165 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={personSearchBy}
                    onChange={e => {
                      setPersonSearchBy(e.target.value);
                    }}
                  >
                    <MenuItem value="searchByFullname"> Vollidige naam</MenuItem>
                    <MenuItem value="searchByCompany">Bedrijf</MenuItem>
                    <MenuItem value="searchByEmail">Email</MenuItem>
                    <MenuItem value="searchByIdentity">Identificatie</MenuItem>
                    <MenuItem value="searchByPersno">Persoon id</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </SearchColumnsInputsWrapper>
          </SearchColumnsWrapper>
        </PersonsSearchForm>
        {showFilterOptions && (
          <ul className="flex items-center flex-wrap mb-3">
            {Object.entries(advancedQueryObj).map(([key, value]) => (
              <>
                {value.length ? (
                  <li
                    key={key}
                    style={{
                      border: `3px solid  #676f7e`,
                      padding: "3px 10px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      marginRight: "10px",
                      color: `#676f7e`,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                    onClick={() => removeSearchKeywords(key)}
                  >
                    {value} x
                  </li>
                ) : null}
              </>
            ))}
          </ul>
        )}

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
                onClick={() => setShowUpdateActivePersonsModal(true)}
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
                onClick={() => setShowUpdateInActivePersonsModal(true)}
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

        {personsDataArr?.data?.length > 0 && !loading ? (
          <table className="customers " {...getTableProps()}>
            {!Object.keys(selectedRowIds).length ? (
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, idx) => (
                      <>
                        {idx === headerGroup.headers.length - 1 ? (
                          <th className="relative">
                            {column.render("Header")}{" "}
                            <Dropdown overlay={tableOptionsMenu} trigger={["click"]}>
                              <BiDotsVerticalRounded
                                className="absolute"
                                style={{
                                  marginLeft: 35,
                                  cursor: "pointer",
                                  fontSize: "1.2rem",
                                  display: "block",
                                  top: "50%",
                                  right: 0,
                                  transform: "translate(0px, -50%)",
                                }}
                              />
                            </Dropdown>
                          </th>
                        ) : (
                          <th>{column.render("Header")}</th>
                        )}
                      </>
                    ))}
                  </tr>
                ))}
              </thead>
            ) : null}

            {personsDataArr?.data?.length > 0 && (
              <tbody {...getTableBodyProps()}>
                {page?.map((row, i) => {
                  prepareRow(row);
                  return (
                    <>
                      <CharSelectWrapper
                        {...row.getRowProps()}
                        showInput={selectedRowIds[`${i}`]}
                        bg={mainColor}
                      >
                        {row?.cells?.map((cell, idx) => {
                          const char = `${
                            cell?.row?.original?.fullname?.replace("-", " ").split(" ")[0][0]
                          }${cell?.row?.original?.fullname?.replace("-", " ").split(" ")[1][0]}`;

                          return (
                            <TableActionMenuWrapper
                              {...cell.getCellProps()}
                              style={{
                                paddingRight: idx === 0 ? "20px" : "0px",
                              }}
                            >
                              <div>
                                <div>
                                  <PersonTableSelectWrap>
                                    {idx === 0 ? (
                                      <div className="person-chars-input-wrapper">
                                        <TablePersonsChar
                                          showInput={selectedRowIds[`${i}`]}
                                          bg={colorPicker()}
                                          className="person-chars"
                                        >
                                          {char}
                                        </TablePersonsChar>
                                        <div className="person-chars-input">
                                          {cell.render("Cell")}
                                        </div>
                                      </div>
                                    ) : null}
                                  </PersonTableSelectWrap>
                                  {idx === 1 && (
                                    <Link to={`/persons/${cell.row.original.persno}/edit`}>
                                      {cell?.row?.original?.fullname}
                                    </Link>
                                  )}

                                  {idx === 2 && (
                                    <div className="flex items-center flex-col cursor-pointer">
                                      <CopyToClipboard
                                        text={cell?.row?.original?.email}
                                        onCopy={() => setCopied(true)}
                                      >
                                        <Tooltip
                                          placement="bottom"
                                          title={`Click to Copy!
                                           ${cell?.row?.original?.email}
                                        `}
                                        >
                                          {textSlicer(cell?.row?.original?.email, 15)}
                                        </Tooltip>
                                      </CopyToClipboard>
                                    </div>
                                  )}
                                  {idx === 3 && (
                                    <div className="flex items-center flex-col">
                                      {cell?.row?.original?.company &&
                                      cell?.row?.original?.company?.split("\t").length > 1 ? (
                                        <div
                                          className="bg-yellow-300 p-1 px-3 rounded-md text-center text-sm	font-bold cursor-pointer"
                                          onClick={() => {
                                            setSeeMoreModal(true);
                                            setSeeMoreModalArr(
                                              cell?.row?.original?.company.split("\t")
                                            );
                                          }}
                                        >
                                          More..
                                        </div>
                                      ) : cell?.row?.original?.company ? (
                                        cell?.row?.original?.company
                                      ) : (
                                        "-"
                                      )}
                                    </div>
                                  )}
                                  {idx === 4 && (
                                    <div className="flex items-center flex-col">
                                      {cell?.row?.original?.cardno &&
                                      cell?.row?.original?.cardno.split("\t").length > 1 ? (
                                        <div
                                          className="bg-yellow-300 p-1 px-3 rounded-md text-center text-sm	font-bold cursor-pointer"
                                          onClick={() => {
                                            setSeeMoreModal(true);
                                            setSeeMoreModalArr(
                                              cell?.row?.original?.cardno.split("\t")
                                            );
                                          }}
                                        >
                                          More..
                                        </div>
                                      ) : cell?.row?.original?.cardno ? (
                                        cell?.row?.original?.cardno
                                      ) : (
                                        "-"
                                      )}
                                    </div>
                                  )}

                                  {idx !== 0 && idx !== 1 && idx !== 2 && idx !== 3 && idx !== 4 && (
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                      title={cell.value}
                                    >
                                      {cell.value
                                        ? cell.value
                                        : Object.keys(selectedRowIds).length
                                        ? null
                                        : "-"}
                                    </div>
                                  )}
                                </div>
                                {idx + 1 === row.cells.length && (
                                  <div className="table-actions-menu">
                                    <FaRegTrashAlt
                                      onClick={() => {
                                        setPersonIdToDelete(cell.value);
                                        setShowDeletePersonModal(true);
                                      }}
                                      style={{
                                        marginRight: 20,
                                        color: "red",
                                      }}
                                    />
                                    <Dropdown
                                      overlay={
                                        <Menu>
                                          <Menu.Item key="0">
                                            <Checkbox
                                              onChange={() => {
                                                if (!cell?.row?.original?.isactive) {
                                                  dispatch(
                                                    changePersonActiveStatus(personIdToUpdate, true)
                                                  );
                                                  return;
                                                }

                                                if (cell?.row?.original?.isactive) {
                                                  setShowPersonActiveModal(true);
                                                }
                                              }}
                                              checked={cell?.row?.original?.isactive}
                                            >
                                              Active
                                            </Checkbox>
                                          </Menu.Item>
                                        </Menu>
                                      }
                                      trigger={["click"]}
                                    >
                                      <BsThreeDotsVertical
                                        onClick={() => {
                                          setPersonIdToUpdate(cell?.row?.original?.persno);
                                        }}
                                      />
                                    </Dropdown>
                                  </div>
                                )}
                              </div>
                            </TableActionMenuWrapper>
                          );
                        })}
                      </CharSelectWrapper>
                      <span style={{ display: "block", height: 1 }} />
                    </>
                  );
                })}
              </tbody>
            )}
          </table>
        ) : !personsDataArr?.data?.length ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://i.pinimg.com/564x/88/36/65/8836650a57e0c941b4ccdc8a19dee887.jpg"
              alt=""
            />
          </div>
        ) : (
          <LoadingSpinner />
        )}

        <TablePagination style={{ display: "flex", alignItems: "center" }} className="pagination">
          <div style={{ display: "flex", alignItems: "center" }}>
            Total Results: {personsDataArr?.total}
          </div>
          <ul>
            <li className="ant-pagination-item ant-pagination-item-2">
              <button
                onClick={e => {
                  pageNumber >= 1 ? setPageNumber(old => old - 1) : e.preventDefault();
                }}
                disabled={pageNumber <= 1 ? true : false}
                style={{ all: "unset", color: "#6c6c6c" }}
              >
                <AiOutlineCaretLeft />
              </button>
            </li>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: 32,
                margin: "0 10px",
              }}
            >
              {/* !TODO replace total with total who is coming from the response */}
              <strong>
                {pageNumber ? pageNumber : 1} of {personsDataArr?.pages}
              </strong>
            </div>
            <li
              className="ant-pagination-item ant-pagination-item-2"
              onClick={() => {
                setPageNumber(old => old + 1);
              }}
            >
              <button
                onClick={e => {
                  pageNumber <= personsDataArr?.pages
                    ? setPageNumber(old => old + 1)
                    : e.preventDefault();
                }}
                disabled={pageNumber <= 1 ? true : false}
                style={{ all: "unset", color: "#6c6c6c" }}
              >
                <AiOutlineCaretRight />
              </button>
            </li>
          </ul>

          <div style={{ height: "fit-content" }}>
            <span>
              Go to page
              <input
                type="number"
                onChange={e => {
                  setTimeout(() => setPageNumber(e.target.value), 2000);
                }}
                defaultValue={pageNumber}
                style={{
                  width: 70,
                  marginLeft: 10,
                  height: 32,
                  paddingLeft: 10,
                }}
              />
            </span>
          </div>
        </TablePagination>

        <Modal
          title="Are you sure?"
          centered
          visible={showDeletePersonModal}
          onCancel={() => setShowDeletePersonModal(false)}
          onOk={deletePersonHandler}
          okText={personLoading ? "Loading..." : "Ok"}
        >
          {showDeleteAlert && personData?.OK && (
            <Alert message="Person has been deleted!" type="success" />
          )}
          {showDeleteAlert && personError && (
            <Alert message="Bad Request (Person Not Found!)" type="error" />
          )}
        </Modal>

        <Modal
          title="Toggle Active?"
          centered
          visible={showPersonActiveModal}
          onCancel={() => setShowPersonActiveModal(false)}
          footer={
            personData?.OK ? (
              <Button type="primary" onClick={() => window.location.reload(true)}>
                Close
              </Button>
            ) : (
              <Button type="primary" onClick={togglePersonActivity}>
                {personLoading ? "Loading..." : "Set Inactive"}
              </Button>
            )
          }
        >
          {personData?.OK && <Alert message="Person has been Updated" type="success" />}
        </Modal>

        {/* Delete modal */}
        <Modal
          title="Are you sure your want Delete these persons?!"
          centered
          okText={personsDeleteListLoading ? "Loading..." : "Delete"}
          visible={showDeleteModal}
          onOk={() =>
            dispatch(DeleteSelectedPersons(selectedFlatRows.map(el => el.original.persno)))
          }
          onCancel={() => setShowDeleteModal(false)}
        >
          {selectedFlatRows.map(d => (
            <div>{d.original.fullname}</div>
          ))}
        </Modal>
        {/* Set Selected persons to active modal */}
        <Modal
          title="UPDATE PERSONS TO ACTIVE!"
          centered
          okText={changePersonToActiveLoading ? "Loading..." : "Update to Active"}
          visible={showUpdateActivePersonsModal}
          onOk={() =>
            dispatch(
              updateSelectedPersonToActive(
                selectedFlatRows.map(el => {
                  return {
                    persno: el.original.persno,
                    isactive: true,
                  };
                })
              )
            )
          }
          onCancel={() => setShowUpdateActivePersonsModal(false)}
        >
          {selectedFlatRows.map(d => (
            <div>{d.original.fullname}</div>
          ))}
        </Modal>

        {/* Set Selected persons to inactive modal */}
        <Modal
          title="UPDATE PERSONS TO UNACTIVE!"
          centered
          okText={changePersonToUnActiveLoading ? "Loading..." : "Update to Unactive"}
          visible={showUpdateInActivePersonsModal}
          onOk={() =>
            dispatch(
              updateSelectedPersonToUnActive(
                selectedFlatRows.map(el => {
                  return {
                    persno: el.original.persno,
                    isactive: false,
                  };
                })
              )
            )
          }
          onCancel={() => setShowUpdateActivePersonsModal(false)}
        >
          {selectedFlatRows.map(d => (
            <div>{d.original.fullname}</div>
          ))}
        </Modal>
        <MaterialModal
          keepMounted
          open={advancedSearchOpen}
          onClose={() => setAdvancedSearchOpen(false)}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={advancedSearchModal}>
            <form onSubmit={personAdvancedSearchHandler}>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2" mb={3}>
                Advanced Search
              </Typography>
              <div className="mb-3">
                <SearchFullNameInput width={"100%"}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Vollidige naam"
                    variant="outlined"
                    value={advancedQueryObj.fullname}
                    onChange={e =>
                      setAdvancedQueryObj({ ...advancedQueryObj, fullname: e.target.value })
                    }
                  />
                  {advancedQueryObj.fullname.length > 0 && (
                    <AiOutlineClose
                      onClick={() => setAdvancedQueryObj({ ...advancedQueryObj, fullname: "" })}
                    />
                  )}
                </SearchFullNameInput>
              </div>
              <div className="mb-3">
                <SearchFullNameInput width={"100%"}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={advancedQueryObj.email}
                    onChange={e =>
                      setAdvancedQueryObj({ ...advancedQueryObj, email: e.target.value })
                    }
                  />
                  {advancedQueryObj.email.length > 0 && (
                    <AiOutlineClose
                      onClick={() => setAdvancedQueryObj({ ...advancedQueryObj, email: "" })}
                    />
                  )}
                </SearchFullNameInput>
              </div>
              <div className="mb-3">
                <SearchFullNameInput width={"100%"}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Bedrijf"
                    variant="outlined"
                    value={advancedQueryObj.company}
                    onChange={e =>
                      setAdvancedQueryObj({ ...advancedQueryObj, company: e.target.value })
                    }
                  />
                  {advancedQueryObj.company.length > 0 && (
                    <AiOutlineClose
                      onClick={() => setAdvancedQueryObj({ ...advancedQueryObj, company: "" })}
                    />
                  )}
                </SearchFullNameInput>
              </div>
              <div className="mb-3">
                <SearchFullNameInput width={"100%"}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Identificatie"
                    variant="outlined"
                    value={advancedQueryObj.identity}
                    onChange={e =>
                      setAdvancedQueryObj({ ...advancedQueryObj, identity: e.target.value })
                    }
                  />
                  {advancedQueryObj.identity.length > 0 && (
                    <AiOutlineClose
                      onClick={() => setAdvancedQueryObj({ ...advancedQueryObj, identity: "" })}
                    />
                  )}
                </SearchFullNameInput>
              </div>
              <div className="mb-3">
                <SearchFullNameInput width={"100%"}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Persoon id"
                    variant="outlined"
                    value={advancedQueryObj.persno}
                    onChange={e =>
                      setAdvancedQueryObj({ ...advancedQueryObj, persno: e.target.value })
                    }
                  />
                  {advancedQueryObj.persno.length > 0 && (
                    <AiOutlineClose
                      onClick={() => setAdvancedQueryObj({ ...advancedQueryObj, persno: "" })}
                    />
                  )}
                </SearchFullNameInput>
              </div>
              <MaterialButton variant="contained" fullWidth type="submit">
                Search
              </MaterialButton>
            </form>
          </Box>
        </MaterialModal>
        <PersonTableSeeMoreTable
          open={seeMoreModal}
          setOpen={() => setSeeMoreModal(!seeMoreModal)}
          array={seeMoreModalArr}
        />
        <MaterialMenu
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
        </MaterialMenu>
        <Snackbar
          open={copied}
          autoHideDuration={2000}
          onClose={() => setCopied(false)}
          message="Copied to Clipboard!"
        />
        {/* Delete modal */}

        {/* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
        <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds: selectedRowIds,
                "selectedFlatRows[].original": selectedFlatRows.map(d => d.original),
              },
              null,
              2
            )}
          </code>
        </pre> */}
      </CustomTableWrapper>
    );
  }
};

export default PersonTable;

// Problem solve steps
// ** When hover on row char hidden and input shows
// ** when input changes char display none

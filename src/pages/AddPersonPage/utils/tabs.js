import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import AddPersonTab from "components/add-person-tab";
import AddPersonAddressesTab from "components/add-person-address-tab";
import AddPersonFunctieTab from "components/add-person-functie-tab";
import AddPersonIdentificatieTab from "components/add-person-identificatie-tab";

const personTabs = [
  {
    name: "add-person",
    icon: <AiOutlineUser />,
    title: "Add Person",
    component: <AddPersonTab />,
  },
  {
    name: "create-person-address",
    icon: <AiOutlineUserAdd />,
    title: "Person Addresses",
    component: <AddPersonAddressesTab />,
  },
  {
    name: "create-person-functie",
    icon: <AiOutlineUserAdd />,
    title: "Person Functie",
    component: <AddPersonFunctieTab />,
  },
  {
    name: "create-person-identificatie",
    icon: <AiOutlineUserAdd />,
    title: "Person Identificatie",
    component: <AddPersonIdentificatieTab />,
  },
];

export default personTabs;

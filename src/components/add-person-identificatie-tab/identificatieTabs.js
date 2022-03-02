import { AiOutlineUser } from "react-icons/ai";
import AlleePinCode from "./utils/AlleePinCode";
import RFIDKaart from "./utils/RFIDKaart";
import BarCode from "./utils/BarCode";
import VirtualID from "./utils/VirtualID";
import Kentekenplaat from "./utils/Kentekenplaat";

const identificatieTabs = [
  {
    name: "RFID-kaart",
    icon: <AiOutlineUser />,
    title: "RFID-kaart",
    component: <RFIDKaart />,
  },
  {
    name: "Kentekenplaat",
    icon: <AiOutlineUser />,
    title: "Kentekenplaat",
    component: <Kentekenplaat />,
  },
  {
    name: "allee-pincode",
    icon: <AiOutlineUser />,
    title: "Allee Pincode",
    component: <AlleePinCode />,
  },
  {
    name: "barcode",
    icon: <AiOutlineUser />,
    title: "Barcode",
    component: <BarCode />,
  },
  {
    name: "virtual-id",
    icon: <AiOutlineUser />,
    title: "Virtual ID",
    component: <VirtualID />,
  },
];

export default identificatieTabs;

import { PersonPageWrapper } from "./styles";
import PersonTable from "components/persons-table";
import PageSidebar from "components/page-sidebar";

const PersonsPage = () => {
  return (
    <div className="container">
      <PersonPageWrapper>
        <PageSidebar />
        <PersonTable />
      </PersonPageWrapper>
    </div>
  );
};

export default PersonsPage;

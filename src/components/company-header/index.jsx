// Styles Elemnts
import { CustomContainer } from "../../contants";
import { CompanyHeaderLeft, CompanyHeaderPersonEmail, CompanyHeaderPersonName, CompanyHeaderRight, CompanyHederWrapper } from "./styles";
import Person from '../../assets/images/person.png'
import NoImage from '../../assets/images/no-image.png'

const CompanyHeader = () => {
  return (
    <CustomContainer>
      <CompanyHederWrapper>
        <CompanyHeaderLeft>
          <h1>Welcome Rahaf</h1>
          <img src={Person} alt="person" />
          <CompanyHeaderPersonName>Rahaf Hammada</CompanyHeaderPersonName>
          <CompanyHeaderPersonEmail>info@email.com</CompanyHeaderPersonEmail>
        </CompanyHeaderLeft>
        <CompanyHeaderRight>
          <img src={NoImage} alt="" />
        </CompanyHeaderRight>
      </CompanyHederWrapper>
    </CustomContainer>
  );
};

export default CompanyHeader;

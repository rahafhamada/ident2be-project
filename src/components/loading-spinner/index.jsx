import { useSelector } from "react-redux";
import { LoadingSpinnerWrap } from "./styles";

const LoadingSpinner = () => {
  const { mainColor } = useSelector(({ ui }) => ui);

  return (
    <LoadingSpinnerWrap maincolor={mainColor}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoadingSpinnerWrap>
  );
};

export default LoadingSpinner;

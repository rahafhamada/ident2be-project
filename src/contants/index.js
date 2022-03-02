import styled from "styled-components";
import { store } from "../redux/store";

// Colors
export const mainColor = store.getState().ui.mainColor;

export const CustomContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  max-width: 1400px;
`;

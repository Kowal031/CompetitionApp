import styled from "@emotion/styled";
import { Button } from "@mui/material";
export const ButtonWithDisabledStyle = styled(Button)`
  &&& {
    &.Mui-disabled {
      color: #fff;
      background: #1976d2;
      opacity: 0.5;
    }
  }
`;

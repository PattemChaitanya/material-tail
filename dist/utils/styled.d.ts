import styled from "@emotion/styled";
import { Theme } from "../theme/types";
declare module "@emotion/react" {
    interface Themes extends Theme {
    }
}
export default styled;

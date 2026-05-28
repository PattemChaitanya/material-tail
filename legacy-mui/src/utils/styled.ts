import styled from "@emotion/styled";
import { Theme } from "../theme/types";

// Extend Emotion's theme type
declare module "@emotion/react" {
  export interface Themes extends Theme {}
}

// Export the styled function with our theme
export default styled;

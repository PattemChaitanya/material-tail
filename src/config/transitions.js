const easing = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
};

const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195,
};

function createTransition(props = ["all"], options = {}) {
  const {
    duration: durationOption = duration.standard,
    easing: easingOption = easing.easeInOut,
    delay = 0,
  } = options;

  const transitionString = (Array.isArray(props) ? props : [props])
    .map(
      (animatedProp) =>
        `${animatedProp} ${
          typeof durationOption === "string"
            ? duration[durationOption]
            : durationOption
        }ms ${easingOption} ${delay}ms`
    )
    .join(", ");

  return transitionString;
}

const transitions = {
  easing,
  duration,
  create: createTransition,
};

export default transitions;

// Attaching to DOM head
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
    * {
      transition: ${createTransition()} !important;
    }
  `;
  document.head.appendChild(style);
}

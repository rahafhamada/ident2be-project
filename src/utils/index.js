const colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

export const colorPicker = () => {
  const random = colors[Math.floor(Math.random() * colors.length)];
  return random;
};

export const personFullNameValidation = str => {
  let message = "";
  const letters = /^[0-9]+$/;
  // eslint-disable-next-line
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (str.match(letters)) {
    message = "Numbers not allowed!";
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  if (format.test(str)) {
    message = "Only alphabet character not allowed!";
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  if (str.split(" ").length === 1) {
    message = "Full Name must be atleast 2 words";
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  if (str === "") {
    message = "Full Name is Required!";
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return { message };
};

export const textSlicer = (txt, max) => {
  if (txt === null) {
    return "-";
  }
  if (txt.length > max) {
    return `${txt.slice(0, max)}...`;
  }

  return txt;
};

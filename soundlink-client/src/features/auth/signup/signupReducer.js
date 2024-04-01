export const initialState = {
  activeStep: 0,
  email: "",
  password: "",
  showPassword: false,
  phone: "",
  fullName: "",
  location: null,
  description: "",
  gender: "",
  profession: "",
  song1Name: "",
  song1Url: "",
  song2Name: "",
  song2Url: "",
  song3Name: "",
  song3Url: "",
  song4Name: "",
  song4Url: "",
  imageSrc: "",
  image: null,
  genres: [],
  isChecked: true,
  isValid: false,
  message: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, activeStep: action.payload };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    case "SET_IS_VALID":
      return { ...state, isValid: action.payload };
    case "SET_IMAGE_SRC":
      return { ...state, imageSrc: action.payload.imageSrc };
    case "SET_IMAGE":
      return { ...state, image: action.payload.image };
    case "REMOVE_IMAGE":
      return { ...state, imageSrc: "", image: null };
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "SET_GENRES":
      return { ...state, genres: action.payload };
    case "TOGGLE_IS_CHECKED":
      return { ...state, isChecked: !state.isChecked };
    default:
      return state;
  }
};

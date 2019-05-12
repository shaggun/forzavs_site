import axios from "axios";

export default axios.create({
  baseURL: "https://yourproject.firebaseio.com/" //your firebase url
});

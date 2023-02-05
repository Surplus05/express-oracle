import axios from "axios";

async function getPageArcitleList(page: number) {
  return await axios.get("http://localhost:5000/article", {
    params: {
      page: page,
    },
    headers: {},
  });
}

export default getPageArcitleList;

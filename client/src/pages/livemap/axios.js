import { naxios } from "../../components/utilities/request";

export const cerebro = async () => {
  const url = "/api/voicenote/getallbydate";
  try {
    let result = await naxios.get(url);
    return result;
  } catch (e) {
    throw e;
  }
};
export const check = async (size) => {
  try {
    const { data } = await naxios.post("/api/voicenote/check", {
      size: size,
    });
    return data;
  } catch (e) {
    throw e;
  }
};

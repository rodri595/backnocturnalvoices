import { naxios } from "../utilities/request";

export const addVoicenote = async (
  city,
  country_name,
  latitude,
  longitude,
  title,
  audio,
  utc
) => {
  try {
    const { data } = await naxios.post("/api/voicenote/add", {
      city: city,
      country_name: country_name,
      latitude: latitude,
      longitude: longitude,
      title: title,
      audio: audio,
      utc: utc,
    });
    return data;
  } catch (e) {
    throw e;
  }
};

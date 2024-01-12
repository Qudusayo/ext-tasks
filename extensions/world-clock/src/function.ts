const url = "https://worldtimeapi.org/api/timezone/";

const getTimeOffset = async (zone: string) => {
  try {
    const response = await fetch(url + zone);
    const data = await response.json();
    return data.utc_offset;
  } catch (e) {
    throw new Error(String(e));
  }
};

export default getTimeOffset;

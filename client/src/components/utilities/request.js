import axios from "axios";

const publicaxios = axios.create();
publicaxios.defaults.headers.common["cache-control"] = "no-cache";
publicaxios.defaults.headers.post["Content-Type"] = "no-cache";
publicaxios.defaults.headers.put["Content-Type"] = "no-cache";

export const naxios = publicaxios;

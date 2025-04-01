import { toast } from "react-toastify";

export const Notify = (message) => toast.error(message ? message : "error occur");
export const Info = (message) => toast.info(message ? message : "Empty message");

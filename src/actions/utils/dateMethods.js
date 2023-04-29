import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";

export const convertDateToLabel = (date) => {
  const zonedDate = utcToZonedTime(date, "Asia/Manila");
  return format(zonedDate, "yyyy-MM-dd");
};

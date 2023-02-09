import dayjs from "dayjs";

export const formatDate = (date: string | Date | number): string => {
    if (!date)
        return;

    return dayjs(date).format("DD/MM/YYYY");
}
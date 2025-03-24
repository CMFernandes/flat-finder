import dayjs, { Dayjs } from "dayjs";

export const calculateAge = (birthDate: Dayjs): number => {
    if(!birthDate){
        return -1;
    }

    const today = dayjs();

    let age = today.year() - birthDate.year();

    const monthDifference = today.month() - birthDate.month();

    if(monthDifference < 0 || (monthDifference === 0 && today.date() < birthDate.date())) {
        age--
    }

    return age;
}
import { Dayjs } from "dayjs";

export type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Dayjs;
    id: string;
    role: "admin" | "user";
    favouriteFlats: string[];
}




import { User } from "src/features/users/entities/user.entity";
import * as bcrypt from 'bcrypt';
import { UserStatus } from "@prisma/client";

interface UserSeed extends Omit<User, 'id' | 'status'> {
    password: string;
    status: UserStatus
}
export const users: UserSeed[] = [
    {
        name: "Fabrizio Vergaray",
        email: "fabrizio.vergaray@example.com",
        status: "ACTIVE",
        password: bcrypt.hashSync("Admin2025@a", 10)
    },
    {
        name: "María López",
        email: "maria.lopez@example.com",
        status: "INACTIVE",
        password: bcrypt.hashSync("Admin2025@a", 10)
    },
    {
        name: "Juan Pérez",
        email: "juan.perez@example.com",
        status: "ACTIVE",
        password: bcrypt.hashSync("Admin2025@a", 10)
    },
    {
        name: "Carla Rojas",
        email: "carla.rojas@example.com",
        status: "ACTIVE",
        password: bcrypt.hashSync("Admin2025@a", 10)
    },
    {
        name: "Luis Torres",
        email: "luis.torres@example.com",
        status: "INACTIVE",
        password: bcrypt.hashSync("Admin2025@a", 10)
    }
];
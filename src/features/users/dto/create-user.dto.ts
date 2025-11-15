import { IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserStatus } from '@prisma/client';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    name: string;

    @Matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, {
        message: 'Invalid email format',
    })
    email: string;

    @Matches(/^(?=.{8,}$)(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/, { message: 'Password too weak' })
    password: string;
    @IsEnum(UserStatus, { message: 'Status must be ACTIVE, INACTIVE, or BANNED' })
    status: UserStatus;
}

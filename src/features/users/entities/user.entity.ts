import { UserStatus } from "@prisma/client";

export class User {
    public readonly id: number;
    public readonly name: string;
    public readonly email: string;
    public readonly status: string;
    private static formatName(name: string): string {
        const trimmed = name.trim().toLowerCase();
        return trimmed
            .split(' ')
            .filter(Boolean)
            .map(
                (word) => word.charAt(0).toUpperCase() + word.slice(1) // Capitalize the first letter of each word
            )
            .join(' ');
    }
    private static formatStatus(status: string): string {
        switch (status) {
            case UserStatus.ACTIVE:
                return 'Activo';
            case UserStatus.INACTIVE:
                return 'Inactivo';
            case UserStatus.BANNED:
                return 'Prohibido';
            default:
                return 'Desconocido';
        }
    }
    static toJson(user: User) {
        return {
            id: user.id,
            name: this.formatName(user.name),
            status: this.formatStatus(user.status),
            email: user.email,
        };
    }
}
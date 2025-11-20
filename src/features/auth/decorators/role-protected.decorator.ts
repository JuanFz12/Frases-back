import { SetMetadata } from '@nestjs/common';

export const META_ROLES = 'roles';
export enum ValidRoles {
    admin = 'admin',
    app = 'app',
}

export const RoleProtected = (...args: ValidRoles[]) => {


    return SetMetadata(META_ROLES, args);
}

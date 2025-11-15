// prisma.extensions.ts

import { Prisma } from "@prisma/client";


export const normalizeUserExtension = Prisma.defineExtension({
    name: 'normalize-user-extension',

    query: {
        user: {
            async create({ args, query }) {
                normalizeUserData(args.data);
                return query(args);
            },
            async update({ args, query }) {
                if (args.data && typeof args.data === 'object') {
                    normalizeUserData(args.data);
                }
                return query(args);
            },
        },
    },
});

function normalizeUserData(data: any) {

    if (data.name !== undefined && typeof data.name === 'string') {
        data.name = data.name.trim().toLowerCase();
    }

    if (data.email !== undefined && typeof data.email === 'string') {
        data.email = data.email.trim();
    }
}
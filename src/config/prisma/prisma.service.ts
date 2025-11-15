import { Injectable, OnModuleInit } from '@nestjs/common';
import { normalizeUserExtension } from './extensions/prisma.extensions';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit {
    public readonly prisma = new PrismaClient().$extends(normalizeUserExtension);
    public $queryRaw = this.prisma.$queryRaw.bind(this.prisma);
    async onModuleInit() {
        await this.prisma.$connect();
    }
    get user() {
        return this.prisma.user;
    }
    get phrase() {
        return this.prisma.phrase;
    }
}

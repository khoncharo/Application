import { PrismaService } from 'src/prisma/providers/prisma.service';

const eventInclude = {
  tags: { include: { tag: true } },
  participants: { include: { user: true } },
  _count: { select: { participants: true } },
} as const;

export async function fetchAllEvents(prisma: PrismaService) {
  return prisma.event.findMany({
    orderBy: { dateTime: 'asc' },
    include: eventInclude,
  });
}

export async function fetchAttendingEvents(
  prisma: PrismaService,
  userId: string,
  from: Date,
) {
  return prisma.participant.findMany({
    where: {
      userId,
      event: { dateTime: { gte: from } },
    },
    orderBy: { event: { dateTime: 'asc' } },
    include: {
      event: { include: eventInclude },
    },
  });
}

export async function fetchOrganizedEvents(
  prisma: PrismaService,
  userId: string,
) {
  return prisma.event.findMany({
    where: { userId },
    orderBy: { dateTime: 'asc' },
    include: eventInclude,
  });
}

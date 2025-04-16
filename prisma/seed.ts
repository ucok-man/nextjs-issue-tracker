import { PrismaClient, Status } from "@prisma/client";
const prisma = new PrismaClient();

async function SEED_USER() {
  const john = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@john.com",
      username: "Johnnydoe",
    },
  });

  const alice = await prisma.user.create({
    data: {
      name: "Alice Chan",
      email: "alice@alice.com",
      username: "Aliciachan",
    },
  });

  const harold = await prisma.user.create({
    data: {
      name: "Harold Amin",
      email: "harold@harold.com",
      username: "Harold Man",
    },
  });

  return { john, alice, harold };
}

async function SEED_ISSUE(users: Awaited<ReturnType<typeof SEED_USER>>) {
  const { john, alice, harold } = users;

  const issues = [
    {
      title: "Login page not responsive on mobile devices",
      description:
        "The login form elements overlap on screens smaller than 375px width. Buttons are cut off and input fields don't resize properly.",
      status: Status.OPEN,
    },
    {
      title: "Add pagination to user list",
      description:
        "Currently, all users are loaded at once which causes performance issues when there are more than 100 users. We need to implement pagination with 20 users per page.",
      status: Status.IN_PROGGRES,
    },
    {
      title: "Fix security vulnerability in file upload",
      description:
        "Our file upload functionality doesn't properly validate file types, which could allow malicious files to be uploaded. We need to implement proper MIME type checking and size limitations.",
      status: Status.CLOSED,
    },
    {
      title: "Implement dark mode for dashboard",
      description:
        "Users have requested a dark mode option for the dashboard to reduce eye strain during night usage. We should add a toggle in the user settings.",
      status: Status.OPEN,
    },
    {
      title: "Database optimization for search queries",
      description:
        "Search functionality is currently too slow when the database grows beyond 10,000 records. We need to optimize the indexes and query structure.",
      status: Status.IN_PROGGRES,
    },
    {
      title: "Update documentation for API v2",
      description:
        "The API documentation doesn't reflect the changes made in version 2. All new endpoints and deprecated methods need to be clearly documented.",
      status: Status.OPEN,
    },
    {
      title: "Fix broken image links in product catalog",
      description:
        "Several product images are not displaying correctly due to broken URL references after the latest migration.",
      status: Status.CLOSED,
    },
    {
      title: "Implement two-factor authentication",
      description:
        "To improve security, we need to add an option for users to enable two-factor authentication using SMS or authenticator apps.",
      status: Status.IN_PROGGRES,
    },
    {
      title: "Cart total calculation error",
      description:
        "When applying certain discount codes, the cart total sometimes shows negative values or incorrect amounts due to a calculation logic error.",
      status: Status.OPEN,
    },
    {
      title: "Add export functionality for reports",
      description:
        "Users need the ability to export analytics reports in CSV and PDF formats for offline analysis and presentation.",
      status: Status.CLOSED,
    },
    {
      title: "Fix password reset email delivery issues",
      description:
        "Some users report not receiving password reset emails. We need to investigate the email delivery service and fix any configuration issues.",
      status: Status.IN_PROGGRES,
    },
    {
      title: "Optimize image loading performance",
      description:
        "Product pages load slowly due to unoptimized images. We should implement lazy loading and better image compression.",
      status: Status.OPEN,
    },
    {
      title: "Add multi-language support",
      description:
        "As we expand to international markets, we need to implement a localization system that supports at least English, Spanish, and French initially.",
      status: Status.IN_PROGGRES,
    },
    {
      title: "Fix broken links in footer navigation",
      description:
        "Several links in the site footer are pointing to non-existent pages after the recent site restructuring.",
      status: Status.CLOSED,
    },
    {
      title: "Implement automated backup system",
      description:
        "We need to create an automated system for daily database backups with rotation policies and integrity verification.",
      status: Status.OPEN,
    },
  ];

  let issueIds: number[] = [];
  for (const issue of issues) {
    const createdById = randomfrom([alice, john, harold]).id;

    let assignedToId = randomfrom([alice, john, harold]).id;
    while (createdById === assignedToId) {
      assignedToId = randomfrom([alice, john, harold]).id;
    }

    const result = await prisma.issue.create({
      data: {
        title: issue.title,
        description: issue.description,
        status: issue.status,
        createdById: createdById,
        assignedToId: assignedToId,
      },
    });
    issueIds.push(result.id);
  }

  return issueIds;
}

async function SEED_COMMENT(userIds: string[], issueIds: number[]) {
  const count = issueIds.length * 2;

  for (let i = 0; i < count; i++) {
    await prisma.comment.create({
      data: {
        description: randomfrom(
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            .split(".")
            .map((val) => val.trim())
            .filter((val) => val !== "")
        ),
        authorId: randomfrom(userIds),
        issueId: randomfrom(issueIds),
      },
    });
  }

  return {};
}

async function main() {
  const { john, alice, harold } = await SEED_USER();
  const issueIds = await SEED_ISSUE({
    john,
    alice,
    harold,
  });

  const {} = await SEED_COMMENT([john.id, alice.id, harold.id], issueIds);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

function randomfrom<T>(items: T[]): T {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Input must be a non-empty array.");
  }

  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

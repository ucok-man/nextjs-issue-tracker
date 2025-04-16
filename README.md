# Issue Tracker

A web application for tracking and managing project issues, allowing teams to create, assign, track and discuss tasks or bugs efficiently in one centralized location.

## Feature

- Authentication
- CRUD on issue
- Issue assigment
- Issue list and chart visualization
- Comment on issue

## TODO

- [ ] Edit Comment

## Technology Used

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Radix UI](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)

## Prerequisites

Before setting up this project, make sure you have the following installed:

- Node.js (v18 or newer)
- npm or bun package manager
- PostgresSQL database

## Getting Started

1.  Clone this repository to your local machine.
2.  In the project folder, rename **.env.example** to **.env** (no period after).
3.  Set **all** the environment variables according to the instructions I've included in the file. If you don't set them properly, the application is not going to work.
4.  Run `bun install` to install the dependencies.
5.  Run `bunx prisma db reset` to setup database and prisma.
6.  Run `bun run dev` to start the web server.

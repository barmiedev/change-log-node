# Change Log API

An API written with:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [REST](https://restfulapi.net/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Jest](https://jestjs.io/)
- [Supertest](https://www.npmjs.com/package/supertest)

## Getting Started

### Prerequisites

- node >= 16.14.0
- make

### Installation

To setup a local database, run:

```bash
make build
make start
npx prisma migrate dev
```

To start the server, run:

```bash
npm run dev
```

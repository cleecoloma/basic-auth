# Basic Auth

>  **Authentication System Phase 1:** Deploy an Express server that implements Basic Authentication, with signup and signin capabilities, using a Postgres database for storage.

## Installation

> Start with: `npm install`

> Set your PORT environment with an .env file

```text
PORT=3001
SQL_CONNECTION_STRING={SQL_database_link}
```

## Usage

Signup request:
```text
method: POST
route: /signup
json: {
  username: 'Koko'
  password: 'OnlyDogsAllowed'
}
```

Signin reques:
```text
method: POST
route: /signin
headers: Authentication Basic {
  username: 'Koko'
  password: 'OnlyDogsAllowed'
}
```

## UML Diagram
![Basic Auth UML Diagram](./public/images/401-class-06-lab.png)

## PR link
[PR link Class 06](https://github.com/cleecoloma/basic-auth/pull/1)

## Contributors
> Chester Lee Coloma
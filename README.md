# codersquare
This document explores the design of codersquare, a social experience for
sharing useful programming resources.
We'll use a basic client/server architecture next to a relational database.

## Server
A basic HTTP server handles authentication, serves stored data, and may also process and serve analytics data.
- Node.js is chosen for its rapid development capabilities.
- The web server framework used is Express.js
- Sequelize will be utilized as the ORM.

## Auth
A JWT-based auth mechanism is to be used, with passwords encrypted and stored in the database.

## API

**Auth**:

```
/signIn  [POST]
/signUp  [POST]
/signOut [POST]
```

**Posts**:

```
/posts/list [GET]
/posts/new  [POST]
/posts/:id  [GET]
/posts/:id  [DELETE]
```

**Likes**:

```
/likes/new [POST]
```

**Comments**:

```
/comments/new  [POST]
/comments/list [GET]
/comments/:id  [DELETE]
```

## Storage

### Database
A relational database (schema follows) to fast retrieval of posts and comments. A minimal database implementation such as sqlite3 suffices.

### Schema
**Users**:
|Column|Type|
|------|-----|
| ID | STRING/UUID |
| First/Last name | STRING |
| Password | STRING |
| Email | STRING |
| Username | STRING |

**Posts**:
| Column | Type |
|--------|------|
| ID | STRING/UUID |
| Title | STRING |
| URL | STRING |
| UserId | STRING/UUID |
| PostedAt | Timestamp |

**Likes**:
| Column | Type |
|--------|------|
| UserId | STRING/UUID |
| PostId | STRING |

**Comments**:
| Column | Type |
|---------|------|
| ID | STRING |
| UserId | STRING/UUID |
| PostId | STRING |
| Comment | STRING |
| PostedAt | Timestamp |

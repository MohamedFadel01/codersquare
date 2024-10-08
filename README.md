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
/users/signIn  [POST]
/users/signUp  [POST]
/users/signOut [POST]
/users/ [PUT]
/users/ [DELETE]
```

**Posts**:

```
/posts [GET]
/posts [POST]
/posts/:id  [GET]
/posts/:id  [DELETE]
/posts/:id  [PUT]
```

**Likes**:

```
/likes/ [POST]
/likes/:postId [GET]
/likes/:postId [DELETE]
```

**Comments**:

```
/comments [POST]
/comments [GET]
/comments/:id  [DELETE]
```

## Storage

### Database
A relational database (schema follows) to fast retrieval of posts and comments.

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
| Body | STRING |
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
| ID | STRING/UUID |
| UserId | STRING/UUID |
| PostId | STRING |
| Body | STRING|
| PostedAt | Timestamp |

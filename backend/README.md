# HCC Calendar Backend

### Start:
npm install
npm start

### ENV:
PORT=3336
JWT_SECRET=changeme123

### Routes:

POST /auth/register
POST /auth/login

GET /events
POST /events (admin)
PUT /events/:id (admin)
DELETE /events/:id (admin)

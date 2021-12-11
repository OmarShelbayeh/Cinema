# Cinema

## Intro
### Roles
+ [User](#user)
+ [Admin](#admin)

## Server Endpoints

### Public Endpoints
Public endpoint don't require authentication.
* `/`
+ Login (POST). `/login` requires `email, password` 
+ register (POST) `/register` requries `email, name, surname, password`

### [User](#user) and [Admin](#admin) Endpoints
These endpoint require authentication
* `/user`
+ Gets user info (GET) `/info` requires `email`

### [Admin](#admin) Endpoints
These endpoint require authentication and an ADMIN role
* `/movies`
+ Gets all movies (GET) `/allMovies`
+ Adds a new movie (POST) `/newMovie` requires `name, director, owner`
+ Deletes a movie (DELETE) `/deleteMovie` requires `id`

## Client side pages

### Public
Requires no authentication
* Landing `/`
* Login page `/login`
* Register page `/register`

### [User](#user)
Requires a `USER` role
* User dashboard `/dashboard`

### [Admin](#admin)
Requires an `ADMIN` role
* Admin dashboard `/adminDashboard`


## Login info
<a id="user"></a>
### User Info

  + Email: user@cinema.com <br />
  + Name: Hubert <br />
  + Surname: Szczepaniak <br />
  + Password: user <br />

<a id="admin"></a>
### Admin Info

  + Email: admin@cinema.com <br />
  + Name: Omar <br />
  + Surname: Shelbayeh <br />
  + Password: admin <br />

WanderList

The WanderList program is designed to streamline the busy, disorganized process of packing for any trip, big or small. It can help remind you of your essentials, and let you pack from your own personalized inventory. 

Built With

Angular JS
Node JS
SQL
Nodemailer


## Getting Started

Clone or fork the respository from Github, and NPM install the dependencies. You will also need to copy the SQL file into a database interface.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- List other prerequisites here


### Installing

Steps to get the development environment running.

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
```

## Documentation

https://docs.google.com/document/d/1C_LQJe9OmdiIGMvAJTiBnpJ8MmP2AgQ-Ow0yhD1ehSI/edit
Scope Document

### Completed Features

High level list of items completed.

- [x] User populated unique inventory
- [x] Create new packing lists with specific list id
- [x] Checkmarks for knowing what is packed
- [x] Email feature to have the list on hand whenever necessary

### Next Steps

I would like to add weather API to help plan temperature appropriate clothing for the trip. Also intigrate any travel documents


## Authors

Elizabeth Wong


## Acknowledgments

Thank you to my cohort and instructors. 
import Users from "./Users";

Users.sync()
    .then(() => console.info("`users` table has been synced."))
    .catch((err) => console.log(err));



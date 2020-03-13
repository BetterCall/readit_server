import path from "path";

const connectionOptions = {
  type: "postgres",
  name: "default",
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, "entities/*.*s")],
  host: process.env.DATABASE_ENDPOINT,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
};

export default connectionOptions;

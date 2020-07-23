module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "xbl",
  password: "123456",
  database: "koa-test",
  synchronize: true,
  entities: ["src/entity/*.ts"],
};

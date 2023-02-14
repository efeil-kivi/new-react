module.exports = (req, res, next) => {
  let body = eval(req.body);
  console.log(body.username, "--------", body.data);
  if (req.method === "POST" && req.url === "/login") {
    console.log(body.username, "-----", body.data);
    if (req.body.username === "jack" && req.body.password === "1") {
      return req.status(200).json({
        user: {
          token: "1234",
        },
      });
    } else {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    }
  }
  next();
};

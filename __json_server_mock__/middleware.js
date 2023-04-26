module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "1") {
      return req.status(200).json({
        user: {
          token: "1234",
        },
      });
    } else {
      return res.status(200).json({
        user: {
          id: "string",
          name: "string",
          email: "string",
          title: "string",
          organization: "string",
          token: "123",
        },
        message: "error1211，error",
      });
    }
  }
  if (req.method === "GET" && req.path === "/me") {
    if (req.body.username === "jack" && req.body.password === "1") {
      return req.status(200).json({
        user: {
          token: "1234",
        },
      });
    } else {
      return res.status(200).json({
        user: {
          id: "string",
          name: "string",
          email: "string",
          title: "string",
          organization: "string",
          token: "123",
        },
        message: "error1211，error",
      });
    }
  }
  next();
};

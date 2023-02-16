/* craco.config.js */
const CracoLessPlugin = require("craco-less");
module.exports = {
  plugin: [
    {
      plugin: CracoLessPlugin,
      option: {
        lessLoaderOptions: {
          modifyVars: {
            "@primary-color": "rgb(204,0,0)",
            "@front-size-base": "16px",
          },
          javascriptEnabled: true,
        },
      },
    },
  ],
  // ...
};

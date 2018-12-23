require("dotenv").config();
module.exports = {
  production: {
    useEnvVariable: "MONGODB_URI",
  }
};

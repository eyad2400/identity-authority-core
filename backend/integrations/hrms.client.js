module.exports = {
  isAuthorized: (token) => {
    return token === "HRMS_INTERNAL";
  }
};

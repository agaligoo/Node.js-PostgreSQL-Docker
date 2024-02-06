module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    fname: {
      type: Sequelize.STRING,
    },
    lname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    role: {
        type: Sequelize.STRING,
      },
    isactive: {
      type: Sequelize.BOOLEAN,
    },
  });
  return User;
};

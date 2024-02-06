const db = require("../models");

const User = db.users;

// const Op = db.Sequelize.Op;

// Create and Save a new User

exports.create = (req, res) => {
  // Validate request

  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });

    return;
  }

  // Create a User

  const user = {
    fname: req.body.fname,

    lname: req.body.lname,

    email: req.body.email,

    username: req.body.username,

    password: req.body.password,
    
    role: req.body.role,

    isactive: req.body.isactive ? req.body.isactive : false,
  };

  // Save User in the database

  User.create(user)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all User from the database.

exports.findAll = (req, res) => {
  User.findAll()

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)

    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a User by the id in the request

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })

    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })

    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all User from the database.

exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},

    truncate: false,
  })

    .then((nums) => {
      res.send({ message: `${nums} users were deleted successfully!` });
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

// Find all iseactive User

exports.findAllIsactive = (req, res) => {
  User.findAll({ where: { isactive: true } })

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

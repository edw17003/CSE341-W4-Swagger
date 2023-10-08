const db = require('../models');
const Contact = db.contacts;
const mongodb = require('mongodb')

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Contact
  const contact = new Contact({
    _id: req.body._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  });
  // Save Contact in the database
  contact
    .save(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while creating the contact.',
      });
    });
};

exports.findAll = (req, res) => {
  if (req.header('apiKey') === apiKey) {
    Contact.find(
      {},
      {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        favoriteColor: 1,
        birthday: 1
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'An error occurred while retrieving contacts.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Find a single contact with an id
exports.findOne = (req, res) => {
  const _id = req.params._id;
  if (req.header('apiKey') === apiKey) {
    Contact.find({ _id: _id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'Not contact found with id ' + _id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving contact with id ' + _id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Update a single contact by id
exports.updateOne = async (req, res) => {
  const _id = new mongodb.ObjectId(req.params._id);
  const hexString = _id.toHexString();
  const integerId = parseInt(hexString, 16);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  try {
    if (req.header('apiKey') === apiKey) {
      const data = await Contact.replaceOne({ _id: integerId }, contact);
      if (data.n) {
        res.send({ message: 'Contact updated successfully.' });
      } else {
        res.status(404).send({ message: 'Contact not found with id ' + _id });
      }
    } else {
      res.send('Invalid apiKey, please read the documentation.');
    }
  } catch (err) {
    res.status(500).send({
      message: 'Error updating contact with id ' + _id + '. ' + err,
    });
  }
};


// Delete a single contact by id
exports.deleteOne = (req, res) => {
  const _id = req.params._id;
  if (req.header('apiKey') === apiKey) {
    Contact.deleteOne({ _id: _id })
      .then((data) => {
        if (data.deletedCount) {
          res.send({ message: 'Contact deleted successfully.' });
        } else {
          res.status(404).send({ message: 'Contact not found with id ' + _id });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'Error deleting contact with id ' + _id });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};
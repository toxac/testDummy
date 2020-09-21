const db = require("../models/index")
const Idea = db.ideas;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    /*Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    */

    // Create a idea
    const idea = new Idea({
        title: req.body.title,
        description: req.body.description,
        active: req.body.active ? req.body.active : false
    });

    // Save Tutorial in the database
    idea
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while saving new idea."
            });
        });

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            $regex: new RegExp(title),
            $options: "i"
        }
    } : {};

    Ideas.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving ideas."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Idea.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found idea with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving idea with id=" + id
                });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Idea.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Idea with id=${id}. Maybe Idea was not found!`
                });
            } else res.send({
                message: "Idea was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Idea with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Idea.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete idea with id=${id}. Maybe Idea was not found!`
                });
            } else {
                res.send({
                    message: "Idea was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Idea with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Idea.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} ideas were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all ideas."
            });
        });
};

// Find all published Tutorials
exports.findAllActive = (req, res) => {
    Idea.find({
            active: true
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving ideas."
            });
        });
};
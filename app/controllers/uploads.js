'use strict';

const controller = require('lib/wiring/controller');
// const middlewate = require('app/middleware');
// const multer = middleware.multer;
const multer = require('app/middleware').multer;

const models = require('app/models');
const upload = models.upload;


// const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  upload.find()
    .then(uploads => res.json({ uploads }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  upload.findById(req.params.id)
    .then(upload => upload ? res.json({ upload }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let upload = {
    comment: req.body.upload.comment,
    file: req.file,
  };
  res.json({upload})


  // let upload = Object.assign(req.body.upload, {
  //   // _owner: req.currentUser._id,
  // });
  // Upload.create(upload)
  //   .then(upload => res.json({ upload }))
  //   .catch(err => next(err));
};

// const update = (req, res, next) => {
//   let search = { _id: req.params.id, _owner: req.currentUser._id };
//   upload.findOne(search)
//     .then(upload => {
//       if (!upload) {
//         return next();
//       }
//
//       delete req.body._owner;  // disallow owner reassignment.
//       return upload.update(req.body.upload)
//         .then(() => res.sendStatus(200));
//     })
//     .catch(err => next(err));
// };
//
// const destroy = (req, res, next) => {
//   let search = { _id: req.params.id, _owner: req.currentUser._id };
//   upload.findOne(search)
//     .then(upload => {
//       if (!upload) {
//         return next();
//       }
//
//       return upload.remove()
//         .then(() => res.sendStatus(200));
//     })
//     .catch(err => next(err));
// };

module.exports = controller({
  index,
  show,
  create,
  // update,
  // destroy,
}, { before: [
  // { method: authenticate, except: ['index', 'show'] },
  {method: multer.single('upload[file]'), only:['create']}
], });

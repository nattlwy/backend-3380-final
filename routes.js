const router = require('express').Router();
let Book = require('./models');

router.route('/').get((req, res) => {
  Book.find()
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Book.findById(req.params.id)
      .then((book) =>
      res.json(book))
      .catch((err) => res.status(400).json('Error: ' + err));
  });


router.route('/').post(async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const newBook = await new Book({
    title,
    author,
    description
  });

  console.log(newBook);
  // save the new object (newActivity)
  newBook
    .save()
    .then(() => res.json('Book added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});



router.route('/:id').delete(async (req, res) => {
  console.log('delete logged');
await Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').post(async (req, res) => {
  console.log(req.params.id);
await  Book.findById(req.params.id)
    .then((bookforedit) => {
      bookforedit.title = req.body.title;
      bookforedit.author = req.body.author;
      bookforedit.description = req.body.description;


      bookforedit
        .save()
        .then(() => res.json('Book updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;

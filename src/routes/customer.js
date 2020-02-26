const CustomerModel = require('../models/customer.model')
const router = express.Router()

// create new customer
router.post('/customer', (req, res) => {
  if (!req.body) {
    return res.status(404).send('Request body is missing')
  }

  const model = new CustomerModel(req.body)
  model.save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }

      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/customer', (req, res) => {
  if (!req.query.email) {
    return res.status(404).send('Missing URL parameter: email')
  }
  CustomerModel.findOne({
    email: req.query.email
  })
    .then(doc => {
      res.status(201).json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.put('/customer', (req, res) => {
  if (!req.query.email) {
    return res.status(404).send('Missing URL parameter: email')
  }
  CustomerModel.findOneAndUpdate({
    email: req.query.email
  }, req.body, {
    new: true
  })
    .then(doc => {
      res.status(201).json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.delete('/customer', (req, res) => {
  if (!req.query.email) {
    return res.status(404).send('Missing URL parameter: email')
  }
  CustomerModel.findOneAndRemove({
    email: req.query.email
  })
    .then(doc => {
      res.status(201).json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router

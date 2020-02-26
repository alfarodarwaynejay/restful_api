const router = express.Router()

router.get('/person', (req, res) => {
  if (req.query.name) {
    res.send(`You have requested a person: ${req.query.name}`)
  } else {
    res.send('You have requested a person...')
  }
})

router.get('/person/:name', (req, res) => {
  const name = req.params.name
  res.send(`You have requested a person: ${name}`)
})

router.get('/error', (req, res) => {
  throw new Error('This is forced error!')
})

module.exports = router

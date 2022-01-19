/* eslint-disable-file */
const express =  require('express')

const app = express()
const port = 5000

app.use(express.json())

app.post('/validate-address', (req, res) => {
  const { body } = req

  if (body.zip) {
    if (body.zip.toString().includes('105')) {
      res.status(200).send({
        valid: true,
      })
      return
    }

    res.status(200).send({
      valid: false,
    })
    return
  }

  res.status(400).send({
    message: 'Invalid parameter',
  })
})

app.listen(port, () => console.log(`External API running on port ${port}`))

const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname, 'public')));

router.use(express.json());

const {getUser} = require('./database/consultas');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/1', async (req, res) => {
  try {
    const Data = await getUser('Juan')
    res.json(Data)

    const name = Data[0].name

    const password = Data[0].password

    console.log(`Name: ${name}, Password: ${password}`)
  } catch (err) {
    res.status(500).json({ error: 'Error fetching Carros data' })
  }
});

module.exports = router;
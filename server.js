const express = require('express');
const cors = require('cors');

const app = express();
const PORT =5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Сервер працює. Надсилай POST на /form-api');
});

app.post('/form-api', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Поля не заповнено' });
  }

  console.log(`Отримано форму: Email = ${email}, Password = ${password}`);
  res.json({ message: 'Дані прийнято', email });
});

app.listen(PORT, () => {
  console.log(` Сервер запущено на http://localhost:${PORT}`);
});

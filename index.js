const express = require('express');
const app = express(); //create express application

app.get('/', (req, res) => {
  res.send('Welcome to Class');
});

app.get('/studentclass/:id', (req, res) => {
  return new Promise((resolve, reject) => {
    let id = parseInt(req.params.id);
    let p1 = Promise.resolve();
    if (id) {
      p1 = fetchBasisClassId(id)
    } else {
      p1 = Promise.reject({ message: 'Please enter id' })
    }
    p1
      .then((result) => {
        let finalObj = {};
        finalObj['No of Students'] = result && result[0] && result[0]['count(*)'] ?  result[0]['count(*)'] : 0;
        return res.send(finalObj);
      })
      .catch((err) => {
        return res.status(404).send({message: err });
      });
  })
});
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});

function fetchBasisClassId(id) {
  const connection = require('./connection.js');
  return new Promise((resolve, reject) => {
    let sql = 'select count(*) from school.studentclass where fk_id_class=?';
    connection.query(sql, [id], function (err, result) {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}


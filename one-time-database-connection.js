const connection = require('./connection.js');
  var newPromise = new Promise((resolve, reject) => {
    connectDatabase()
      .then(() => {
        return createDatabase();
      })
      .then(() => {
        return createClassTable();
      })
      .then(() => {
          return createStudentTable();
        })
        .then(() => {
          return createStudentClassTable();
        })
        .then(() => {
            return insertClassData();
          })
          .then(() => {
            return insertStudentData();
          })
          .then(() => {
            return insertStudentClassData();
          })
      .then(resolve)
      .catch(reject);
  });
  function connectDatabase() {
    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          return reject(err);
        } else {
          console.log('DATABASE CONNECTED SUCCESSFULLY')
          return resolve();
        }
      })
    });
  }
  function createDatabase() {
    return new Promise((resolve, reject) => {
      connection.query(`CREATE DATABASE IF NOT EXISTS school`, (err) => {
        if (err) {
          return reject(err);
        } else {
          console.log('CREATED DATABASE SUCCESSFULLY')
          return resolve();
        }
      })
    });
  }
  function createStudentTable() {
    return new Promise((resolve, reject) => {
      connection.query('CREATE TABLE IF NOT EXISTS school.student (id int(11) NOT NULL , name varchar(255) NOT NULL , PRIMARY KEY (id))', (err) => {
        if (err) {
          return reject(err);
        } else {
          console.log('CREATED STUDENT TABLE SUCCESSFULLY')
          return resolve();
        }
      })
    });
  }
  function createClassTable() {
      return new Promise((resolve, reject) => {
        connection.query('CREATE TABLE IF NOT EXISTS school.class (id int(11) NOT NULL , class_name varchar(255) NOT NULL , PRIMARY KEY (id))', (err) => {
          if (err) {
            return reject(err);
          } else {
            console.log('CREATED CLASS TABLE SUCCESSFULLY')
            return resolve();
          }
        })
      });
    }
    function createStudentClassTable() {
      return new Promise((resolve, reject) => {
        connection.query(`CREATE TABLE IF NOT EXISTS school.studentclass (id int(11) NOT NULL , fk_id_student INT, fk_id_class INT , 
        FOREIGN KEY (fk_id_student) REFERENCES student(id) , FOREIGN KEY (fk_id_class) REFERENCES class(id) , PRIMARY KEY (id))`, (err) => {
          if (err) {
            return reject(err);
          } else {
            console.log('CREATED TABLE STUDENT CLASS SUCCESSFULLY')
            return resolve();
          }
        })
      });
    }
    function insertStudentData() {
        return new Promise((resolve, reject) => {
          connection.query(`INSERT into school.student (id , name) values (1,'RAM'),(2,'SUYASH'),(3,'SHYAM')`, (err) => {
            if (err) {
              return reject(err);
            } else {
              console.log('INSERTED DATA IN STUDENT SUCCESSFULLY')
              return resolve();
            }
          })
        });
    }
    function insertClassData() {
        return new Promise((resolve, reject) => {
          connection.query(`INSERT into school.class (id , class_name) values (1,'10th'),(2,'11th'),(3,'12th')`, (err) => {
            if (err) {
              return reject(err);
            } else {
              console.log('INSERTED DATA IN CLASS SUCCESSFULLY')
              return resolve();
            }
          })
        });
    }
    function insertStudentClassData() {
        return new Promise((resolve, reject) => {
          connection.query(`INSERT into school.studentclass (id , fk_id_class, fk_id_student) values (1,1,1),(2,1,2),(3,1,3),(4,2,1),(5,3,2)`, (err) => {
            if (err) {
              return reject(err);
            } else {
              console.log('INSERTED DATA IN STUDENTCLASS SUCCESSFULLY')
              return resolve();
            }
          })
        });
    }
  newPromise
    .then(() => {
      return Promise.resolve();
    })
    .catch((err) => {
      return Promise.reject(err);
    })
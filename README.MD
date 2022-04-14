### To install packages
```
Before running the project run below command
npm i 
```

## Install mysql if not installed

```
brew install mysql@5.7
echo 'export PATH="/usr/local/opt/mysql@5.7/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile
brew services start mysql@5.7
mysql_secure_installation
```

## Install mysql if not installed

```
Before starting the server run below command to run onetime scripts
node one-time-database-connection.js
```

## Start the node server using below command

```
nodemon 
or 
node index.js
```

### Please Note:

```
This Project can be tested by using postman or by running below url on browser
http://localhost:3000/studentclass/3
where 3 represents the class id
```
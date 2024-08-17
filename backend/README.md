# Shelfshare

## How to install local MongoDB

For installing MongoDB on your computer, follow steps outine in [this](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/) guide.

Once installed, you can start you local MongoDB instance by running:
```
sudo service mongod start
```

## Connecting to local MongoDB instance

Install MongoDB shell:
```
sudo apt-get install -y mongodb-mongosh
```

Connect to local MongoDB instance:
```
mongosh
``` 

Once connected, you can view and inspect all existing databases and collections:
```
show dbs # list databases
use shelfshare # use shelfshare db, this will let you browse collections inside shelfshare db
show collections # lists collections inside used db
db.book.find().pretty() # list items in books collections
```
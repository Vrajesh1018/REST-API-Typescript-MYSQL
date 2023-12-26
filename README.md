# REST-API-Typescript-MYSQL
REST API using typescript and MYSQL. It's Contains Session management also


To run project first download from this repository and install necessary packages using npm i command.

Now if your System contains openssl then create two keys privateKey.pem and publicKey.pem. 
To create that two keys use following commands


ssh-keygen -t rsa -b 2048 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
Now move this two files into config folder.

Tables :- 
users( email(pk), name, password, createdAt, updatedAt)
sessions(id(AI,PK), user(ref email users), valid, userAgent, createdAt, updatedAt)


That's it Now type npm run dev.

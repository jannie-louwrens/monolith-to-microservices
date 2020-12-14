# Cayambe Monolith Setup

Instructions to configure and run the Cayambe monolith version.

## Requirements

- Java 11
- Wildfly 20.0.1.Final
- Docker 20.10.0
- Docker Compose 1.25.0
- MySQL 8.0.21
- MySQL Java Connector 8.0.20

## Docker & Docker Compose
See the instructions in the parent module's [README](../README.md)

### Starting a MySQL database.
See the instructions in the parent module's [README](../README.md)

### Connecting to the Mysql database.
You can use your favorite SQL client to connect to the Mysql database to create the `cayambe-monolith` user and the `cayambe_monolith` database.
Afterwards you can use the sql scripts inside the `sql/cayambe-monolith` directory to create the schema and import the test data.

### Connecting to the Mysql database using the command line.

#### Starting a MySQL command line client.
While the Mysql database container is running open a new terminal in the directory where this source code was checked out and execute the commands:
```shell
docker exec -it mysql /bin/bash
```

#### Creating the database schema and importing the test data.
Connect to the MySQL server via the command line client:
```shell
mysql -h127.0.0.1 -P3306 -uroot -ppassword
```
Create the user `cayambe-monolith`:
```mysql
create user 'cayambe-monolith'@'%' identified by 'cayambe';
```
Grant privileges to the user:
```mysql
grant all privileges on *.* to 'cayambe-monolith'@'%' with grant option;
```
Create the database:
```mysql
create database cayambe_monolith;
```
Create the tables and import the data:

:information_source: NOTE: the MySQL database container was created with a volume mounted with the directory where the code was checked out. 
If you experience any problems with the following commands to source the SQL script files, do check that the docker-compose yaml file to correct the directory for mounting the volume.
```mysql
use cayambe_monolith;

source /home/sql/sql/cayambe-monolith/cayambe-monolith-schema.sql

source /home/sql/sql/cayambe-monolith/cayambe-monolith-test-data.sql
```

## Setup Wildfly
See the instructions in the parent module's [README](../README.md)

## Compile the source code
:information_source: NOTE: Make sure to use Java 11.

Run `mvn clean package` in `/cayambe-monolith`.

## Deploy Cayambe Monolith into Wildfly

Copy `cayambe-monolith/cayambe-ear/target/cayambe.ear` into `/standalone/deployments` of WildFly.

## Start Wildfly

Run `bin/standalone.sh` in Wildfly directory.

## View the application

Open an internet browser and navigate to http://localhost:8080

![Cayambe](images/cayambe.png?raw=true "Cayambe")

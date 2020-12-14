# Cayambe Hybrid Setup

Instructions to configure and run the Cayambe hybrid version.

## Requirements

- Java 11
- Wildfly 20.0.1.Final
- MySQL 8.0.21
- MySQL Java Connector 8.0.20
- Keycloak 11.0.3
- Quarkus 1.10.2.Final
- Angular 10.0.6
- Node.js 12.19.0
- Yarn 1.22.5
- Kafka
- Docker 20.10.0
- Docker Compose 1.25.0

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
#### Setup the `cayambe-hybrid` database:
Create the user `cayambe-hybrid`:
```mysql
create user 'cayambe-hybrid'@'%' identified by 'cayambe';
```
Grant privileges to the user:
```mysql
grant all privileges on *.* to 'cayambe-hybrid'@'%' with grant option;
```
Creat the `cayambe_hybrid` database:
```mysql
create database cayambe_hybrid;
```
Create the tables and import the data (do this while inside the `cayambe-hybrid-parent` directory):
```mysql
use cayambe_hybrid;

source /home/sql/sql/cayambe-hybrid/cayambe-hybrid/cayambe-hybrid-schema.sql

source /home/sql/sql/cayambe-hybrid/cayambe-hybrid/cayambe-hybrid-test-data.sql
```
#### Setup the `cayambe-category` database:
Create the user `cayambe-category`:
```mysql
create user 'cayambe-category'@'%' identified by 'cayambe';
```
Grant privileges to the user:
```mysql
grant all privileges on *.* to 'cayambe-category'@'%' with grant option;
```
Creat the `cayambe_category` database:
```mysql
create database cayambe_category;
```
Create the tables and import the data (do this while inside the `cayambe-hybrid-parent` directory):
```mysql
use cayambe_category;

source /home/sql/sql/cayambe-hybrid/category-service/category-schema.sql

source /home/sql/sql/cayambe-hybrid/category-service/category-test-data.sql
```
#### Setup the `cayambe-payment` database:
Create the user `cayambe-payment`:
```mysql
create user 'cayambe-payment'@'%' identified by 'cayambe';
```
Grant privileges to the user:
```mysql
grant all privileges on *.* to 'cayambe-payment'@'%' with grant option;
```
Creat the `cayambe_payment` database:
```mysql
create database cayambe_payment;
```
Create the tables and import the data (do this while inside the `cayambe-hybrid-parent` directory):
```mysql
use cayambe_payment;

source /home/sql/sql/cayambe-hybrid/payment-service/payment-schema.sql
```

## Setup Wildfly
See the instructions in the parent module's [README](../README.md#setup-wildfly)

## Setup & Run Keycloak
See the instructions in the parent module's [README](../README.md#setup-keycloak)

## Setup Cayame Hybrid
#### Compile the source code

Run `mvn clean package` in `/cayambe-hybrid-parent/cayambe-hybrid`.

#### Deploy Cayambe Hybrid into Wildfly

Copy `cayambe-hybrid-parent/cayambe-hybrid/cayambe-ear/target/cayambe.ear` into `/standalone/deployments` of WildFly.

#### Start Wildfly

Run `bin/standalone.sh` in Wildfly directory.

#### View the Cayambe Hybrid application

Open an internet browser and navigate to http://localhost:8080

## Setup Cayambe Stripe Microservice
#### Create a Stripe Account
Go to https://dashboard.stripe.com/register to create an account and enter your email, name, password and hit the Create account button.

#### Start Cayambe Stripe Microservice

```shell
cd /cayambe-hybrid-parent/stripe-service
mvn compile quarkus:dev
```

## Start Cayambe Payment Microservice

```shell
cd /cayambe-hybrid-parent/payment-service
mvn compile quarkus:dev
```

## Start Cayambe Category Microservice

```shell
cd /cayambe-hybrid-parent/category-service
mvn compile quarkus:dev
```

## Start Cayambe Category UI

```shell
cd /cayambe-hybrid-parent/category-ui
yarn start
```

#### View the Cayambe Category application

Open an internet browser and navigate to http://localhost:8081

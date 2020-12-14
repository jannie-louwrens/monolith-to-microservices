# Monolith To Microservices

This is the source code for my article [Maintaining Legacy Applications - Part Two](https://www.linkedin.com/pulse/maintaining-legacy-applications-part-two-jannie-louwrens/).

## Requirements

- Java 11
- Wildfly 20.0.1.Final
- Docker 20.10.0
- Docker Compose 1.25.0
- MySQL 8.0.21
- MySQL Java Connector 8.0.20
- Keycloak 11.0.3
- Quarkus 1.10.2.Final
- Angular 10.0.6
- Node.js 12.19.0
- Yarn 1.22.5
- Kafka
- Debezium

## Docker & Docker Compose
Install [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) for your platform.

### Starting a MySQL database.
Open a terminal in the directory where this source code was checked out and execute the commands:
```shell
cd docker/mysql
docker-compose up
```
Verify that the MySQL server starts. You should see output similar to the following:
```shell
2020-12-10T07:46:33.804006Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.22'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
```

## Setup Wildfly
Download WildFly 20.0.1.Final from http://wildfly.org/downloads/

Download MySQL Connector jar from https://dev.mysql.com/downloads/connector/j/

Create directory structure in the WildFly exploded location of `/modules/com/mysql/main`

Copy `mysql-connector-java-8.0.20.jar` for MySQL Connector into this directory.

Create a file in the same directory called `module.xml` with the following content:

```xml
<?xml version='1.0' encoding='UTF-8'?>

<module xmlns="urn:jboss:module:1.1" name="com.mysql">

    <resources>
        <resource-root path="mysql-connector-java-8.0.20.jar"/>
    </resources>

    <dependencies>
        <module name="javax.api"/>
        <module name="javax.transaction.api"/>
    </dependencies>
</module>
```
...where the file name specified in `path` is the same as the file you copied into the directory.

Edit `/standalone/configuration/standalone.xml` within WildFly installation to have the following `datasources` subsystem config:

```xml
<subsystem xmlns="urn:jboss:domain:datasources:6.0">
    <datasources>
        <datasource jndi-name="java:jboss/datasources/ExampleDS" pool-name="ExampleDS" enabled="true" use-java-context="true" statistics-enabled="${wildfly.datasources.statistics-enabled:${wildfly.statistics-enabled:false}}">
            <connection-url>jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE</connection-url>
            <driver>h2</driver>
            <security>
                <user-name>sa</user-name>
                <password>sa</password>
            </security>
        </datasource>
        <datasource jta="true" jndi-name="java:/CayambeMonolith" pool-name="CayambeMonolith" enabled="true" use-ccm="true">
            <connection-url>jdbc:mysql://localhost:3306/cayambe_monolith</connection-url>
            <driver>mysql</driver>
            <security>
                <user-name>cayambe-monolith</user-name>
                <password>cayambe</password>
            </security>
        </datasource>
        <datasource jta="true" jndi-name="java:/CayambeHybrid" pool-name="CayambeHybrid" enabled="true" use-ccm="true">
            <connection-url>jdbc:mysql://localhost:3306/cayambe_hybrid</connection-url>
            <driver>mysql</driver>
            <security>
                <user-name>cayambe-hybrid</user-name>
                <password>cayambe</password>
            </security>
        </datasource>
        <drivers>
            <driver name="h2" module="com.h2database.h2">
                <xa-datasource-class>org.h2.jdbcx.JdbcDataSource</xa-datasource-class>
            </driver>
            <driver name="mysql" module="com.mysql">
                <driver-class>com.mysql.cj.jdbc.Driver</driver-class>
                <xa-datasource-class>com.mysql.cj.jdbc.MysqlXADataSource</xa-datasource-class>
            </driver>
        </drivers>
    </datasources>
</subsystem>
```

## Setup Keycloak
Download the standalone server distribution from the [Keycloak website](https://www.keycloak.org/) and unzip it.
Open a terminal and start the server with:
```shell
bin/standalone.sh -Djboss.socket.binding.port-offset=1010
```
Open an internet browser and navigate to http://localhost:9090/auth.

Follow the [Getting Started](https://www.keycloak.org/docs/latest/getting_started/index.html#creating-the-admin-account) instructions to setup the administrator account.

### Import cayambe-realm.json
While in Keycloak click on `Add realm` then click the `Select file` button and find [cayambe-realm.json](keycloak/cayambe-realm.json) in the `keycloak` directory then finally click the `Create` button.

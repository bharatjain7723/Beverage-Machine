# Beverage Machine

This project is created using **NodeJs, ExpressJs and MongoDB**. **MongoDB Atlas** is used to store/view the documents. **AWS SES** Email Services is used to notify the beverage machine authority when the machine is out of ingredient(s). **Mocha** is used to conduct several tests on the APIs.

It is  a system which automates beverage vending machine. The main functions of this
system are:
1. Displays all beverages that the machine can dispense
2. Dispensing correct beverage. Vending machine comes with 4 varieties of coffee:
   * Black coffee: 3 units of water, 1 unit of coffee, 1 unit of sugar 
   * Coffee with milk: 1 unit of water, 1 unit of coffee, 2 units of milk, 1 unit of sugar
   * Above two variants also come with respective sugarless versions where the 1 unit of sugar is not used.
3. Managing the inventory:
The vending machine has limited inventory and it notifies the staff when it has run out of any of the ingredients. Also, it has the ability to gracefully stop the orders of the beverages which don’t have sufficient ingredients. The system provides a way to top up the stock of the ingredients.

## Table of content
- [Assumptions](#assumptions)
- [Installation](#installation)
    - [NodeJs](#nodejs)
    - [Packages](#packages)
- [MongoDB Atlas setup](#mongodb-atlas-setup)
    - [Setup](#setup)
    - [Configuration](#configuration)
- [API](#api)
    - [Postman](#postman)
- [Start the Project](#start-the-project)
- [Test the Project](#test-the-project)
    
## Assumptions

1. If the units of current ingredients are less than the units needed to disperse a particular beverage, the machine won't allow it and API will return a result accordingly.
2. For our problem statement, we need only 4 beverages but the authority could add more beverages as well if they want to scale. Provided, those beverages includes the combination of the 4 main ingredients (i.e. Coffee, Water, Milk and Sugar) only. 

## Installation

### NodeJs
This project uses NodeJs runtime environment. If you don't have it installed in you machine. Install the latest version of NodeJs from their [website](https://nodejs.org/)

### Packages
Run ```npm install``` to install the packages.

## MongoDB Atlas Setup

### Setup
MongoDB Atlas requires creating an account on [MongoDB](https://mongodb.com) and then from the Main menu choose *Cloud* and then *Atlas*. You can watch [this](https://www.youtube.com/watch?v=KKyag6t98g8) video for a step by step guide on creating a **Cluster**.

### Configuration

With the new configuration you got after the setup, replace your credentials in the **configuration.json** file.

## API

### Postman

You can import this [collection](https://www.getpostman.com/collections/4e9cbf0e834a104496b9) of the API in the postman.

## Start the Project

Run ```npm start``` to run the project.
You can also run ```nodemon index.js --port=<port number> --debug``` to run in debug mode or you can remove the *--debug* flag.

Note: nodemon is a tool that helps develop Nodejs based applications by automatically restarting the node application when file changes in the directory are detected. It will get installed along with the packages.

## Test the Project

Run ```npm test``` to test the project with various test cases.

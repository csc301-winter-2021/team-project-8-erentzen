APP ID = '9ed99941896e2cb6a98ffca8372e624a'
APP SECRET = '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'

# Team 08-Erentzen

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 

## Description 
 * Provide a high-level description of your application and it's value from an end-user's perspective
 * What is the problem you're trying to solve?
 * Is there any context required to understand **why** the application solves this problem?

We are planning to build a Shopify embedded application that can be deployed in-house by small retailers to update inventory in real time for their online stores. Our application is targeted to users who are not tech-savvy and want to keep their inventory data online and in-store synchronized.

The creation of the app is largly related to the COVID-19 pandemic and the increase in traffic of online storefronts of local retailers, where they see a lot of technical issues during this transition.

## Key Features
 * Described the key features in the application that the user can access
 * Provide a breakdown or detail for each feature that is most appropriate for your application
 * This section will be used to assess the value of the features built

Inventory: users are able to interact the inventory info of the product they recorded in their online store. They can sort the products listing according to stock amount or price, etc. Products with low stock can be highlighted in the listing. Users can download a spreadsheet of inventory info which they can make changes and re-upload to apply the changes.

Dashboard: users are able to get a quick insight on the inventory updates.
Low stock products are shown by pie chart and form. Pie chart gives a general percentage on the inventory. The form gives the user a concise knowledge of what products to get stocked.
Recent order data are shown in form

Inventory Update: users are able to update the amount of each product in their inventory. Users could upload a csv file that contains the list of products that need to be updated, or, search the product by product ID and enter the amount of changes manually.  

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully

This application is aimed to be an Spotify App, therefore it would be linked to the store and accounts are not needed.

The user is first shown with the dashboard, which shows a brief peek of the state of the inventory.

Through the navigation bar, user can navigate between the Dashboard, Inventory or Orders*(inventory update)* pages.

In the inventory page, the user can sort the products listing according to stock amount or price etc by clicking on the headers of the column. Products with low stock or products that in the state of a pending transaction are shown in separate tabs. Users can download a spreadsheet of inventory info which they can make changes and re-upload to apply the changes through the inventory update module.

In the Orders *(inventory update)* page, the user can upload a CSV file and then update the CSV file through the form atop the table, and then use the confirm button to confirm the changes.

 
 ## Development requirements
 ### Prerequisites
The app can be run on any machines.

The machine must have **node** and **react** installed on the computer in order to run the app locally. Additionally, npm must also be available in order to install all other dependencies and packages described in package.json.

Before running the app, input this command into the bash/powershell terminal:
`npm install` 

### Running the code
The app can be started by running the following command:
`npm run dev`

This will start the react frontend as well as the node backend

After this, the application can be accessed through a popup or 127.0.0.1:3000 or localhost:3000

 
 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members share a codebase, avoid conflicts and deploys the application.

 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Describe your overall deployment process from writing code to viewing a live application
 * What deployment tool(s) are you using and how
 * Don't forget to **briefly explain why** you chose this workflow or particular aspects of it!

At the start of deliverable 2, the two team members that were responsible for development set-up simply committed to the main branch since our application was only run locally and the rest of the team were not in the coding phase of their respective tasks. As the other members begin to develop their assigned application pages, they would test their features locally and push to the development branch. We deployed our application using Heroku which is configured to synchronize with GitHub and automatically deploys from the main branch of our repository. The separation of new features that are still under testing and code that is already deployed allows for easy testing and ensures that our application is always online and functioning for our customers. After the features are fully implemented and tested, the same two team members will review and merge the branches accordingly. As the application becomes more complex, we plan to have individual development branches for each new feature, instill commit message standards and utilize pull-requests to better track the stages of development for each branch and ensure a smoother reviewing process.

## Licenses

This project is licensed under the terms of the MIT license.
We will be using the MIT license as it's simple but still business friendly and open source friendly. It is also very permissive. 
The partner expressed that he prefers open source licensing as he often participates in creating open source code and giving back to the community.

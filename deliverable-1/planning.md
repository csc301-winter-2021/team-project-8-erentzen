# ERENTZEN/MEOW

## Product Details
 
#### Q1: What are you planning to build?

We are planning to build a client that can be deployed in-house by small retailers that will update inventory in real time for Shopify. Our web application will be embedded within Shopify. Many small retailers have their own online store on platforms like shopify. They often encounter inventory management synchronization issues. For example, a customer looked up inventory on the retailer website, went to the store in person but the product was in fact out of stock. Our product will both accept inventory updates from the online store and push updates to the store. 


#### Q2: Who are your target users?

Personas:
- Fred is so frustrated with his Shopify store. Recently, he opened a small local store in the town.  It is nice to make more sales locally, however, the complaints from his online customers make things difficult.  Many online customers make an order of a product, but that product they order is actually out of stock since Fred has sold it in the new local store. 
- Lucas is 34 and owns a local retail store that sells electronic products, but never had experience operating an online store. Due to the covid, there is barely a customer in his local store, so he is willing to start an online store on Shopify. He is tech-savvy and wants to set up an organized system to keep track of his inventory. 
- Tracy is a merchant currently working on both online and local shops. She is using a web app provided on Shopify for managing her inventory. But, the monthly fee of the app is way too high compared to her revenue. She is thinking of changing to a different app with a similar feature to do the inventory managing, but with a lower fee. She is not very good at learning new technology, so she hopes the transform between apps could be convenient. 


#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

   Our inventory management application will allow local merchants to automatically synchronize their stock levels across various sales platforms and save the time of performing such tasks manually. Users will be able to efficiently examine their inventory and restock when short on products. Hence, the chance of losing customers who ordered on site or looked up the inventory on company website but can’t purchase the product in store will be dramatically reduced. Our system will be easy to operate even for non tech-savvy users. Although such services are already available, unlike them our service will come free of charge in order to help local small businesses lessen their burden during this harsh pandemic. Furthermore, our application is only responsible for inventory management and will not lock users into our ecosystem by forcing multiple services on their entire sales operation.


#### Q4: How will you build it?

The tech stack that we’ll be using will consist of React frontend and Node backend. We’ll be using mySQL as our database to store all our information as well. We’ll also be using Next.js framework to set everything up and will be using GraphQL to interact with the Shopify API that we’ll be heavily using. Deployment will be done through Heroku, and testing will be done through Mocha, which has both backend and frontend testing functionality. Additionally, we also have access to an actual store through Shopify and further development/staging testing can be done there. 

As for a high level overview, we will be separating frontend and backend. 
Since we’ll be using Next.js, most of our pages will be in a folder that Next.js built called Pages. Any endpoints that we need will be in its own separate folder called the ‘services’. The actions that are required to do will be stored in a folder called ‘actions’. Any logic that needs to be done with the data and changes the state (decided by actions) will also be in its own folder called ‘reducers’. 
As for the backend, each separate Model will have its own folder with an overarching server.js to start and connect with our database.

The components we require for now are:
- manual change inventory -- where the user can add or delete products
- parse csv inventory -- parse the users inventory and store in our database
- automatic update through shopify when purchasing -- automatically update our database to reflect transaction done through shopify
- display inventory -- allow user to check their stock level
- pending transactions -- keep track of who may be in the midst of purchasing to avoid conflict with multiple transactions
- notify when low on a product after a certain threshold
- add/delete items to inventory -- where the user can delete or add stock

![alt text](https://github.com/csc301-winter-2021/team-project-8-erentzen/blob/main/deliverable-1/diagrams.png)

#### Q5: What are the user stories that make up the MVP?

1. Retailer keeps inventory using a spreadsheet and does not have an inventory management solution in place.

As a complete new retailer with no technical background, I want to create  and configure my e-commerce store without knowing any technical detail in the solution.(easy to operate)

Acceptance criteria:  Given that the new retailer wants to create an e-commerce store without learning the technical knowledge, when the retailer logs in to the account then can he/she update the inventory history by uploading the sales spreadsheet or integrating with the POS system.

2. Retailer has an inventory management system that is not integrated with their POS system.
As an e-commerse retailer, I want to automatically and timely update my inventory and POS system in order to efficiently track and restore the stock.

Acceptance criteria: Given that the retailer wants to update the inventory automatically and timely, when he/she integrates the management system with the POS system then the inventory can be updated once a purchase is done on the POS system.

3. As an e-commerse retailer, I want to automatically synchronize the stock levels across multiple POS systems in order to support my business on different platforms.(synchronize multi platform)

Acceptance criteria: Given the retailer wants to synchronize the inventory across different POS systems, when he/she integrates the management system with multiple POS systems supported by the software then the inventory can be updated once a purchase is done on any of the POS systems.

Retailer has a fully integrated inventory management solution including POS.
 
4. As a retailer having experience in multiple inventory management solution platforms, I want a free application on SaaS solutions in order to lessen my burden running the business. (free of charge)

Acceptance criteria: Given the retailer wants to lessen the budget spending on the inventory management system, when he signs up for an account on this application then he can come free of charge to access any functions provided.

5. As a retailer having experience in multiple inventory management solution platforms, I want to use a flexible inventory management solution that can accommodate with other services so that I can customize the ecosystem that is best for my business.  (flexible)

Acceptance criteria: Given the retailer doesn’t want to be locked into an ecosystem, when he uses the application then will we only be responsible for the inventory management and we will not force the users to use any other services.

----
## Intellectual Property Confidentiality Agreement 

Our partner has agreed to make the product open-source under the MIT license.

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

Describe the different roles on the team and the responsibilities associated with each role. 
 * Roles should reflect the structure of your team and be appropriate for your project. Not necessarily one role to one team member.

List each team member and:
 * A description of their role(s) and responsibilities including the components they'll work on and non-software related work
 * 3 technical strengths and weaknesses each (e.g. languages, frameworks, libraries, development methodologies, etc.)

#### Q7: What operational events will you have as a team?

We will conduct meetings on Thursday 12 AM Eastern Time every week on Zoom since group members are currently residing in different countries. During these weekly meetings, we will reflect on our progress for the past week by reviewing the goals we have set in the previous meeting. Any members who are encountering problems in their respective share of work can discuss with the group while the team troubleshoots collectively. Furthermore, the members will set out goals for the next week using Trello, our progress management tool of choice. Lastly, we will prepare the necessary information for the meeting with our partner, including the progress report or issues that that requires their opinion. Aside from the team gathering, members who are responsible for the same or related components of the application will organize coding sessions at their own convenience. Such sessions can dramatically boost our efficiency and ensure the team gathering is focused on issues that involve the entire group. 

In the first meeting with our partner, we began with self-introductions for each of the members and also got to know our partner better. Every member highlighted their technical strengths and experiences with the partner. Moreover, the partner clarified his vision of the product and some expectation details which allowed for planning of different components of the application. For example, the project partner worked through many persona and user stories of our software. 

The second meeting was much more focused on resolving practicability issues with our original proposal. To illustrate, the goal of our product is to automate the inventory management process as much as possible. However, local merchants may deploy a variety of point-of-sale systems and implementing a solution for all of these options is not feasible for our time frame and small team. Furthermore, the project partner reviewed our low-fidelity prototypes and gave many constructive criticisms for us to continue building our prototype. As a result of these meetings, we were more certain of the expectation for our product and the possible use cases. 

The meetings with project partner will repeatedly take place on Friday 11 AM eastern time. 

*meeting minutes added to repo*

  
#### Q8: What artifacts will you use to self-organize?

We’ll be using Trello as our main to do list. And we’ll be using Slack as our main communication form especially with our partner. Advanced meeting invitations will also be sent out through Google Calendar. 

In Trello, we have set up a ToDo list for all tickets that still haven’t been picked up by anyone to do. There is also a Doing list for tickets that are in the process of being completed. A Test and Review for tickets that are done but still need to be reviewed and tested by somebody else. A Done list for all tickets that are completed. Lastly, there will be a Priority list where we will put any component that we need to rush out, or any major bugs that need to be fixed. We will aim to assign all tickets in the Priority list before assigning items in the ToDo list. Additionally, for each ticket we can attach members to it which will indicate who is in charge of completing the ticket, we will decide the member based on their strength and/or workload. There is also the option of attaching a due date for each ticket, allowing us to estimate how long it’ll take us to finish and allow us to modify our schedule if need be. 

Any ticket will go through the life cycle of starting from the ToDo or Priority lists, and will be picked up by a member and moved to do the Doing list. When completed they will move it to the Test and Review list and wait for someone to review it. After all corrections, if any, are made, it will then be moved into the Done list. 

#### Q9: What are the rules regarding how your team works?

We will use slack as our day-to-day collaboration platform. Our partner is also in the same slack channel and we will communicate our progress routinely with the partner. The team members are located in different time zones, hence Slack would be a good tool for issues and responses (asynchronous). For synchronous meetings, we have set  a meeting with our partner every Friday at 11AM. For ourselves, we have decided to meet every Thursday at midnight. All other meetings will be decided as a group, when a meeting is scheduled, all members are expected to attend. 

Scenario 1: A team member does not respond to messages
We would assume this member is asleep due to time difference and wait for their response on Slack or WeChat. If we waited for longer than what we could reasonably expect, we should call this member to find out why.

Scenario 2: A team member complaints too much work assigned, or being busy on other course work.
We would re-weight the work to future jobs so that the workload is shared fairly.

Scenario 3: Team members have a major disagreement on a project decision.
We would vote on the options we have and choose the one that is commonly agreed.

----
## Highlights

Specify 3 - 5 key decisions and/or insights that came up during your meetings
and/or collaborative process.

 * Short (5 min' read max)
 * Decisions can be related to the product and/or the team process.
    * Mention which alternatives you were considering.
    * Present the arguments for each alternative.
    * Explain why the option you decided on makes the most sense for your team/product/users.
 * Essentially, we want to understand how (and why) you ended up with your current product and process plan.
 * This section is useful for important information regarding your decision making process that may not necessarily fit in other sections. 

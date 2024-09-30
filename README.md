# Team 3 - Market Order Book, Trade matching
This microservice provides a stub for a market (or an exchange). This will provide remaining services which are critical for a functioning trading platform.

**Team Members** 
---------------------------------------------------------------------------------------------------------------------------


Mona Shaban - Business Analyst \
Srushti Thakre - UI/UX Developer \
Revanth Guntupalli - Microservice Developer \
Niharika Jamble - Database Design \
Mohammed Hannan Desai - Devops & Testing 

**Far Vision** 
---------------------------------------------------------------------------------------------------------------------------


The ultimate goal for the Order Book and Trade Matching module is to build a sophisticated trading platform that operates efficiently and transparently. This platform will serve as the core of the trading system, enabling users to engage in seamless transactions. The order book will provide real-time updates, displaying live market depth, allowing both buyers and sellers to view current prices and quantities at various levels. This transparency will help users make informed decisions by showcasing available supply and demand, thereby driving competitive pricing.
In the future, the platform will utilize advanced algorithms to match orders in real time, ensuring that trades are executed swiftly and accurately. The system will be capable of handling high volumes of trades with precision, making it reliable for users even during peak trading periods. It will also feature comprehensive reporting and analytics, enabling users to track historical transactions, market trends, and personal trading performance. Ultimately, this module will create an environment where users can confidently and efficiently conduct trades, benefiting from a fair, fast, and transparent marketplace.
This product can then be expanded to trade in multiple markets.


**Near Vision**
---------------------------------------------------------------------------------------------------------------------------

The near vision for this trading platform could focus on establishing a strong foundation with essential features that deliver immediate value to early users. Here’s a potential outline:

- Buy/Sell Order Placement: Enable users to seamlessly place and manage buy and sell orders for office commodities on the platform. This will establish the core trading functionality early on.

- Real-Time Market Display: Provide users with a dynamic, real-time display of all active buy and sell orders, showing quantities and prices. This helps in promoting transparency and aids users in making informed decisions.

- Basic Trade Matching Feature: Implement an initial version of the trade matching system to automatically pair buyers and sellers based on price and quantity. This feature will ensure efficient trade execution, helping minimize delays and discrepancies.

- Market Depth Visualization: Introduce a feature to display market depth, showing users the available quantities and prices at different levels. This will give a clear view of market dynamics, helping users plan their trades better.

- Limited Market Launch: Focus the platform’s initial rollout on a specific region or a narrow commodity segment to test functionality, gather feedback, and improve the system before expanding globally.

- Basic User Interaction Tools: Offer essential tools for users to track orders, view transaction history, and analyze basic market trends, ensuring they have control over their trades and decisions.

**Stakeholder Types**
---------------------------------------------------------------------------------------------------------------------------

1. **Buyers**: Buyers rely on the Order Book and Trade Matching module to access real-time market data, including prices and available quantities. They use this information to place competitive bids, ensuring they get the best possible deals on office supplies. Buyers benefit from the transparency and speed of the system, allowing them to make informed decisions and execute trades swiftly.

2. **Sellers**: Sellers utilize the module to gain visibility into buyer demand and market conditions. By seeing current buy orders and price trends, sellers can adjust their pricing strategies to maximize profits and ensure quick sales. The platform’s transparent and efficient matching system allows sellers to reduce the time their products remain unsold, thus optimizing their trading experience.

3. **Platform Administrators**: Administrators oversee the proper functioning of the Order Book and Trade Matching system. They ensure that orders are matched quickly and fairly, maintaining a seamless user experience. Additionally, administrators monitor for system bottlenecks or mismatches and enforce compliance with the platform's rules. Their role is to maintain system integrity, stability, and efficiency, ensuring an optimal trading environment for all users.


**User Persona**
---------------------------------------------------------------------------------------------------------------------------

#### User Persona: Trader

Name: Alexa Siri
Age: 38
Occupation: Office Manager at a medium-sized corporation
  
  Experience:
10 years managing office logistics and procurement, with extensive experience in purchasing bulk office supplies and negotiating with vendors for optimal pricing.
#### Goals:
Purchase office supplies efficiently at competitive prices, ensuring that the company gets the best deals available.
Manage procurement within budget constraints while ensuring the timely delivery of necessary products.
Use data to make informed purchasing decisions and track spending trends over time.


#### Pain Points:
Frustrated by slow trade matching processes, which delay her ability to secure essential supplies.
Lacks transparency into supply availability, causing difficulty in forecasting and planning purchases.
Experiences difficulty in finding reliable suppliers for specific items during periods of high demand.


#### Technology Proficiency:
Moderate; comfortable using basic procurement software and platforms for placing orders and managing inventory. Familiar with using spreadsheets for tracking and analytics. Needs intuitive interfaces for order placement and real-time data.

#### Tools Preferred:
Web-based procurement platforms with clear market depth and pricing details.
Real-time notifications for changes in prices and product availability to aid in decision-making.
Simple, intuitive interfaces for placing bulk orders and tracking supply deliveries.


#### Day-to-Day Activities:
Managing office supply inventory and placing orders based on departmental needs and budget allocations.
Comparing vendor prices and product availability, often working under tight deadlines.
Communicating with finance and suppliers to ensure smooth procurement processes, including payment and delivery tracking.
Monitoring the platform for updated pricing trends and order fulfillment progress.



**Product Backlog Items as User Stories:**
---------------------------------------------------------------------------------------------------------------------------

Product Backlogs Pivotal Tracker URL: https://www.pivotaltracker.com/n/projects/2721725

**Estimated PBIs in story points:**

1. Real-Time Order Book Display - 3 story points
2. Combine Market Watch and Order Entry UI on a Single Page - 2 story points
3. Enable Buy and Sell on the Same Screen for Customers - 1 story points
4. Prevent Self-Matching of Buy and Sell Orders - 1 story points
5. User-Friendly Trade Execution Interface - 2 story points
6. Trade Matching Notifications - 3 story points
7. Retrieve Detailed Order and Trade Data by Product and Role - 3 story points
8. Enable Anonymous Trading in a Closed Market - 3 story points
9. Allow Sellers to Edit Product Details and have control on the activation of new details - 3 story points
10. Batch Program for Buyer-Seller Matching - 2 story points
11. Enable Session Reversion for Admins - 3 story points

**Estimation Techniques**

Story Points: Assigning relative points to each item based on complexity and effort, allowing for quicker comparisons.
Story points are often assigned using a non-linear scale because the complexity of tasks can grow quickly as they become larger.\
Smaller tasks: (1) These are simple tasks with low complexity.\
Medium tasks: (2) These have moderate complexity and may involve more steps or risks.\
Large tasks: (3) These are very complex, uncertain, or involve a lot of work.

**Definition Of Ready(DOR)**

A Definition of Ready (DoR) for us to make sure every checklist or set of criteria that ensures a product backlog item or user story is sufficiently prepared and understood before the development team begins working on it. This DoR will help us ensure clarity, alignment, and that all necessary information is available for the team to proceed without ambiguity.



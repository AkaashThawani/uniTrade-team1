# Team 3 - Market Order Book, Trade matching
This microservice provides a stub for a market (or an exchange). This will provide remaining services which are critical for a functioning trading platform.

**Team Members** 
---------------------------------------------------------------------------------------------------------------------------


Mona Shaban - Business Analyst \
Srushthi Thakre - UI/UX Developer \
Revanth Guntupalli - Microservice Developer \
Niharika Jamble - Database Design \
Mohammed Hannan Desai - Devops & Testing

**Far Vision** 
---------------------------------------------------------------------------------------------------------------------------


The far vision for the product is to create an efficient trading platform to empower sellers and buyers to interact in the marketplace to buy and sell office commodities. The purpose of this trading system is to provide real time visibility, promote transparency, and control the market dynamics to allow for efficient trade execution. The key components of the vision is to display all of the sell and buy orders that are placed on the platform as well as the market depth that provides live quantities available with the current prices. This will allow the users to make sensible decisions before conducting their trade. Another key component is the trade matching feature which will automatically match the seller and buyers to each other based on the quantity and price desired. This will allow for seamless trade processes without causing discrepancies or delays in the orders. The long term goals of the product are to expand the platform’s global reach to a wider audience in various office supply markets and regions.

### User Persona: Trader
---------------------------------------------------------------------------------------------------------------------------

- **Name**: Alex Johnson
- **Age**: 32
- **Occupation**: Independent Trader/Day Trader
- **Experience**: 8 years in financial trading, specializing in equities and options trading.
  
#### Goals:
- Execute trades quickly and efficiently to capitalize on market movements.
- Access real-time market data and analytics to make informed trading decisions.
- Minimize transaction costs and maximize profitability through strategic trading.
- Stay updated on market news and trends to anticipate price movements.

#### Pain Points:
- Frustration with slow order execution times, leading to missed opportunities.
- Difficulty in navigating complex trading platforms with excessive features.
- Lack of transparency in fees and commissions, impacting overall profitability.
- Challenges in analyzing multiple data sources and indicators simultaneously.

#### Motivations:
- Desire for financial independence and the ability to generate substantial income through trading.
- Interest in leveraging advanced trading tools and technology to gain a competitive edge.
- Motivation to continuously improve trading strategies and performance through education and practice.

#### Technology Proficiency:
- High; comfortable using trading platforms, financial analysis software, and mobile trading apps.
- Familiar with various order types (limit, market, stop-loss) and trading strategies (scalping, swing trading).

#### Tools Preferred:
- Advanced trading platforms with real-time data feeds and charting tools.
- Mobile trading apps for on-the-go access to market information.
- Analytical tools for tracking performance and backtesting strategies.

#### Day-to-Day Activities:
- Monitoring market conditions and relevant news throughout the trading day.
- Placing buy and sell orders based on technical analysis and market trends.
- Reviewing and adjusting trading strategies based on performance and market shifts.
- Participating in online trading communities for insights and sharing experiences. 

This persona captures the essential characteristics and needs of a trader, which can help inform product design and development decisions.

**Product Backlog Items as User Stories:**
---------------------------------------------------------------------------------------------------------------------------

*FRONT-END:*

1. Real-Time Order Book Display
   As a trader, 
   I want to view a real-time order book that displays all active buy and sell orders,so that I can make informed decisions 
   based on the current market conditions.

   Acceptance Criteria:
   - The order book updates automatically without a page reload.
   - Buy orders are highlighted in green, and sell orders in red.
   - I can filter orders by price range, quantity, and time of entry.
   - The interface is responsive and accessible on both desktop and mobile devices.

2. Trade Matching Notifications
   As a user, 
   I want to receive notifications when my orders are matched or partially matched,so that I can stay informed about the 
   status of my trades without having to constantly check the order book.

   Acceptance Criteria:
    - Notifications appear in a dedicated area or as non-intrusive pop-up messages.
    - I can customize my notification settings (sound, duration, type).
    - Notifications include details such as matched order price, quantity, and timestamp.
    - A log of recent notifications is available for my reference.

 3. User-Friendly Trade Execution Interface
    As a trader, 
    I want an intuitive interface for executing trades based on the order book  information,so that I can quickly and 
    accurately place my buy or sell orders without confusion.

    Acceptance Criteria:
     - The interface allows me to input buy or sell orders with clearly labeled fields for price and quantity.
     - A visual representation of market depth updates dynamically as I adjust my orders.
     - I receive instant feedback upon submitting an order, indicating whether it was successful or  failed.
     - A confirmation dialog appears before finalizing trades to prevent accidental submissions.
   
---------------------------------------------------------------------------------------------------------------------------
  **Estimated PBIs in story points:**
  *FRONT-END:*

  1. Real-Time Order Book Display - 8 story points
  2. Trade Matching Notifications - 5 story points
  3. User-Friendly Trade Execution Interface - 8 story points



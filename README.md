# Get Coffee-Stores Near You


This one was my first next js project, i had to learn things like use static props vs serverside props paths serverless functions and my first interaction with Airtable

## Process:

Change and open my mind to a new way of working

- Next js is an opinionated framework as in it has it's own structure on how it should be used, to my advantage it has Really good documentation. and they don't leave a lot of things up in the air.


2. I had to determine how much data i would have to actually save like the ratings and the coffee stores vs info i did not want to save or could get whenever it was necesssary from the user like location, applies for the last two.

- airtable turned out to be very flexible and well suited for this, it has really good comumentation aswell. so it just needed  a few serverless functions one for Putting/Post and another for Getting

3. The Apis

- To get coffe stores i just used the browser built in location and passed it to the foursquare api, wich returned a neat list of results, sadly for images of the actual place i had to pay for the premium version, so i just used the un-splash api so it doesn't look all empty. 

4. Upgrading.

- I would like to add a feature where users can put the internet speed of specific coffee shops in the future. it will be a fun exersise and should involve more learning!
 

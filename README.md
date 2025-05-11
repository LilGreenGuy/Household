# Household

#### Video demo: https://www.youtube.com/watch?v=SMhkas73A9k&feature=youtu.be

## Description:
Welcome to Household. I originally created this project in order to better learn more passport, express.js, and MongoDB and decided a good way to do it would be to make
an expense tracker for my girlfriend and I to use to track our shared expenses.

Household lets users add expenses to their 'Household' every month, such as rent, power bills, etc. There's really two main screens so far, users have an show screen for their Household and they have a screen to add and view whatever various expenses may come up every month. 

The background used in the web app is from unsplash. I don't know why I went with a random cityscape like I did, maybe budgeting makes me think of being a bigtime CEO in a tall skyscraper? Who knows.

### The Household show page is divided into four sections.

The first section is headed with the name of the Household if the user submitted one, otherwise the default is "Home". Then under that, it shows the address of the Household. Over to the right of this container there is Then under that, it shows a graph plotting your current monthly expenses versus your average monthly income based off of your yearly salary. Colors are currently blue for the expenses, and red for the user's salary. There is an edit button in the top right that leads to the edit page, which allows users to change the name of their Household as well as change the address of their household.

It then shows the users who are a part of the Household, with an input field to put in an email of someone to add/invite into the Household. NOTE: Not currently finished.

After that, it shows a similar summary of the current month's expenses as well as a combined total of them. Has an accordion menu that is clickable which will show the date each item was submitted into the application as well as the description the user submitted with it. There's a button in the bottom right corner that takes the user to a route called living-expenses where they can add more expenses to the month.

Then finally, the last box shows a yearly total for all month's and their expenses in another accordion menu. Clicking on the year will show the individual months and their respectively totals.

### The Living Expenses route/page is divided into three major sections.

The first is a summary of the expenses for that month, much like the one on the Household show page. It has a header with the name of the month (in case the user forgets?), the total under that, and then the same accordion menu as on the Household page that displays details such as date/time added, description.

The next section is where the user adds a new expense. There's three fields, one is for the name of the reason of the expense, the next is for the dollar amount of the expense, and then the final box is a textarea for the user to type out a more detailed description of the expense.

Finally, under that box is another accordion menu that shows a summary of previous month's expenses, in descending order. Clicking on each month will show the various expenses, including the reason, the cost, and the description.

There's a landing page currently, but it's a pretty basic static text scrawl and nothing incredibly interesting as of right now. 

### There is a profile route where users can change their information which is broken into two boxes.

The first section allows a user to change their "Real Name" (which is really just a display name) and their salary. Each of them have the current value under a header with an edit button off to the right side. Once the edit button is clicked, it replaces the current value with a text field for the user to edit the value directly.

The second section allows a user to change their password by taking in a new password the user desires, their old password, and their old password again to verify they typed it in correctly. It has some checks to make sure the user isn't inputting their old password as a new password. It uses passport's changePassword method which makes sure the user actually input the correct password instead of some random goofiness.

### Languages used:
HTML, CSS, Javascript
### Database used:
MongoDB
### Frameworks used:
Bootstrap, Express.js
### Templating Language used:
Embedded JavaScript (EJS)

### Future Plans:
- Fully implement the ability to add other people to your household
- Have the graph break down the salary bars by color based on each person's salary
- Implement an edit route for the Household so users can change the name and address of the Household.
- More robust error checking and security
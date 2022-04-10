# BuddyUp

## Project setup
```
npm install
npm run serve
```
## Deployed app
https://buddyup-e927c.web.app/

### About Us
Our project aims to tackle the growing healthcare issue of elderlies in Singapore being socially isolated and the lack of platforms to lower the barriers to entry for volunteering. As such, we came up with the web application - ‘Buddy Up’, which focuses on having elderlies as the beneficiaries. The main functionality of this app is to match registered volunteers to elderlies, registered by partner beneficiary organisations, based on their preferences. The volunteer can then make weekly visitations to the elderlies’ home to administer preventive care and keep them company. This app also allows the volunteers to log their visitations, set reminders for themselves, and use the built-in calendar to keep track of the visitations they have. 

### User Journey
```
1. New users will first create an account by clicking on “Create An Account” on the front page, then input in their necessary information.
2. After clicking on the “Sign Up” button, a pop-up will appear to show that a link has been sent to their email for verification, which they will then click on “OK”.
3. They will then go to the email to click on the verification link.
4. After signing up, they will be brought to the Homepage
5. They will then update preferences under My Profile by filling in the following information:
a. Region: North, South, East, West, Central 
b. Language/Dialects: English, Chinese, Tamil, Malay 
c. Buddy Preferences: Female, Male, No Preference  
d. Availability: Multiple checkboxes blocks of 2 hours from 8 am to 8 pm 
e. Click “Update” and acknowledge the alert  
6. Users will then proceed to the “My buddies” page and click on “Add a buddy” for the name of the buddy to show up on the main page. Up to 3 buddies can be added. 
a. If the user does not click on the button at all, there will be an empty icon to show that the user is currently not matched with any buddies.  
b. If the user already has 3 buddies and clicks on the button, an alert will pop up to remind them “The maximum number of buddies you can have is 3”.  
c. If the user has not yet updated their particulars and gender preferences, an alert pop up will prompt the user to update preferences before they can be matched with an elderly.  
7. After there is a match of the volunteers with the elderly, users can click into any specific buddy, to bring them to the individual buddy page. They can then:
a. Add new visitation  
i. Key in start time by pressing on the clock  
ii. Key in end time by pressing on the clock  
iii. Start and end time cannot be the same, and start should be less than end time
iv. Key in Date by pressing on the calendar 
v. Clicking on the “Save” button will add it into the Visitation table
b. Add new reminder
i. Key in Date by pressing on the calendar
ii. Key in the reminders
iii. Clicking on the “save button” will add a reminder to home page as well as calendar
c. Visitation table 
i. Click on “X” to delete the visitations and confirm the delete such that visitation entry will be deleted
d. Request Buddy’s details, then a pop up will mention that an email of buddy’s critical information has been sent to their registered email.
e. Delete buddy
i. Press on delete buddy and acknowledge and it will bring them to the “My Buddies” page
8. The schedule of the volunteers will appear under “My Calendar”.
a. Hover over the event to view the full event
9. Volunteers will be able to find out more about the application and our goal under “About us”.
10. Users can then log out on the top bar and it will bring them back to the Login page
```
## Contributing
## Contributors
@yx055 @melissaoyl @mltnsia @High325 @joeyylow


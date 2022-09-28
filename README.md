# PlayBuild Pro
Currently Hosted here with AWS: http://18.189.157.171/

PlayBuild Pro is a web application where Theater Administrators can register a show, upload/edit show information, invite cast members to upload their headshots and bios, and dynamically render a Playbill for their show. Theater goers can find the playbill on the website to view as they enjoy the show.


![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/98723432/192673302-4ae96fcc-c33f-4649-915b-9617d565433d.gif)



# Technologies

- Python
- React
- PosgeSQL
- Flask
- SQLAlchemy
- HTML
- CSS
- Bootstrap
- Jinja 2
- Twilio Sendgrid API
- Cloudinary API
- AWS

# Features

PlayBuild Pro was designed with three user experiences in mind giving audience members, actors, and administrators unique functionality throughout the site. 

*Admin levels are determined by show registration. This means that any account can have 'actor' or 'admin' access for any give show. Admin access is given to the user that register's the show.*

### <ins>Admin Experience</ins>
- Register a new show Upload Playbill Cover
- Invite cast members
- Approve headshots/bios before published
- Update show information
- Notified when new headshots/bios need approval
- Register any number of shows
- Update Cast Member information
- Archive Show
- View Playbill

### <ins>Actor Experience</ins>
- Upload Headshot
- Upload Bio
- Edit Headshot/Bio at any time
- Receive notification of invite to show
- Connect to a show before ever creating an account
- Ability to be connected to many shows at once
- Upload different headshots and bios for different shows
- View Playbill

### <ins>Audience Experience</ins>
- Search for a playbill by title of show
- Select the correct show based on title, company information, and performance dates
- View published information *only* 
- No account needed to search for a show

# Key Features Demo

### <ins>Data Model</ins>
I relied heavily on my PosgreSQL database to manage the unique user functionality and allow users to have multiple shows and access levels throughout the site. I spent a good amount of time designing this data model to make sure that I would be able keep track of information that was published or not published and information that only admin level access should be able to see. 

<img width="1490" alt="Screen Shot 2022-09-27 at 9 07 19 PM" src="https://user-images.githubusercontent.com/98723432/192678552-df8d531d-5402-4f99-8c17-060616078815.png">


### <ins>Register A Show</ins>

Incorporating React, I designed a registration page that instantly shows users what their playbill cover will look like as they enter the show information. I used the Cloudinary API and createobjectURL()to allow users to upload photos for the cover and see them rendered down to the correct size for the cover. This way, users can choose the photo that works best before storing it in the database.

![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/98723432/192677282-48f86c25-0264-41aa-bab7-11a84123b244.gif)

### <ins>Invite Cast Members</ins>

After show registration, users can invite their cast to the show. Using the Twilio Sendgrid API, actors are alerted to the invitation and asked to login or create a PlayBuild Pro account. Once logged in, users will see the show is already connected to their account and they can upload their headshot and bio for the show.

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/98723432/192680400-6618aa26-fe87-4716-b03d-50ae9a468042.gif)

# Author
Taylor is a fullstack developer located in Colorado, US. She is passionate about making the world a better place through software development, continued education and funny memes.
#### Watch a PlayBuild Pro Demo Presentation Here
<a href="https://www.youtube.com/watch?v=T5ZozcJGobc&list=PL4n4VHJ7Pj_AhvDLaUozrTFcZfdtZRJp8&index=2&t=8s" target="_blank"><img width="340" height="180" border="10"  alt="PlayBuild Pro Demo Video" src="https://user-images.githubusercontent.com/98723432/192880038-e00dfd52-c7e6-4dd0-95fb-87e54c60121b.png" /></a>

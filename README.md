# PlayBuild Pro
Currently Hosted with AWS: http://18.189.157.171/

PlayBuild Pro is a web application where Theater Adminastators can register a show, upload/edit show information, invite cast members to upload their headshots and bios, and dynamically render a Playbill for their show. Theater goers can find the playbill on the website to view as they enjoy the show.

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

#### <ins>Admin Experience</ins>
- Register a new show Upload Playbill Cover
- Invite cast members
- Approve headshots/bios before published
- Update show information
- Notified when new headshots/bios need approval
- Register any number of shows
- Update Cast Member information
- Archive Show
- View Playbill

#### <ins>Actor Experience</ins>
- Upload Headshot
- Upload Bio
- Edit Headshot/Bio at any time
- Receive notification of invite to show
- Connect to a show before ever creating an account
- Ability to be connected to many shows at once
- Upload different headshots and bios for different shows
- View Playbill

#### <ins>Audience Experience</ins>
- Search for a playbill by title of show
- Select the correct show based on title, company information, and performance dates
- View published information *only* 
- No account needed to search for a show

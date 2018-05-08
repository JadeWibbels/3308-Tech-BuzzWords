# 3308-Tech-BuzzWords

Purpose: 
  This app enables CU sutdents in the computer science department to schdule study groups with other students. It provides a calendar      
  interface and an account login so a student can see what groups exist for their classes. Additionally, students can add groups if they
  wish to schedule a study group.

Dependencies:
  1. Recent Node and NPM versions. Downloading the most recent ones is recommended.
  2. MySQL
  3. Web Browser of you choice
  
Build:
   1. Change MySQL password in config file at /Cinder files-code/CinderConfig.js. This password should match the root user password on you 
   instance of MySQL. If another user is desired, switch the username as well.
   2. Install Node modules. Run the command: <npm install> in /Cinder files-code/. This will install all of the other dependencies (other      than those listed above). 

Run: 
  1. Run the command: <node app.js> in the terminal at /Cinder files-code/. This will start the server at localhost:3006. If you desire to
   use a differnat port than 3006 or if 3006 is already in use on your system, change the port field in /Cinder files-code/CinderConfig.js.
  2. Start a web browser of your choice and navigate to localhost:3006.
  3. Enjoy.
  
  

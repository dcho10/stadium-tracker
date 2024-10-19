app name: VISITOUR

user flow:
- when user opens app, they are directed to the home page
- home page will have login/signup buttons, maybe infographic on how the app works
- when user clicks on login/signup button, will be redirected to according page
- once user has logged in/signed up, they will be redirected to the sports page (i.e. MLB, NBA, NFL, etc.), user will have to select the exact league
- once user clicks on the league, they will be redirected to the page with all the teams, and their stadiums
- user will be able to select what teams/stadiums they have visited, will have a counter of how many have been selected (i.e. "I have visited x out of 30", "x/30 stadiums visited")
- team logo on left, stadium name on right, checkbox beside it
- when they click on the stadium, it will show a brief history of the stadium
- visited stadiums will have green checkmark once selected, blank if not selected and progress will be saved automatically
- user will be able to go back to the previous page and select another league and repeat


future developments:
- user will be able to see info about the stadiums (i.e. stadium name, city, when it was built)
- add photo to confirm/share that they have visited a stadium
- be able to share with other users their progress
- user will be able to add notes/comments about their experience at venue
- track the number of times visited
- track the number of visitors at each stadium
- user ratings of each stadium visited
- figure out password reset functionality

database:
- user database with saved progress on visited stadiums
- sports league database (i.e. MLB, NBA, etc)
- team database with stadium name and brief history (i.e. Chicago Cubs, Wrigley Field)

<!-- HTML !-->
<button class="button-29" role="button">Button 29</button>

/* CSS */
.button-29 {
  align-items: center;
  appearance: none;
  background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.button-29:focus {
  box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

.button-29:hover {
  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-29:active {
  box-shadow: #3c4fe0 0 3px 7px inset;
  transform: translateY(2px);
}
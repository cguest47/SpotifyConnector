Spotify Connector
Use this React DEV web application (download and run -npm start) to look up songs on Spotify, create a playlist and upload that playlist directly to your Spotify account!

Instructions to run yourself: 
- Create an app on Spotify @https://developer.spotify.com/
- Go to src/util/Spotify.js and input your own clientId #
- Run the app in Visual Studio Code with -npm start

Future Features:
- Pressing enter triggers a search
- Include preview samples for each track
- Only display songs not currently present in the playlist in the search results
- Add a loading screen while playlist is saving
- Update the access token logic to expire at exactly the right time, instead of setting expiration from when the user initiates their next search
- After user redirect on login, restoring the search term from before the redirect
- Ensure playlist information doesn’t get cleared if a user has to refresh their access token
- Provide a way to fetch and see all your existing playlists

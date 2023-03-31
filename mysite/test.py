import spotipy
from spotipy.oauth2 import SpotifyOAuth

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id="c94210b17c5d4338a4a85a89ad3eeda6",
                                               client_secret="d5969d54ba64496d9e2c6b9c2f4580d1",
                                               redirect_uri="http://localhost:8888/callback",
                                               scope="user-library-read"))

results = sp.current_user_saved_tracks()
for idx, item in enumerate(results['items']):
    track = item['track']
    print(idx, track['artists'][0]['name'], " – ", track['name'])
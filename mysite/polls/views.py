from django.shortcuts import render, HttpResponseRedirect
import spotipy
from spotipy import oauth2
import spotipy.util as util
from django.shortcuts import render
import requests

scope="user-library-read"
CLIENT_ID = "c94210b17c5d4338a4a85a89ad3eeda6"
CLIENT_SECRET = "d5969d54ba64496d9e2c6b9c2f4580d1"
REDIRECT_URI = "http://localhost:8888/callback"
username = ''

sp = oauth2.SpotifyOAuth(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, scope=scope, cache_path=".cache-" + username )
def home(request):
    return render(request, 'polls/home.html', {})

def next_offset(n):
    try:
        return int(n['next'].split('?')[1].split('&')[0].split('=')[1])
    except ValueError:
        return None
    except AttributeError:
        return None
    except TypeError:
        return None

def sign_in(request):
    total = []
    sp = oauth2.SpotifyOAuth(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, scope=scope, cache_path=".cache-" + username )
    token = sp.get_cached_token()
    if not token:
        auth_url = sp.get_authorize_url()
        return HttpResponseRedirect(auth_url)
    sptoken = spotipy.Spotify(auth=token['access_token'])
    
    saved = sp.current_user_saved_tracks(limit=50)
    next = next_offset(saved)

    total.append(saved)
    while next and next < int(saved['total']):
        next_25 = sptoken.current_user_saved_tracks(limit=25, offset=next)
        next = next_offset(next_25)
        total.append(next_25)
        print(next)
    tracks = []
    for r in total:
        for track in r['items']:
            tracks.append(track)

    return render(request, '../polls/sign-in.html', {'saved': tracks})

def after_sign_in(request):
    results = {}
    key = 'http://localhost:8000/ret/?{}'.format(request.GET.urlencode())
    sp = oauth2.SpotifyOAuth(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, scope=scope, cache_path=".cache-" + username )
    code = sp.parse_response_code(key)
    token_info = sp.get_access_token(code)
    if token_info:
        sptoken = spotipy.Spotify(auth=token_info['access_token'])
        listed = sptoken.current_user_saved_tracks()
    return render(request, 'polls/sign-in.html', {'results': results['items']})


# results = sp.current_user_saved_tracks()
# for idx, item in enumerate(results['items']):
#     track = item['track']
#     print(idx, track['artists'][0]['name'], " – ", track['name'])

#####################
#Accuweather
API = "xKGPVZlAPvwPem2aQFN2LEAns6Awplp5"


key = ""

def getWeather(city):
    city = input("Enter A City Name: ").replace(" ", "")
    search_address = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=xKGPVZlAPvwPem2aQFN2LEAns6Awplp5&q="+city+"&language=en-us&details=false&alias=27"
    response = requests.get(search_address)
    data = response.json()
    #print(search_address)
    #read city data
    # with urllib.request.urlopen(search_address) as search_address:
    #     data=json.loads(search_address.read().decode())

    #find the 6 digit location key
    locationKey = data[0]['Key']
    dailyForecast = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/"+locationKey+"?apikey=xKGPVZlAPvwPem2aQFN2LEAns6Awplp5&language=en-us&details=false&metric=false"
    response = requests.get(dailyForecast)
    data1 = response.json()
    lowtemp = str(data1['Temperature']['Minimum']['Value'])
    hightemp = str(data1['Temperature']['Maximum']['Value'])
    forecast = str(data1['Day']['IconPhrase'])

    context = {
        "low": lowtemp,
        "high: ": hightemp,
        "daily: ": forecast
    }

    return render(city, "accuweather.html", context)
 
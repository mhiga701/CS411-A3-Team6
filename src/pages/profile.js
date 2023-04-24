import { getProfile, getPlaylists, getArtists } from "../spotify";
import { useEffect, useState } from 'react';
import { errCatch } from "../utils";
import StyledHeader from '../styles/StyledHeader';
import  Wrapper from '../components/Wrapper';
import Grid from '../components/Grid';


const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [artists, setArtists] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const userProfile = await getProfile();
            setProfile(userProfile.data);

            const userPlaylists = await getPlaylists();
            setPlaylists(userPlaylists.data);

            const userArtists = await getArtists();
            setArtists(userArtists.data);
        
        };
        errCatch(fetchData());
    }, []);
    console.log(artists);
    return (
        <>
      {profile && (
        <>
          <StyledHeader type="user">
            {artists && (
              <main>
                <Wrapper title="Your Top 10 Artists of the Month" seeAllLink="/top-artists">
                <Grid artists={artists.items.slice(0, 10)} />
                </Wrapper>
              </main>
            )

            }
            <div className="header__inner">
              {profile.images.length && profile.images[0].url && (
                <img className="header__img" src={profile.images[0].url} alt="Avatar"/>
              )}
              <div>
                <div className="header__overline">Profile</div>
                <h1 className="header__name">{profile.display_name}</h1>
                <p className="header__meta">
                {playlists && (
                    <span>{playlists.total} Playlist{playlists.total !== 1 ? 's ' : ''}</span>
                  )}
                  <span>
                    {profile.followers.total} Follower{profile.followers.total !== 1 ? 's ' : ''}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>
        </>
      )}
    </>
  )
};

export default Profile;
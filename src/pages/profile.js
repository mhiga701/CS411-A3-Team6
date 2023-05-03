import { getProfile, getPlaylists, getArtists, getRecs } from "../spotify";
import { useState, useEffect } from 'react';
import { errCatch } from "../utils";
import { SectionWrapper, ArtistsGrid } from '../components';
import { StyledHeader } from '../styles';
import styled from 'styled-components/macro';
import { Link } from "react-router-dom"
//import { handler } from "../spotify";


const StyledButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);
  margin-bottom: 20px;
  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [artists, setArtists] = useState(null);
    const [recs, setRecs] = useState(null);
    
    //const [ids, setIds] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const userProfile = await getProfile();
            setProfile(userProfile.data);

            const userPlaylists = await getPlaylists();
            setPlaylists(userPlaylists.data);

            const userArtists = await getArtists();
            setArtists(userArtists.data);
            
            const userRecs = await getRecs();
            setRecs(userRecs.data);
           
        };
        errCatch(fetchData());
        
    }, 
    
    []);
 
    
  
    return (
        <>
      {profile && (
        <>
          <StyledHeader type="user">
            
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

          {artists &&  (
              <main>
                <SectionWrapper title="Your Top 5 Artists of the Month">
                  <ArtistsGrid artists={artists.items.slice(0, 5)} />
                  
                </SectionWrapper>
              </main>
          )
} 
            {/* {artistIds && (
              <main>
                <SectionWrapper title="artist ids">
                  
                </SectionWrapper>
              </main>
            )

            } */}
       <Link to='/gmap'><StyledButton>Mix Your Trip!</StyledButton></Link>
        </>
      )}
     
    </>
     
  )
  
};

export default Profile;

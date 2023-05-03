// import { ids } from './Artists'
// import { accessToken } from '../spotify';

// export function songRecs(req, res) {
//      const ENDPOINT = `https://api.spotify.com/v1/recommendations?limit=2&market=US&seed_artists=${ids.id1}%${ids.id2}%${ids.id3}%${ids.id4}%${ids.id5}`;

//                   const getRecs = async () => {
//                         const artistData = await fetch(ENDPOINT, {
//                             headers: {
//                                 Authorization: `Bearer ${accessToken}`
//                             },
//                         });
//                     // const { items } = await artistData.json();
//                     // const tracks = items.map((track) => ({
//                     //     id: track.id,
//                     //     name: track.name
//                     // })); 
//                     const recs = await getRecs();
//                     return res.status(200).json(recs);
//                     };
              
                   
                    
//     //const recs = axios.get(`https://api.spotify.com/v1/recommendations?limit=25&market=US&seed_artists=1ybINI1qPiFbwDXamRtwxD&seed_genres=rap&seed_tracks=6efkcs2aUBMFKxl0cl2JWQ`);
//     //let tracks = recs.data;
//     return recs.items;
//     }
//    export default songRecs;
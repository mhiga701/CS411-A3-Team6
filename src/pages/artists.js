// import { accessToken } from "../spotify";
// export function handler(req, res) {
//     try {
//         const ENDPOINT = `https://api.spotify.com/v1/me/top/artists?limit=10&time_range=short_term`;
//         const getArtists = async () => {
//             const artistData = await fetch(ENDPOINT, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`
//                 },
//             });
//         const { items } = await artistData.json();
//         const artists = items.map((artist) => ({
//             genre: artist.genres,
//             pic: artist.images[0].url,
//             name: artist.name,
//             id: artist.id,
//         })); 

//         if (artists) {
//             return res.status(200).json(artists);
//         }
//         };
//         return getArtists();
        
//     } catch (error) {
//         console.error('Error occurred while retrieving top artists');
//         return res.status(400);
//     }
// }
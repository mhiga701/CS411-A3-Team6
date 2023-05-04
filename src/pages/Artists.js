import { getArtists } from "../spotify";
import { useState, useEffect } from 'react';
import { errCatch } from "../utils";

export function SetIds() {
    const [id1, setId1] = useState(null);
    const [id2, setId2] = useState(null);
    const [id3, setId3] = useState(null);
    const [id4, setId4] = useState(null);
    const [id5, setId5] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userArtists = await getArtists();
            setId1(userArtists.data.items[0]['id']);
            setId2(userArtists.data.items[1]['id']);
            setId3(userArtists.data.items[2]['id']);
            setId4(userArtists.data.items[3]['id']);
            setId5(userArtists.data.items[4]['id']);
    }
    errCatch(fetchData());
},

    []);
    const ids = {id1, id2, id3, id4, id5}
    return ids;
}
export default SetIds;

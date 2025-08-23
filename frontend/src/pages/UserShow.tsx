import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { follow, getUser, getUserMurmurs, unfollow } from '../api';
import Pagination from '../components/Pagination';
import MurmurCard from '../components/MurmurCard';


export default function UserShow(){
    const { id } = useParams();
    const uid = Number(id);
    const [user, setUser] = useState<any>({});
    const [list, setList] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);


    async function load(p=1){
        setUser(await getUser(uid));
        const r = await getUserMurmurs(uid, p);
        setList(r.data); setPage(r.meta.page); setPages(r.meta.total_pages);
    }
    useEffect(()=>{ load(page); }, [uid, page]);


    async function onFollow(){ await follow(uid); load(page); }
    async function onUnfollow(){ await unfollow(uid); load(page); }


    return (
        <div>
            <div className="bg-white border rounded p-3 mb-3">
                <div className="text-xl font-semibold">{user.name} (@{user.username})</div>
                <div className="text-sm text-gray-600">{user.bio}</div>
                <div className="text-sm mt-1">Following: {user.following_count} · Followers: {user.followers_count}</div>
                <div className="mt-2">
                    {user.is_following
                        ? <button onClick={onUnfollow} className="px-3 py-1 border rounded">Unfollow</button>
                        : <button onClick={onFollow} className="px-3 py-1 border rounded">Follow</button>}
                </div>
            </div>
            {list.map((m)=> (
                <MurmurCard key={m.id} m={m} />
            ))}
            <Pagination page={page} totalPages={pages} onChange={setPage} />
        </div>
    );
}
import React, { useEffect, useState } from 'react';
import { deleteMurmur } from '../api';
import Pagination from '../components/Pagination';


export default function UserMe(){
    const [me, setMe] = useState<any>({});
    const [list, setList] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);


    async function load(p=1){
        const meResp = await fetch('/api/me', { headers: { 'X-User-Id': '1' } }).then(r=>r.json());
        setMe(meResp);
        const r = await fetch(`/api/me/murmurs?page=${p}`, { headers: { 'X-User-Id': '1' } }).then(r=>r.json());
        setList(r.data); setPage(r.meta.page); setPages(r.meta.total_pages);
    }
    useEffect(()=>{ load(page); }, [page]);


    async function del(id:number){
        await deleteMurmur(id); load(page);
    }


    return (
        <div>
            <div className="bg-white border rounded p-3 mb-3">
                <div className="text-xl font-semibold">{me.name} (@{me.username})</div>
                <div className="text-sm text-gray-600">{me.bio}</div>
                <div className="text-sm mt-1">Following: {me.following_count} · Followers: {me.followers_count}</div>
            </div>
            {list.map(m => (
                <div key={m.id} className="bg-white border rounded p-3 mb-3">
                    <div className="mb-2">{m.content}</div>
                    <div className="flex items-center gap-3 text-sm">
                        <span>{m.likes_count} likes</span>
                        <button onClick={()=>del(m.id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
                    </div>
                </div>
            ))}
            <Pagination page={page} totalPages={pages} onChange={setPage} />
        </div>
    );
}
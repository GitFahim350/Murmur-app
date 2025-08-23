import React from 'react';
import { Link } from 'react-router-dom';
import { likeMurmur, unlikeMurmur } from '../api';


type Murmur = { id:number; content:string; likes_count:number; created_at:string; user:{id:number; name:string; username:string}; liked_by_me?:boolean };


export default function MurmurCard({ m, onChange }: { m: Murmur; onChange?: (next:Murmur)=>void }) {
    async function toggleLike() {
        if (m.liked_by_me) {
            const res = await unlikeMurmur(m.id);
            onChange?.({ ...m, liked_by_me: false, likes_count: res.likes_count });
        } else {
            const res = await likeMurmur(m.id);
            onChange?.({ ...m, liked_by_me: true, likes_count: res.likes_count });
        }
    }
    return (
        <div className="bg-white border rounded p-3 mb-3">
            <div className="text-sm text-gray-500">by <Link to={`/users/${m.user.id}`} className="underline">@{m.user.username}</Link></div>
            <div className="my-2">{m.content}</div>
            <div className="flex items-center gap-3 text-sm">
                <button className="px-2 py-1 border rounded" onClick={toggleLike}>{m.liked_by_me ? 'Unlike' : 'Like'}</button>
                <div>{m.likes_count} likes</div>
                <Link to={`/murmurs/${m.id}`} className="underline">Detail</Link>
            </div>
        </div>
    );
}
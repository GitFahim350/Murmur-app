import React, { useEffect, useState } from 'react';
import { getTimeline, createMurmur } from '../api';
import MurmurCard from '../components/MurmurCard';
import Pagination from '../components/Pagination';


type ListResp = { data: any[]; meta: { page:number; total_pages:number } };


export default function Timeline() {
    const [list, setList] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [text, setText] = useState('');


    async function load(p=1) {
        const r: ListResp = await getTimeline(p);
        setList(r.data);
        setPage(r.meta.page); setPages(r.meta.total_pages);
    }
    useEffect(()=>{ load(page); }, [page]);


    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!text.trim()) return;
        await createMurmur(text.trim());
        setText('');
        load(1);
    }


    return (
        <div>
            <form onSubmit={submit} className="mb-4 flex gap-2">
                <input value={text} onChange={e=>setText(e.target.value)} placeholder="What's happening?" className="flex-1 border rounded px-3 py-2" />
                <button className="px-3 py-2 bg-black text-white rounded">Murmur</button>
            </form>
            {list.map((m, i)=> (
                <MurmurCard key={m.id} m={m} onChange={(nm)=>{
                    const clone=[...list]; clone[i]=nm; setList(clone);
                }} />
            ))}
            <Pagination page={page} totalPages={pages} onChange={setPage} />
        </div>
    );
}
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMurmur } from '../api';
import MurmurCard from '../components/MurmurCard';


export default function MurmurDetail(){
    const { id } = useParams();
    const [m, setM] = useState<any|null>(null);
    useEffect(()=>{ (async()=> setM(await getMurmur(Number(id))))(); }, [id]);
    if (!m) return null;
    return <MurmurCard m={m} onChange={setM} />;
}
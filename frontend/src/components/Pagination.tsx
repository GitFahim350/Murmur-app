import React from 'react';
export default function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number)=>void }) {
    return (
        <div className="flex justify-between mt-3">
            <button className="px-3 py-1 border rounded" disabled={page<=1} onClick={()=>onChange(page-1)}>Prev</button>
            <div className="text-sm">Page {page} / {totalPages}</div>
            <button className="px-3 py-1 border rounded" disabled={page>=totalPages} onClick={()=>onChange(page+1)}>Next</button>
        </div>
    );
}
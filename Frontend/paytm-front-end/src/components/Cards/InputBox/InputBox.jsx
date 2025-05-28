export const InputBoxChange = ({ label, placeholder, onChange }) => {
    return <div>
        <div className="text-sm font-medium text-left py-2">{label}</div>
        <input placeholder={placeholder} onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200"></input>
    </div>

}


export const InputBoxRef = ({ label, placeholder, Ref }) => {
    return <div>
        <div className="text-sm font-medium text-left py-2">{label}</div>
        <input placeholder={placeholder} ref={Ref} className="w-full px-2 py-1 border rounded border-slate-200"></input>
    </div>

}


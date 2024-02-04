export default function InputBox({label,placeholder,onChange}) {
  return <>
  <div className="text-sm font-medium py-2 text-left">{label}</div>
  <input onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200" placeholder={placeholder}/>
  </>;
}

import { Sprout, Heart, Sun, Wheat } from 'lucide-react'
const values=[ [Sprout,'Real ingredients','Simple food, no fuss'],[Heart,'Made with care','Prepared fresh for you'],[Sun,'Everyday goodness','Feel-good food habits'],[Wheat,'Local inspiration','A mix of modern & traditional'] ]
export default function ValuesStrip(){return <section className="values-strip">{values.map(([Icon,title,sub])=><div className="value-item" key={title}><span className="value-icon"><Icon size={21}/></span><div><b>{title}</b><small>{sub}</small></div></div>)}</section>}

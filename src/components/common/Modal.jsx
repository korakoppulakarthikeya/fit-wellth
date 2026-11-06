import { X } from 'lucide-react'
export default function Modal({open,onClose,title,children}){if(!open)return null;return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="simple-modal"><button className="modal-close" onClick={onClose}><X/></button><h3>{title}</h3>{children}</div></div>}

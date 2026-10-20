// Research replacement for packages/halo-face/AgentFace.tsx. Original public props retained.
import {useEffect,useRef} from 'react';
import './engine.js';
import './engine.css';
export type AgentStatus='working'|'waiting'|'needs-shaan'|'blocked'|'done'|'offline';
export type AgentFaceProps={project?:string;hue?:number;status?:AgentStatus;size?:number;track?:boolean;interactive?:boolean;name?:string;className?:string;title?:string;look?:string;parts?:Partial<Record<'eyes'|'ears'|'hat'|'head'|'colour',string>>};
type Ctl={project(p?:string,h?:number):Ctl;status(s:AgentStatus):Ctl;destroy():void};
type Engine={mount(host:HTMLElement,o:object):Ctl};
export function projectHue(s:string):number{let h=0;for(const ch of String(s))h=(h*31+ch.charCodeAt(0))>>>0;h%=360;return h>=340||h<55?(h+180)%360:h;}
export function AgentFace({name,project,hue,status='waiting',size=24,track=false,interactive=false,className,title,look,parts}:AgentFaceProps){
const host=useRef<HTMLSpanElement>(null),ctl=useRef<Ctl|null>(null);
const partKey=JSON.stringify(parts||{});
useEffect(()=>{if(!host.current)return;const engine=(window as unknown as {FaceMochi:Engine}).FaceMochi;if(!engine)throw new Error('FaceMochi engine missing');const c=engine.mount(host.current,{name,project,hue:hue??projectHue(project??""),status,size,track,interactive,look,parts});ctl.current=c;return()=>{c.destroy();ctl.current=null;host.current?.replaceChildren();};},[name,size,track,interactive,look,partKey]);
useEffect(()=>{ctl.current?.project(project,hue??projectHue(project??""));},[project,hue]);
useEffect(()=>{ctl.current?.status(status);},[status]);
return <span ref={host} className={className} title={title} style={{display:'inline-flex',width:size,height:size,flex:'none'}}/>;
}

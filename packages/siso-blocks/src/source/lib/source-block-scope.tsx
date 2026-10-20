'use client';
import * as React from 'react';
// uihub: siso:blocks
import { createContext, useContext, useLayoutEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
const PortalContainer = createContext<HTMLElement | undefined>(undefined);
export interface SourceBlockScopeProps {
  children: ReactNode;
  theme?: 'light' | 'dark';
  accent?: 'neutral' | 'violet' | 'blue' | 'green' | 'amber' | 'orange' | 'coral' | 'rose';
  className?: string;
  style?: CSSProperties;
}
/** Keeps the original scoped tokens available in Radix portals, without changing portal positioning. */
export function SourceBlockScope({ children, theme = 'light', accent = 'neutral', className = '', style }: SourceBlockScopeProps) {
  const [host, setHost] = useState<HTMLDivElement>();
  const themeRef = useRef({theme, accent});
  themeRef.current = {theme,accent};
  useLayoutEffect(() => {
    const element = document.createElement('div');
    element.className = 'siso-blocks-source';
    element.dataset.theme = themeRef.current.theme;
    element.dataset.accent = themeRef.current.accent;
    element.dataset.sourceBlocksPortal = '';
    document.body.appendChild(element);
    setHost(element);
    return () => element.remove();
  }, []);
  useLayoutEffect(() => { if (host) { host.dataset.theme = theme; host.dataset.accent = accent; } }, [host, theme, accent]);
  return <PortalContainer.Provider value={host}><div className={`siso-blocks-source ${className}`} data-theme={theme} data-accent={accent} style={style}>{children}</div></PortalContainer.Provider>;
}
export function useSourceBlockPortalContainer() { return useContext(PortalContainer); }

export function SourcePortal({as:Portal,children,...props}:{as:React.ElementType;children?:ReactNode;[key:string]:unknown}) {
 return React.createElement(Portal,{...props,container:useSourceBlockPortalContainer()},children);
}

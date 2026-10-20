// uihub: siso:package-workbench
// Documentation callback fixtures only. No network requests, credentials or business writes.
function action(label:string){window.dispatchEvent(new CustomEvent('suite-demo-action',{detail:label}));}
export const track=(..._args:unknown[])=>action('Dismiss requested');
export const save=(..._args:unknown[])=>action('Decision received by the preview host');
export const verify=(..._args:unknown[])=>action('Verification requested in this example');
export const submit=(..._args:unknown[])=>action('Signature submitted to the preview host');
export const subscribe=async(..._args:unknown[])=>{action('Subscription requested in this example');};
export const openSearch=()=>action('Search shortcut received');
export const openSite=()=>action('View action received');
export const markRead=(..._args:unknown[])=>action('Read-state action received');
export const dismiss=(..._args:unknown[])=>action('Dismiss action received');
export const api={publish:async()=>{action('Publish requested in this example');}};
export const router={push:(href:string)=>action(`Example navigation: ${href}`),refresh:()=>action('Example countdown completed')};
export const useRouter=()=>router;
export async function uploadWithProgress(_file:File,onProgress:(progress:number)=>void,signal?:AbortSignal){
 for(const value of [10,30,55,80,100]){if(signal?.aborted)throw new DOMException('Cancelled','AbortError');await new Promise(resolve=>setTimeout(resolve,80));onProgress(value);}
 action('Example upload completed locally');
}
export const uploadFile=(_file:File,options:{onProgress:(progress:number)=>void;signal?:AbortSignal})=>uploadWithProgress(_file,options.onProgress,options.signal);

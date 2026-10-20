// uihub: siso:blocks
import { ArcImage, ArcLink, type ArcImageProps } from "./arc-provider";
export type StaticImageData = {src:string;width:number;height:number;blurDataURL?:string};
export function Image({src, ...props}: Omit<ArcImageProps,"src"> & {src:string|StaticImageData;quality?:number;unoptimized?:boolean;placeholder?:string;blurDataURL?:string}) {
 const {quality,unoptimized,placeholder,blurDataURL,...rest}=props;
 return <ArcImage {...rest} src={typeof src === "string" ? src : src.src}/>;
}
export { ArcLink as Link };

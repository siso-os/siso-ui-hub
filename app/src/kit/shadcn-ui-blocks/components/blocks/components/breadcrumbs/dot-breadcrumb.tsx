import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../ui/breadcrumb';

export default function DotBreadcrumb() {
  return (
    <Breadcrumb className="p-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-muted-foreground mx-2">
          •
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-muted-foreground mx-2">
          •
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">
            Categories
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-muted-foreground mx-2">
          •
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Electronics</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

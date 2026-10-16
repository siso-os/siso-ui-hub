'use client'
import { useState } from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { CardContent, CardHeader, CardTitle, CardAction,Card } from '../../../../../../shadcn/ui/card';

import { Badge } from '../../../../../../shadcn/ui/badge';
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableCell,
  TableRow,
} from '../../../../../../shadcn/ui/table';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../../../../shadcn/ui/input-group";
import {

  SearchIcon,

} from "lucide-react";
export default function RecentOrders() {
  const ProductTableData = [
    {
      id: 1,
      project: 'Modernize',
      productImg: 'https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-2.webp',
      name: 'Emily Carter',
      role: 'Project Manager',
      timeline: '4–6 weeks',
      budget: '$1,499.00',
      statustext: 'On track',
      statuscolor: 'orange-600',
    },
    {
      id:2 ,
      project: 'Spike Admin',
      productImg: 'https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-3.webp',
      name: 'Jason Miller',
      role: 'Web Developer',
      timeline: '6–8 weeks',
      budget: '$1,499.00',
      statustext: 'Delayed',
      statuscolor: 'rose-600',
    },
    {
      id:3 ,
      project: 'Material Pro',
      productImg: 'https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-7.webp',
      name: 'Ryan Scott',
      role: 'UI/UX Designer',
      timeline: '3–5 weeks',
      budget: '$1,499.00',
      statustext: 'Submitted',
      statuscolor: 'chart-2',
    },
    {
      id:4 ,
      project: 'Xtreme Admin',
      productImg: 'https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-6.webp',
      name: 'Olivia Williams',
      role: 'Frontend Developer',
      timeline: '2–4 weeks',
      budget: '$1,499.00',
      statustext: 'Submitted',
      statuscolor: 'chart-2',
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = ProductTableData.filter((item) =>
    item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.role.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <Card className="rounded-none h-full gap-0 py-0 bg-background border-none ring-0">
      <CardHeader className='px-6 py-5'>
        <CardTitle className="text-lg font-medium leading-none">Top Selling Products</CardTitle>
        <CardAction>
          <div className="flex items-center gap-1">
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon height={18} width={18} />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);

                }}
                required
              />
            </InputGroup>

          </div>
        </CardAction>
      </CardHeader>
      <CardContent className='p-0'>
        <SimpleBar className="max-h-[450px]">
          <div className="overflow-x-auto">
            <div className="min-w-[550px]">
              <Table>
                <TableHeader className="border-b border-border">
                  <TableRow>
                    <TableHead className="py-2 px-6 text-sm font-normal text-muted-foreground">
                      Project
                    </TableHead>
                    <TableHead className="py-2 px-4 text-sm font-normal text-muted-foreground">
                      Assigned
                    </TableHead>
                    <TableHead className="py-2 px-4 text-sm font-normal text-muted-foreground">
                      Timeline
                    </TableHead>
                    <TableHead className="py-2 px-4 text-sm font-normal text-muted-foreground">
                      Budget
                    </TableHead>
                    <TableHead className="py-2 px-4 text-sm font-normal text-muted-foreground">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="whitespace-nowrap p-3 pl-6">
                        <h4 className="text-sm font-normal">{item.project}</h4>
                      </TableCell>
                      <TableCell className="whitespace-nowrap p-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.productImg}
                            className="rounded-full bg-black/20 dark:bg-white/20 pt-0.5 h-8 w-8"
                            alt="product-img"
                          />
                          <div className="flex flex-col">
                            <h6 className="text-sm font-medium">{item.name}</h6>
                            <p className="text-sm font-normal text-muted-foreground">{item.role}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className=" p-3">
                        <h4 className="text-sm font-normal">{item.timeline}</h4>
                      </TableCell>
                      <TableCell className="whitespace-nowrap  p-3">
                        <h4 className="text-sm font-normal">{item.budget}</h4>
                      </TableCell>
                      <TableCell className="p-3">
                        <Badge className={`bg-${item.statuscolor}/10  text-${item.statuscolor}  capitalize`}>
                          {item.statustext}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </SimpleBar>
      </CardContent>
    </Card>
  );
}

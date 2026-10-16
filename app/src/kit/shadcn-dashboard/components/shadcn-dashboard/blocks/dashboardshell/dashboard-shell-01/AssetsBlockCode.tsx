
'use client'
import { CardContent, CardHeader, Card, CardTitle } from '../../../../../../shadcn/ui/card';
import { Button } from '../../../../../../shadcn/ui/button';

import { Bookmark, BriefcaseBusiness, Box, Users, File } from 'lucide-react';


const assetsData = [
  {
    id: 'Employees',
    title: 'Employees',
    href: '/apps/kanban',
    value: '96',
    icon: Users
  },

  {
    id: 'Projects',
    title: 'Projects',
    href: '/apps/calendar',
    value: '356',
    icon: File
  },
  {
    id: 'Clients',
    title: 'Clients',
    href: '/',
    value: '3,650',
    icon: BriefcaseBusiness
  },
  {
    id: 'Events',
    title: 'Events',
    href: '/',
    value: '86',
    icon: Bookmark
  },
];

type AssetCardProps = {
  title: string;
  href: string;
  value: string | number;
  icon:any;
};

function AssetCard({ title, href, value, icon: Icon }: AssetCardProps) {
  return (
    <div className='flex flex-col justify-between p-6 bg-card'>
      <Button variant="outline" size="icon" className="h-8 w-8 pointer-events-none">
        <Icon size={16} />
      </Button>
      <div>
        <h6 className='text-2xl font-semibold'>{value}</h6>
        <p className='text-sm font-normal'>{title}</p>
      </div>
    </div>
  );
}

export default function TotalAssets() {
  return (
    <Card className="flex flex-col h-full gap-0 pb-0">
      <CardHeader className="border-b border-border">
        <div className="flex items-center gap-2">
          <Box size={16} className="text-muted-foreground" />
          <CardTitle className="text-sm font-medium text-foreground">Total Assets</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='h-full! px-0!'>
        <div className='h-full!'>
          <div className='grid grid-cols-2 h-full! gap-px bg-border'>
            {assetsData.map((item) => (
              <AssetCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

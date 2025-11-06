// import Link from 'next/link'

import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '~/components/ui/card'
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'

export default function UserStatCards() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Total User</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums text-3xl'>3412</CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Trending up this month <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>Visitors for the last 6 months</div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>New This Month</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>1,234</CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Down 20% this period <IconTrendingDown className='size-4' />
          </div>
          <div className='text-muted-foreground'>Acquisition needs attention</div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>45,678</CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Strong user retention <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Verify Users</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>4.5%</CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Steady performance increase <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}

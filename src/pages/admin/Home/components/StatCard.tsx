import { Link } from 'react-router-dom'
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  href
}: {
  title: string
  value: string | number
  change: number
  icon: LucideIcon
  color?: string
  href: string
}) {
  return (
    <>
      <Link to={href}>
        <Card className='cursor-pointer hover:shadow-lg transition-shadow'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{title}</CardTitle>
            <Icon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{value}</div>
            <p className={`text-xs flex items-center gap-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? <ArrowUpRight className='h-3 w-3' /> : <ArrowDownRight className='h-3 w-3' />}
              {typeof change === 'number' ? Math.abs(change).toFixed(2) : change} so với tháng trước
            </p>
          </CardContent>
        </Card>
      </Link>
    </>
  )
}

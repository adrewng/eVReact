import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card'

const stats = [
  { title: 'Tổng bài đăng', value: '882', change: '+3.1%', positive: true },
  { title: 'Bài đăng về xe', value: '450', change: '+2.8%', positive: true },
  { title: 'Bài đăng về pin', value: '220', change: '+1.5%', positive: true },
  { title: 'Bài đăng có chứng chỉ', value: '320', change: '+4.5%', positive: true }
]

export default function PostStats() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      {stats.map((s, i) => (
        <Card key={i} className='shadow-md'>
          <CardHeader>
            <CardTitle className='text-sm text-gray-500'>{s.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>{s.value}</p>
            <p className={`text-sm ${s.positive ? 'text-green-600' : 'text-red-600'}`}>{s.change} from last week</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

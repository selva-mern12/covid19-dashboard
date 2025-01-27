import {PieChart, Pie, Tooltip, Cell} from 'recharts'

const data = [
  {name: 'Category A', value: 400},
  {name: 'Category B', value: 300},
  {name: 'Category C', value: 300},
  {name: 'Category D', value: 200},
]

const MyPieChart = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'] // Custom colors for each segment

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        innerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  )
}

export default MyPieChart

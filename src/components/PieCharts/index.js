import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'

const CustomTooltip = ({active, payload}) => {
  if (active && payload && payload.length) {
    const tooltip = payload[0].payload
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: '#fff',
          padding: '10px',
          border: '1px solid #ccc',
        }}
      >
        <p>{`${tooltip.name}: ${new Intl.NumberFormat('en').format(
          tooltip.vaccine,
        )}`}</p>
      </div>
    )
  }
  return null
}

export const PieCharts = ({data, colors, ageVaccine}) => (
  <PieChart width={500} height={ageVaccine ? 500 : 250}>
    <Pie
      data={data}
      cx="50%"
      cy={ageVaccine ? '50%' : '90%'}
      outerRadius={ageVaccine ? 200 : 160}
      innerRadius={ageVaccine ? 0 : 120}
      startAngle={ageVaccine ? 360 : 180}
      endAngle={0}
      fill="#8884d8"
      dataKey="vaccine"
      minAngle={5}
      stroke="none"
      marginBottom={0}
    >
      {data.map(entry => (
        <Cell
          key={`cell-${entry.name}`}
          fill={colors[entry.name.toLowerCase()]}
        />
      ))}
    </Pie>
    <Tooltip content={<CustomTooltip />} />
    <Legend
      payload={data.map(item => ({
        value: item.name,
        type: 'circle',
        color: colors[item.name.toLowerCase()],
      }))}
    />
  </PieChart>
)

// const vaccinationData = [
//   {name: 'Jan', vaccinated: 1000000},
//   {name: 'Feb', vaccinated: 1200000},
//   {name: 'Mar', vaccinated: 1500000},
//   {name: 'Apr', vaccinated: 1800000},
//   {name: 'May', vaccinated: 2100000},
//   {name: 'Jun', vaccinated: 2300000},
//   {name: 'Jul', vaccinated: 2500000},
// ]

export const LineCharts = ({topic, dateCaseDetails, color}) => {
  let headingColor
  if (topic === 'Total Active') {
    headingColor = 'active'
  } else if (topic === 'teste') {
    headingColor = 'tested'
  } else {
    headingColor = topic
  }
  return (
    <div
      className={`line-charts ${
        topic === 'Total Active' ? 'active' : topic
      }-bg`}
    >
      <p className={`line-chart-topic ${headingColor}`}>
        {topic === 'teste' ? 'tested' : topic}
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={dateCaseDetails}>
          <XAxis dataKey="date" interval={10} />
          <YAxis
            domain={['dataMin', 'dataMax']}
            padding={{top: 20, bottom: 20}}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="cases"
            stroke={color}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// // export default VaccinationLineChart

// // const data = [
// //   {name: 'Jan', uv: 4000, pv: 2400, amt: 2400},
// //   {name: 'Feb', uv: 3000, pv: 1398, amt: 2210},
// //   {name: 'Mar', uv: 2000, pv: 9800, amt: 2290},
// //   {name: 'Apr', uv: 2780, pv: 3908, amt: 2000},
// //   {name: 'May', uv: 1890, pv: 4800, amt: 2181},
// //   {name: 'Jun', uv: 2390, pv: 3800, amt: 2500},
// //   {name: 'Jul', uv: 3490, pv: 4300, amt: 2100},
// // ]

// // export const MultiAreaLineChart = () => (
// //   <ResponsiveContainer width="100%" height={400}>
// //     <AreaChart
// //       data={data}
// //       margin={{
// //         top: 10,
// //         right: 30,
// //         left: 0,
// //         bottom: 0,
// //       }}
// //     >
// //       <XAxis dataKey="name" />
// //       <YAxis />
// //       <Tooltip />

// //       <Area
// //         type="monotone"
// //         dataKey="uv"
// //         stroke="#A226DC"
// //         fill="#2E1E30"
// //         strokeWidth={3}
// //       />
// //       <Area
// //         type="monotone"
// //         dataKey="pv"
// //         stroke="#FCEA4E"
// //         fill="#3E4226"
// //         strokeWidth={3}
// //       />
// //       <Area
// //         type="monotone"
// //         dataKey="amt"
// //         stroke="#37C62B"
// //         fill="#233323"
// //         strokeWidth={3}
// //       />
// //     </AreaChart>
// //   </ResponsiveContainer>
// // )

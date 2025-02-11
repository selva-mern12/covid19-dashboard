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

export const PieCharts = ({data, colors, ageVaccine}) => {
  const isLargeScreen = window.innerWidth > 769

  const width = isLargeScreen ? 500 : 250
  let height
  if (isLargeScreen) {
    height = ageVaccine ? 500 : 250
  } else {
    height = ageVaccine ? 400 : 200
  }

  const cx = '50%'
  const cy = ageVaccine ? '50%' : '90%'

  let outerRadius
  if (isLargeScreen) {
    outerRadius = ageVaccine ? 200 : 160
  } else {
    outerRadius = ageVaccine ? 120 : 90
  }

  let innerRadius
  if (isLargeScreen) {
    innerRadius = ageVaccine ? 0 : 120
  } else {
    innerRadius = ageVaccine ? 0 : 65
  }

  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        cx={cx}
        cy={cy}
        outerRadius={outerRadius}
        innerRadius={innerRadius}
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
}

// export const PieCharts = ({data, colors, ageVaccine}) => (
//   <PieChart
//     width={window.innerWidth > 769 ? 500 : 250}
//     height={
//       window.innerWidth > 769
//         ? ageVaccine
//           ? 500
//           : 250
//         : ageVaccine
//         ? 400
//         : 200
//     }
//   >
//     <Pie
//       data={data}
//       cx="50%"
//       cy={ageVaccine ? '50%' : '90%'}
//       outerRadius={
//         window.innerWidth > 769
//           ? ageVaccine
//             ? 200
//             : 160
//           : ageVaccine
//           ? 120
//           : 90
//       }
//       innerRadius={
//         window.innerWidth > 769 ? (ageVaccine ? 0 : 120) : ageVaccine ? 0 : 65
//       }
//       startAngle={ageVaccine ? 360 : 180}
//       endAngle={0}
//       fill="#8884d8"
//       dataKey="vaccine"
//       minAngle={5}
//       stroke="none"
//       marginBottom={0}
//     >
//       {data.map(entry => (
//         <Cell
//           key={`cell-${entry.name}`}
//           fill={colors[entry.name.toLowerCase()]}
//         />
//       ))}
//     </Pie>
//     <Tooltip content={<CustomTooltip />} />
//     <Legend
//       payload={data.map(item => ({
//         value: item.name,
//         type: 'circle',
//         color: colors[item.name.toLowerCase()],
//       }))}
//     />
//   </PieChart>
// )

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
      <LineChart data={dateCaseDetails} width={1000} height={300}>
        <XAxis dataKey="date" interval={10} />
        <YAxis
          domain={['dataMin', 'dataMax']}
          padding={{top: 20, bottom: 20}}
        />
        <Tooltip />
        <Line type="monotone" dataKey="cases" stroke={color} strokeWidth={3} />
      </LineChart>
    </div>
  )
}

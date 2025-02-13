import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts'

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

export default PieCharts

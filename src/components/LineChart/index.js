import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Tooltip, LineChart, Line, XAxis, YAxis} from 'recharts'
import {LoadingView, FailureView} from '../UnsuccessPage'

const dateWiseCasesColors = {
  confirmed: '#FF073A',
  'Total Active': '#007BFF',
  recovered: '#27A243',
  deceased: '#6C757D',
  teste: '#9673B9',
}

const pageStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class LineCharts extends Component {
  state = {dateWiseCases: {}, lineChartStatus: pageStatus.initial}

  componentDidMount() {
    this.getDistrictsDateWise()
  }

  getDistrictsDateWise = async () => {
    this.setState({lineChartStatus: pageStatus.loading})
    try {
      const {match} = this.props
      const {params} = match
      const {stateCode} = params
      const dateWiseResponse = await fetch(
        `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`,
      )
      if (dateWiseResponse.ok) {
        const dateWiseData = await dateWiseResponse.json()
        if (!dateWiseData[stateCode] || !dateWiseData[stateCode].dates) {
          this.setState({lineChartStatus: pageStatus.failure})
          return
        }
        const dateWiseCases = dateWiseData[stateCode].dates
        const stateDatesCase = Object.entries(dateWiseCases).reduce(
          (acc, [key, value]) => {
            const changeDate = new Date(key)
            const formatDate = `${changeDate.getDate()} ${changeDate.toLocaleString(
              'default',
              {month: 'short'},
            )}\n${changeDate.getFullYear()}`
            acc.confirmed.push({date: formatDate, cases: value.total.confirmed})
            acc['Total Active'].push({
              date: formatDate,
              cases:
                value.total.confirmed -
                (value.total.deceased + value.total.recovered),
            })
            acc.recovered.push({date: formatDate, cases: value.total.recovered})
            acc.deceased.push({date: formatDate, cases: value.total.deceased})
            acc.teste.push({date: formatDate, cases: value.total.tested})

            return acc
          },
          {
            confirmed: [],
            'Total Active': [],
            recovered: [],
            deceased: [],
            teste: [],
          },
        )

        this.setState({
          dateWiseCases: stateDatesCase,
          lineChartStatus: pageStatus.success,
        })
      } else {
        this.setState({lineChartStatus: pageStatus.failure})
      }
    } catch {
      this.setState({lineChartStatus: pageStatus.failure})
    }
  }

  renderLineCharts = (key, value) => {
    let headingColor = key === 'Total Active' ? 'active' : key
    if (key === 'teste') headingColor = 'tested'
    const {lineChartStatus} = this.state
    switch (lineChartStatus) {
      case pageStatus.loading:
        return <LoadingView dataTestId="lineChartLoader" />
      case pageStatus.failure:
        return <FailureView />
      case pageStatus.success:
        return (
          <div key={key} className={`line-charts ${headingColor}-bg`}>
            <p className={`line-chart-topic ${headingColor}`}>
              {key === 'teste' ? 'tested' : key}
            </p>
            <LineChart data={value} width={1000} height={300}>
              <XAxis dataKey="date" interval={10} />
              <YAxis
                domain={['dataMin', 'dataMax']}
                padding={{top: 20, bottom: 20}}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="cases"
                stroke={dateWiseCasesColors[key]}
                strokeWidth={3}
              />
            </LineChart>
          </div>
        )

      default:
        return null
    }
  }

  render() {
    const {dateWiseCases} = this.state

    return (
      <ul>
        {Object.entries(dateWiseCases).map(([key, value]) =>
          this.renderLineCharts(key, value),
        )}
      </ul>
    )
  }
}

export default withRouter(LineCharts)

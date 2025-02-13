import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {BarChart, Bar, XAxis, YAxis, Tooltip} from 'recharts'
import {LoadingView, FailureView} from '../UnsuccessPage'

import './index.css'

const pageStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

const StateChart = ({caseChart}) => {
  const [stateCaseDetails, setStateCaseDetails] = useState([])
  const [stateChartStatus, setStateChartStatus] = useState(pageStatus.initial)
  const {stateCode = 'TN'} = useParams()

  useEffect(() => {
    let isMounted = true

    const getStateCaseDetails = async () => {
      setStateChartStatus(pageStatus.loading)
      const response = await fetch(
        `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`,
      )
      if (response.ok) {
        const fetchData = await response.json()
        const stateDetails = fetchData[stateCode]
        const {dates} = stateDetails
        const datesArray = Object.entries(dates)
        const last10Entries = datesArray.slice(-10)
        const last10Dates = Object.fromEntries(last10Entries)
        const casesData = Object.entries(last10Dates).map(([date, data]) => {
          const parsedDate = new Date(date)
          const monthName = parsedDate.toLocaleString('default', {
            month: 'short',
          })
          return {
            date: `${parsedDate.getDate()} ${monthName} \n ${parsedDate.getFullYear()}`,
            confirmed: data.total.confirmed,
            recovered: data.total.recovered,
            deceased: data.total.deceased,
            active:
              data.total.confirmed -
              (data.total.deceased + data.total.recovered),
          }
        })

        if (isMounted) {
          setStateCaseDetails(casesData)
          setStateChartStatus(pageStatus.success)
        }
      } else {
        setStateChartStatus(pageStatus.loading)
      }
    }

    getStateCaseDetails()

    return () => {
      isMounted = false
    }
  }, [stateCode])

  const renderCaseWise = () => {
    switch (caseChart) {
      case 'confirmed':
        return (
          <BarChart
            width={window.innerWidth >= 769 ? 1200 : 400}
            height={window.innerWidth >= 769 ? 500 : 300}
            data={stateCaseDetails}
            testid="stateSpecificConfirmedCasesContainer"
          >
            <XAxis dataKey="date" />
            <YAxis tickFormatter={value => `${value / 1000}k`} />
            <Tooltip />
            <Bar dataKey="confirmed" fill="#9A0E31" />
          </BarChart>
        )
      case 'active':
        return (
          <BarChart
            width={window.innerWidth >= 769 ? 1200 : 400}
            height={window.innerWidth >= 769 ? 500 : 300}
            data={stateCaseDetails}
            testid="stateSpecificActiveCasesContainer"
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="active" fill="#0A4FA0" />
          </BarChart>
        )
      case 'recovered':
        return (
          <BarChart
            width={window.innerWidth >= 769 ? 1200 : 400}
            height={window.innerWidth >= 769 ? 500 : 300}
            data={stateCaseDetails}
            testid="stateSpecificRecoveredCasesContainer"
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="recovered" fill="#216837" />
          </BarChart>
        )
      case 'deceased':
        return (
          <BarChart
            width={window.innerWidth >= 769 ? 1200 : 400}
            height={window.innerWidth >= 769 ? 500 : 300}
            data={stateCaseDetails}
            testid="stateSpecificDeceasedCasesContainer"
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="deceased" fill="#474C57" />
          </BarChart>
        )
      default:
        return null
    }
  }

  const renderStateChart = () => {
    switch (stateChartStatus) {
      case pageStatus.loading:
        return <LoadingView dataTestId="timelinesDataLoader" />
      case pageStatus.success:
        return renderCaseWise()
      case pageStatus.failure:
        return <FailureView />
      default:
        return null
    }
  }

  return <div>{renderStateChart()}</div>
}

export default StateChart

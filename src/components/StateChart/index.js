import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {BarChart, Bar, XAxis, YAxis, Tooltip} from 'recharts'

const StateChart = ({caseChart}) => {
  const [stateCaseDetails, setStateCaseDetails] = useState([])
  const {stateCode = 'TN'} = useParams()

  useEffect(() => {
    const getStateCaseDetails = async () => {
      const response = await fetch(
        `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`,
      )
      if (response.ok) {
        const fetchData = await response.json()
        const stateDetails = fetchData[stateCode]
        const {dates} = stateDetails

        const casesData = Object.entries(dates).map(([date, data]) => {
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

        setStateCaseDetails(casesData)
      }
    }

    getStateCaseDetails()
  }, [stateCode])

  const renderStateChart = () => {
    switch (caseChart) {
      case 'confirmed':
        return (
          <BarChart
            width={1200}
            height={500}
            data={stateCaseDetails}
            testid="stateSpecificConfirmedCasesContainer"
          >
            <XAxis dataKey="date" interval={10} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="confirmed" fill="#9A0E31" />
          </BarChart>
        )
      case 'active':
        return (
          <BarChart
            width={1200}
            height={500}
            data={stateCaseDetails}
            testid="stateSpecificActiveCasesContainer"
          >
            <XAxis dataKey="date" interval={10} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="active" fill="#0A4FA0" />
          </BarChart>
        )
      case 'recovered':
        return (
          <BarChart
            width={1200}
            height={500}
            data={stateCaseDetails}
            testid="stateSpecificRecoveredCasesContainer"
          >
            <XAxis dataKey="date" interval={10} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="recovered" fill="#216837" />
          </BarChart>
        )
      case 'deceased':
        return (
          <BarChart
            width={1200}
            height={500}
            data={stateCaseDetails}
            testid="stateSpecificDeceasedCasesContainer"
          >
            <XAxis dataKey="date" interval={10} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="deceased" fill="#474C57" />
          </BarChart>
        )
      default:
        return null
    }
  }

  return <div>{renderStateChart()}</div>
}

export default StateChart

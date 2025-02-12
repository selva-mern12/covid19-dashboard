import {useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import CovidContext from '../../Context/CovidContext'
import './index.css'

const Map = () => {
  const [tooltip, setTooltip] = useState({visible: false, name: '', x: 0, y: 0})
  const {stateCode} = useParams()

  const handleMouseMove = (event, stateName) => {
    setTooltip({
      visible: true,
      name: stateName,
      x: event.clientX,
      y: event.clientY + 35,
    })
  }

  const handleMouseLeave = () =>
    setTooltip({visible: false, name: '', x: 0, y: 0})

  return (
    <CovidContext.Consumer>
      {value => {
        const {statesList} = value
        return (
          <div className="map-container">
            {/* Tooltip */}
            {tooltip.visible && (
              <div
                style={{
                  position: 'absolute',
                  left: tooltip.x,
                  top: tooltip.y,
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#fff',
                  padding: '5px 8px',
                  borderRadius: '4px',
                  pointerEvents: 'none',
                  fontSize: '20px',
                }}
              >
                {tooltip.name}
              </div>
            )}
            <svg
              baseProfile="tiny"
              fill="#6f9c76"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth=".5"
              version="1.2"
              viewBox="0 0 1000 1000"
              height={window.innerWidth > 769 ? 1200 : 800}
              width={window.innerWidth > 769 ? 1200 : 800}
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              {statesList.map(state => (
                <Link to={`/state/${state.state_code}`} key={state.state_code}>
                  <path
                    d={state.state_path}
                    id={state.state_code}
                    className={
                      state.state_code === stateCode
                        ? 'active-state'
                        : 'india-state'
                    }
                    onMouseMove={event =>
                      handleMouseMove(event, state.state_name)
                    }
                    onMouseLeave={handleMouseLeave}
                  />
                </Link>
              ))}
            </svg>
          </div>
        )
      }}
    </CovidContext.Consumer>
  )
}

export default Map

// <!--********* Copyright (c) 2024 Pareto Softare, LLC DBA Simplemaps.com ***************************************
// ************* Free for Commercial Use, full terms at  https://simplemaps.com/resources/svg-license ************
// ************* Attribution is appreciated! https://simplemaps.com *******************************************-->

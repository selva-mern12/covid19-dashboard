const CommonCaseDetails = props => {
  const {caseDetails, getCase = null, caseChart = undefined, country} = props
  console.log(caseChart)
  const {confirmed, deceased, recovered, active} = caseDetails
  return (
    <div className="case-group">
      <div
        className={
          caseChart === 'confirmed'
            ? 'confirmed confirmed-bg case-container'
            : 'confirmed case-container'
        }
        onClick={
          typeof getCase === 'function' ? () => getCase('confirmed') : undefined
        }
        testid={
          country
            ? 'countryWideConfirmedCases'
            : 'stateSpecificConfirmedCasesContainer'
        }
      >
        <p className="case-head">Confirmed</p>
        <img
          src="https://i.ibb.co/9Vgx5NB/check-mark-1.png"
          alt={
            country
              ? 'country wide confirmed cases pic'
              : 'state specific confirmed cases pic'
          }
          className="case-img"
        />
        <p className="case-count">{confirmed}</p>
      </div>
      <div
        className={
          caseChart === 'active'
            ? 'active active-bg case-container'
            : 'active case-container'
        }
        onClick={
          typeof getCase === 'function' ? () => getCase('active') : undefined
        }
        testid={
          country
            ? 'countryWideActiveCases'
            : 'stateSpecificActiveCasesContainer'
        }
      >
        <p className="case-head">Active</p>
        <img
          src="https://i.ibb.co/qknm8f0/protection-1.png"
          alt={
            country
              ? 'country wide active cases pic'
              : 'state specific active cases pic'
          }
          className="case-img"
        />
        <p className="case-count">{active}</p>
      </div>
      <div
        className={
          caseChart === 'recovered'
            ? 'recovered recovered-bg case-container'
            : 'recovered case-container'
        }
        onClick={
          typeof getCase === 'function' ? () => getCase('recovered') : undefined
        }
        testid={
          country
            ? 'countryWideRecoveredCases'
            : 'stateSpecificRecoveredCasesContainer'
        }
      >
        <p className="case-head">Recovered</p>
        <img
          src="https://i.ibb.co/rHB47jp/recovered-1.png"
          alt={
            country
              ? 'country wide recovered cases pic'
              : 'state specific recovered cases pic'
          }
          className="case-img"
        />
        <p className="case-count">{recovered}</p>
      </div>
      <div
        className={
          caseChart === 'deceased'
            ? 'deceased deceased-bg case-container'
            : 'deceased case-container'
        }
        onClick={
          typeof getCase === 'function' ? () => getCase('deceased') : undefined
        }
        testid={
          country
            ? 'countryWideDeceasedCases'
            : 'stateSpecificDeceasedCasesContainer'
        }
      >
        <p className="case-head">Deceased</p>
        <img
          src="https://i.ibb.co/rQr5jjc/breathing-1.png"
          alt={
            country
              ? 'country wide deceased cases pic'
              : 'state specific deceased cases pic'
          }
          className="case-img"
        />
        <p className="case-count">{deceased}</p>
      </div>
    </div>
  )
}

export default CommonCaseDetails

const CommonCaseDetails = props => {
  const {caseDetails, getCase = null, caseChart = undefined} = props
  console.log(caseChart)
  const {
    confirmed = '34285612',
    deceased = '458470',
    recovered = '33661339',
  } = caseDetails
  const active = confirmed - (deceased + recovered)
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
      >
        <p className="case-head">Confirmed</p>
        <img
          src="https://i.ibb.co/9Vgx5NB/check-mark-1.png"
          alt="check-mark"
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
      >
        <p className="case-head">Active</p>
        <img
          src="https://i.ibb.co/qknm8f0/protection-1.png"
          alt="protection-1"
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
      >
        <p className="case-head">Recoverd</p>
        <img
          src="https://i.ibb.co/rHB47jp/recovered-1.png"
          alt="recovered-1"
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
      >
        <p className="case-head">Deceased</p>
        <img
          src="https://i.ibb.co/rQr5jjc/breathing-1.png"
          alt="breathing-1"
          className="case-img"
        />
        <p className="case-count">{deceased}</p>
      </div>
    </div>
  )
}

export default CommonCaseDetails

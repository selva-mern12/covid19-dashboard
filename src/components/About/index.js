import {useState, useEffect} from 'react'
import {MdDoubleArrow} from 'react-icons/md'

import {Header, Footer} from '../HeaderFooter'
import {LoadingView, FailureView} from '../UnsuccessPage'
import './index.css'

const pageStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

const About = () => {
  const [aboutDetails, setAboutDetails] = useState({faqs: [], factoids: []})
  const [aboutStatus, setAboutStatus] = useState(pageStatus.initial)

  useEffect(() => {
    const fetchAboutData = async () => {
      setAboutStatus(pageStatus.loading)
      const response = await fetch('https://apis.ccbp.in/covid19-faqs')

      if (response.ok) {
        const aboutData = await response.json()
        setAboutDetails({faqs: aboutData.faq, factoids: aboutData.factoids})
        setAboutStatus(pageStatus.success)
      } else {
        setAboutStatus(pageStatus.failure)
      }
    }

    fetchAboutData()
  }, [])

  const renderAboutPage = () => {
    switch (aboutStatus) {
      case pageStatus.loading:
        return <LoadingView />
      case pageStatus.failure:
        return <FailureView />
      case pageStatus.success:
        return (
          <div className="about-content-container">
            <div className="faq-container">
              <h3 className="faq-heading">
                COVID-19 vaccines be ready for distribution
              </h3>
              <ul className="faq-list">
                {aboutDetails.faqs.map(faq => (
                  <li key={faq.qno}>
                    <p className="faq-question">
                      {faq.question} <span>{faq.category}</span>
                    </p>
                    <p className="faq-answer">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="faq-heading">Important Factoid</h3>
              <ul className="factoids-list">
                {aboutDetails.factoids.map(factoid => (
                  <li key={factoid.id} className="banner">
                    <MdDoubleArrow color="yellow" /> {factoid.banner}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="about-bg-container">
      <Header />
      <div className="about-container">
        <div className="about-heading-container">
          <h1 className="about-heading">About</h1>
          <p className="about-date">Last update on march 28th 2021.</p>
        </div>
        <div>{renderAboutPage()}</div>
        <Footer />
      </div>
    </div>
  )
}

export default About

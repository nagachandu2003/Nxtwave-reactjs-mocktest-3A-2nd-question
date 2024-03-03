import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseListItem from '../CourseListItem'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {apiState: apiStatus.initial, courseList: []}

  componentDidMount() {
    this.getItems()
  }

  onRetry = () => {
    this.getItems()
  }

  getItems = async () => {
    this.setState({apiState: apiStatus.loading})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok === true) {
      const data = await response.json()
      const {courses} = data
      const finalData = courses.map(ele => ({
        id: ele.id,
        logoUrl: ele.logo_url,
        name: ele.name,
      }))
      this.setState({courseList: finalData, apiState: apiStatus.success})
    } else {
      this.setState({apiState: apiStatus.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" height="80" width="80" color="#475569" />
    </div>
  )

  renderSuccessView = () => {
    const {courseList} = this.state
    return (
      <>
        <h1 className="main-heading">Courses</h1>
        <div className="inner-container">
          <ul className="hm-course-list-container">
            {courseList.map(ele => (
              <CourseListItem key={ele.id} courseItemDetails={ele} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        className="fail-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <p className="fail-par">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.onRetry} type="button" className="fail-button">
        Retry
      </button>
    </div>
  )

  renderViews = () => {
    const {apiState} = this.state
    switch (apiState) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.loading:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="home-container">{this.renderViews()}</div>
      </>
    )
  }
}

export default Home

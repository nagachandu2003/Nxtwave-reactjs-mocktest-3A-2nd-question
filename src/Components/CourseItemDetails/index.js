import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CourseItemDetails extends Component {
  state = {apiState: 'INITIAL', courseDetails: []}

  componentDidMount() {
    this.getCourseDetails()
  }

  onRetry2 = () => {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiState: apiStatus.loading})
    const {match} = this.props
    const {id} = match.params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok === true) {
      const data = await response.json()
      const courseDetails = data.course_details
      const finalCourseDetails = {
        id: courseDetails.id,
        name: courseDetails.name,
        imageUrl: courseDetails.image_url,
        description: courseDetails.description,
      }
      this.setState({
        apiState: apiStatus.success,
        courseDetails: finalCourseDetails,
      })
    } else this.setState({apiState: apiStatus.failure})
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" height="80" width="80" color="#475569" />
    </div>
  )

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
      <button onClick={this.onRetry2} type="button" className="fail-button">
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="cd-cont">
        <img className="cd-img" src={imageUrl} alt={name} />
        <div className="cd-inner-cont">
          <h1 className="cd-heading">{name}</h1>
          <p className="cd-par">{description}</p>
        </div>
      </div>
    )
  }

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
    return <div className="cid-cont">{this.renderViews()}</div>
  }
}
export default CourseItemDetails

import {Link} from 'react-router-dom'
import './index.css'

const CourseListItem = props => {
  const {courseItemDetails} = props
  const {id, logoUrl, name} = courseItemDetails
  return (
    <Link className="link-i" to={`/courses/${id}/`}>
      <li className="course-list-item">
        <img className="cl-img" src={logoUrl} alt={name} />
        <p className="cl-heading">{name}</p>
      </li>
    </Link>
  )
}

export default CourseListItem

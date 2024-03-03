import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <img
      className="nf-img"
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
    />
    <h1 className="nf-heading">Page Not Found</h1>
    <p className="nf-par">
      We are sorry, the page you requested could not be found.
    </p>
  </div>
)
export default NotFound

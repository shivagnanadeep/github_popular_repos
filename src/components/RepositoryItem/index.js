// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {name, issues_count, forks_count, stars_count, avatar_url} = itemDetails
  return (
    <div className="item-container">
      <img src={avatar_url} alt={name} className="avatar" />
      <h1 className="name">{name}</h1>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="image"
        />
        <p>{stars_count} stars</p>
      </div>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="image"
        />
        <p>{forks_count} stars</p>
      </div>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="image"
        />
        <p>{issues_count} stars</p>
      </div>
    </div>
  )
}
export default RepositoryItem

// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {filterDetails, activeFilter, changeActiveFilter} = props
  const {id, language} = filterDetails
  const activeButton = activeFilter === true ? 'active-button' : ''
  const onClickFilter = () => {
    changeActiveFilter(id)
  }
  return (
    <li>
      <button
        className={`button ${activeButton}`}
        type="button"
        onClick={onClickFilter}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem

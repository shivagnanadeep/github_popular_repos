import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeFilter: languageFiltersData[0].id,
    reposList: [],
    status: statusConstants.initial,
  }

  componentDidMount() {
    this.getRepos()
  }

  changeActiveFilter = id => {
    this.setState({activeFilter: id}, this.getRepos)
  }

  getRepos = async () => {
    this.setState({status: statusConstants.loading})
    const {activeFilter} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeFilter}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos
      this.setState({reposList: updatedData, status: statusConstants.success})
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  renderFilters = () => {
    const {activeFilter} = this.state
    return (
      <ul className="filter-item-list">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            filterDetails={each}
            activeFilter={each.id === activeFilter}
            changeActiveFilter={this.changeActiveFilter}
          />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => {
    const {reposList} = this.state
    return (
      <ul className="repos-list">
        {reposList.map(each => (
          <RepositoryItem itemDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderReposView = () => {
    const {status} = this.state
    switch (status) {
      case statusConstants.success:
        return this.renderSuccessView()
      case statusConstants.loading:
        return this.renderLoadingView()
      case statusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure"
      />
      <h1>Something Went Wrong</h1>
    </>
  )

  render() {
    return (
      <div className="main-container">
        <h1>Popular</h1>
        {this.renderFilters()}
        {this.renderReposView()}
      </div>
    )
  }
}
export default GithubPopularRepos

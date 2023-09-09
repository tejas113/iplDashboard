import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class Home extends Component {
  state = {
    teamList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.renderTeamDetails()
  }

  renderTeamDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const updatedArray = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))

    this.setState({
      teamList: updatedArray,
      isLoading: false,
    })

    console.log(updatedArray)
  }

  render() {
    const {isLoading, teamList} = this.state
    return (
      <div className="appCont">
        <div className="iplLogoCont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl Logo"
            className="logoEdit"
          />
          <h1 className="headEdit">IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <Loader type="Oval" color="#ffffff" height={50} />
        ) : (
          <ul className="ulEdit">
            {teamList.map(eachItem => (
              <TeamCard teamList={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Home

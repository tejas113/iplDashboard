import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class TeamMatches extends Component {
  state = {matchesData: [], isLoading: true}

  componentDidMount() {
    this.renderTeamMatches()
  }

  renderTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)
    const updatedDetails = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        date: data.latest_match_details.date,
        firstInnings: data.latest_match_details.first_innings,
        id: data.latest_match_details.id,
        manOfTheInnings: data.latest_match_details.man_of_the_match,
        matchStatus: data.latest_match_details.match_status,
        result: data.latest_match_details.result,
        secondInnings: data.latest_match_details.second_innings,
        umpires: data.latest_match_details.umpires,
        venue: data.latest_match_details.venue,
      },
      recentMatches: data.recent_matches.map(eachItem => ({
        competingTeam: eachItem.competing_team,
        competingTeamLogo: eachItem.competing_team_logo,
        date: eachItem.date,
        firstInnings: eachItem.first_innings,
        id: eachItem.id,
        manOfTheInnings: eachItem.man_of_the_match,
        matchStatus: eachItem.match_status,
        result: eachItem.result,
        secondInnings: eachItem.second_innings,
        umpires: eachItem.umpires,
        venue: eachItem.venue,
      })),
    }
    this.setState({
      matchesData: updatedDetails,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
    </div>
  )

  render() {
    // eslint-disable-next-line
    const {matchesData, isLoading} = this.state
    // eslint-disable-next-line
    const {teamBannerUrl, latestMatchDetails, recentMatches} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className={`app-team-matches-container ${id}`}>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div className="matchListCont">
            <img src={teamBannerUrl} alt="hi" className="img4Edit" />
            <LatestMatch latestMatch={latestMatchDetails} />
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches

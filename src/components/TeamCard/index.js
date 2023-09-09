import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {teamList} = props
  const {id, name, teamImageUrl} = teamList
  return (
    <Link to={`/team-matches/${id}`}>
      <div className="contEdit">
        <img alt={name} src={teamImageUrl} className="teamImgEdit" />
        <h1 className="headEdit4">{name}</h1>
      </div>
    </Link>
  )
}
export default TeamCard

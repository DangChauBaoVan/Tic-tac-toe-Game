import "./strike.css"

type StrikeProps = {
  strikeClass: string|null;
}

const Strike = ({strikeClass}: StrikeProps) => {
  return (
    <div className={`strike ${strikeClass}`}></div>
  )
}

export default Strike
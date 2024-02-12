import { useSelector } from "react-redux";
export const HeaderRight = ({ children }) => {
  const app = useSelector(state => state.app)
  return (
    app[0] ?
      <div className="header-right">stratum+tcp://mining-expert.ru:7777</div>
      : null
  )
}
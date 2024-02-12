import { useSelector } from "react-redux";
export const HeaderRight = ({ children }) => {
  const app = useSelector(state => state.app)
  return (
    app[0] ?
      <div className="header-right">stratum+tcp://185.163.119.18:3333</div>
      : null
  )
}
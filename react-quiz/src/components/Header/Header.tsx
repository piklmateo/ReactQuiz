import ReactLogo from "../../assets/react.svg";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <img className="logo" src={ReactLogo} alt="react-logo" />
      <h1>React Quiz</h1>
    </div>
  );
};

export default Header;

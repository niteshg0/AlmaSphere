import { Link, useNavigate } from "react-router-dom";
import {useSelector} from "react-redux"

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const profileClick = () => {
    navigate("/profile")
  }
  const {user} = useSelector(state => state.auth)
  const existUser = user?.data?.fullName
  return (
    <>
      <nav>
        <div className="bg-black text-white pt-7 pb-5 px-8 flex justify-between ">
          <h2
            className="font-bold font-serif cursor-pointer text-xl"
            onClick={handleClick}
          >
            Home
          </h2>
          <ul className="flex gap-10 align-middle py-1">
            <Link to="/about">AbOut-Us</Link>
            <Link to="/contact">Contact-Us</Link>
            <Link to="">FaQ</Link>
          </ul>
          {!existUser?<Link to={"/login"}>
            <button className="border px-8 py-2 rounded-xl mr-3 cursor-pointer">
              Login
            </button>
          </Link>:<div className="border px-8 py-2 rounded-xl mr-3 cursor-pointer"  onClick={profileClick}>
              {existUser}
            </div>}
        </div>
      </nav>
    </>
  );
};

export default Header;

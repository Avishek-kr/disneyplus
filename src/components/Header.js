import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, provider } from "../firebase";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history.push("/home");
      }
    });
  }, [userName]);

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          history.push("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>
      <Owner>
        <img src="/images/Avishek.svg" alt="Disney+" />
      </Owner>

      {!userName ? (
        
        <Login onClick={handleAuth}><Subscribe>SUBSCRIBE</Subscribe> Login</Login>
      ) : (
        <>
          <NavMenu>
          <a href="/home">
                            <span>TV</span>
                        </a>
                        <a>
                            <span>Movies</span>
                        </a>
                        <a>
                            <span>Sports</span>
                        </a>
                        <a>
                            <span>News</span>
                        </a>
                        <a>
                            <span>Premium</span>
                        </a>
                        <a>
                            <span>Disney+</span>
                        </a>
                        <a className="kids">
                            <span style={{ color: "#FFAA05", fontFamily: "cursive", fontWeight: "bold" }}>KIDS</span>
                        </a>

          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
            
          </SignOut>
          
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #131A27;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  margin-top: -15px;
  margin-left:1rem;
  width: 70px;
  max-height: 100px;
  font-size: 0px;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  /* padding-top: 15px; */
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  a {
    display: flex;
    align-items: center;
    padding: 0 18px;
    span {
      color: rgb(249, 249, 249);
      font-size: 18px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 10px;
      white-space: nowrap;
      position: relative;
      cursor: pointer;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  /* @media (max-width: 768px) {
    display: none;
  } */
`;

const Owner= styled.div`
 /* margin-top: -15px; */
  /* margin-left:1rem; */
  width: 100px;
  max-height: 100px;
  font-size: 0px;
  transition: 0.3s ease-out;
  &:hover{
    transform:scale(1.2);
  }
  img {
    display: block;
    width: 100%;
}
 @media (max-width: 768px) {
    display: none;
  }
`;

const Subscribe = styled.a`
  font-weight: 900;
  color: #f9f9f9;
  background-color: #0063e5;
  /* margin-bottom: 12px; */
  /* width: 100%; */
  letter-spacing: 1.5px;
  font-size: 12px;
  padding: 5px;
  border: 1px solid transparent;
  border-radius: 4px;
  &:hover {
    background-color: #0483ee;
  }
`;

const Login = styled.a`
  /* background-color: rgba(0, 0, 0, 0.6); */
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-right:1rem;
  /* border: 1px solid #f9f9f9; */
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  font-weight:bold;
  cursor: pointer;
  /* &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  } */
`;


const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 8px;
  right: 60px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 2px;
  text-align:center;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;

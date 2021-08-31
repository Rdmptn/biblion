export const NavBar = (props) => {
  // console.log("++++++++====", props);
  // return <div>HiHIHIHIHIHIHI</div>
  return <div>{props.currentUser? <div><div>{props.currentUser.email}</div><a></a></div>  : "hi"/*<a  /> */}</div>
}
export default NavBar;
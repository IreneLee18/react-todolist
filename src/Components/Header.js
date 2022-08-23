import logoImage from '../image/logo.png'
function Header() {
  return (
    <header>
      <img src={logoImage} alt="logo" />
      <ul>
        <li>
          <p>我的代辦</p>
        </li>
        <li>登出</li>
      </ul>
    </header>
  );
}
export default Header;
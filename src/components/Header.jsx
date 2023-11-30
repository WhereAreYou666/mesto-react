import Logo from '../images/Logo.svg';

export default function Header() {
  return (
    <>
      <header className="header">
        <img src={Logo} alt="Mesto" className="header__logo" />
      </header>
    </>
  )
}
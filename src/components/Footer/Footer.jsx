import "./Footer.css";
const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        <div className="footer__left-text">Developed by Noah Ford</div>
      </div>
      <div className="footer__right">{currentYear}</div>
    </footer>
  );
}

export default Footer;

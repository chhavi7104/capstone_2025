function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h3>CollegeScope</h3>
          <p>
            Discover colleges and make better education decisions.
          </p>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} CollegeScope. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
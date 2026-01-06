const Navigation = () => {
  return (
    <nav>
      <div className="logo">
        <img src="./public/images/brand_logo.png" alt="Brand Logo" />
      </div>
      <ul>
        <li>
          <a href="#">Menu</a>
        </li>
        <li>
          <a href="#">Location</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
      <button className="login-btn">Login</button>
    </nav>
  );
};

export default Navigation;

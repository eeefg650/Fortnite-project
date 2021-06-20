export default function Footer() {
  return (
    <footer className="py-2">
      <div className="icons text-center py-md-3 pb-2">
        <ul>
          <li>
            <a href="#">
              <span className="fab fa-facebook-f" />
            </a>
          </li>
          <li>
            <a href="#">
              <span className="fas fa-envelope" />
            </a>
          </li>
          <li>
            <a href="#">
              <span className="fas fa-rss" />
            </a>
          </li>
          <li>
            <a href="#">
              <span className="fab fa-vk" />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-below text-center">
        <p>
          ©2018 Dragon Hunt. All Rights Reserved | Design by{" "}
          <a href="http://www.W3Layouts.com" target="_blank">
            W3Layouts
          </a>
        </p>
      </div>
    </footer>
  );
}

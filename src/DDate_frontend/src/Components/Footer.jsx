import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faYoutube,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer
      className="text-white py-8 px-[6%]"
      style={{
        background:
          "radial-gradient(84.33% 84.32% at 51.71% 43.22%, #E28110 0%, #26011C 100%)",
      }}
    >
      <div className="container mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-4">
            <h4 className="text-lg font-bold mb-2">Legal</h4>
            <ul className="list-none p-0 m-0">
              <li className="mb-2 hover:text-white">
                <a href="#">Privacy</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">Terms</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">Cookie Policy</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">Intellectual Property</a>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-bold mb-2">Careers</h4>
            <ul className="list-none p-0 m-0">
              <li className="mb-2 hover:text-white">
                <a href="#">Careers Portal</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">Tech Blog</a>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-bold mb-2">Social</h4>
            <ul className="list-none p-0 m-0 flex items-center space-x-4">
              <li className="hover:text-red-700">
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li className="hover:text-white">
                <a href="#">
                  <FontAwesomeIcon icon={faTiktok} />
                </a>
              </li>
              <li className="hover:text-red-800">
                <a href="#">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
              <li className="hover:text-sky-700">
                <a href="#">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="hover:text-sky-500">
                <a href="#">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-bold mb-2">FAQ</h4>
            <ul className="list-none p-0 m-0">
              <li className="mb-2 hover:text-white">
                <a href="#">Destinations</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">Press Room</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">Contact</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">Promo Code</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

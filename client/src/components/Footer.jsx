import { FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaPhone, FaGithub, FaQuora, FaFacebookMessenger, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_final.jpg'; // Import your logo image

const Footer = () => {

  return (
    <footer className="bg-blue-100 text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-start items-start px-4 md:px-15 lg:px-100 space-y-8 md:space-y-0">
        <div className="w-full md:w-2/4 space-x-4 flex flex-col md:flex-row items-start md:items-center mb-8 md:mb-0">
          <Link to="/" className="cursor-pointer">
            <img src={logo} alt="Diabetes Prediction Logo" className="w-16 h-16 md:w-40 md:h-24 mr-4 rounded-full" />
          </Link>
          <div>
            <Link to="/" className="text-2xl font-semibold mb-2 hover:text-gray-700 transition-colors duration-300">
              Diabetes Prediction
            </Link> 
            <p className="text-gray-400 text-lg mb-4">This website provides a platform for users to predict their likelihood of developing diabetes based on various factors..</p>
          </div>
        </div>

        
      </div>
        <div>
        </div>
    </footer>
  );
};

export default Footer;
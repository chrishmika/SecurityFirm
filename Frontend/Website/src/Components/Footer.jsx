import React from "react";

const Footer = () => {
  const phoneNumber = "+94757446637";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                SecureForce Solutions
              </h3>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Providing elite security personnel and cutting-edge protection services since 2010.
            </p>

            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}></div>
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-4 relative">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Quick Links
              </span>
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </h4>

            <ul className="space-y-3">
              {["Home", "Services", "Training Programs", "Client Portal"].map((link, index) => (
                <li key={index} className="group">
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center space-x-2 group-hover:translate-x-1">
                    <div className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-4 relative">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Resources
              </span>

              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </h4>

            <ul className="space-y-3">
              {["About Us", "News & Updates", "Careers", "Contact"].map((link, index) => (
                <li key={index} className="group">
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center space-x-2 group-hover:translate-x-1">
                    <div className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-4 relative">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Legal
              </span>

              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </h4>

            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Licenses"].map(
                (link, index) => (
                  <li key={index} className="group">
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center space-x-2 group-hover:translate-x-1">
                      <div className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
                      <span>{link}</span>
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>

          <div className="relative flex justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Copyright */}
          <div className="text-gray-400 text-sm text-center lg:text-left">
            <p className="mb-1">© 2025 SecureForce Solutions. All rights reserved.</p>
            <p className="text-xs">Company No. 14657764</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            {/* Phone */}
            <a href={`tel:${phoneNumber}`} className="group relative">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center group-hover:from-green-500 group-hover:to-green-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-500/25">
                <svg
                  className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" />
                </svg>
              </div>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Call
              </span>
            </a>

            {/* WhatsApp */}
            <a href={whatsappUrl} className="group relative">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center group-hover:from-green-500 group-hover:to-green-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-500/25">
                <svg
                  className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                WhatsApp
              </span>
            </a>

            {/* Facebook */}
            <a href="www.facebook.com" className="group relative">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                <svg
                  className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Facebook
              </span>
            </a>

            {/* LinkedIn */}
            <a href="#" className="group relative">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                <svg
                  className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                LinkedIn
              </span>
            </a>

            {/* Twitter */}
            <a href="#" className="group relative">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center group-hover:from-blue-400 group-hover:to-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                <svg
                  className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </div>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Twitter
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center space-y-4">
          <p className="text-gray-500 text-sm">
            Website by <span className="text-blue-400 font-semibold">SecurityWeb Solutions®</span>
          </p>
          <a
            href="#top"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-all duration-300 group">
            <span className="text-sm">Back to Top</span>
            <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300 group-hover:scale-110">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l8 8h-5v8h-6v-8H4l8-8z" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

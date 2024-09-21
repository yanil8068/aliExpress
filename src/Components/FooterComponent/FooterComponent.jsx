// import React from "react";
// import { FaInstagram } from "react-icons/fa";
// import { FaFacebookSquare } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaFacebookMessenger } from "react-icons/fa6";
// import { IoLogoWhatsapp } from "react-icons/io";

// const FooterComponent = () => {
//   return (
//     <div className="w-full h-16 flex-col justify-around items-center ">
//       <div className="w-full flex justify-center items-center bg-gray-200 text-black">
//         <div>
//           <div className="flex m-4">
//             <div>
//               <p className="font-bold">Customer service</p>
//               <p>Help Center</p>
//               <p>Transaction Services</p>
//               <p>Agreement for non-EU/UK</p>
//               <p>Consumers</p>
//               <p>Terms and Conditions for</p>
//               <p>EU/EEA/UK Consumers</p>
//               <p>(Transactions)</p>
//               <p>Take our feedback survey</p>
//             </div>
//             <div>
//               {" "}
//               <p className="font-bold">Shopping with us</p>
//               <p>Making payments</p>
//               <p>Delivery options</p>
//               <p>Buyer Protection</p>
//             </div>
//             <div>
//               {" "}
//               <p className="font-bold">Collaborate with us</p>
//               <p>Partnerships</p>
//               <p>Affiliate program</p>
//               <p>DS Center</p>
//               <p>Seller Log In</p>
//               <p>Non-Chinese Seller</p>
//               <p>Registration</p>
//             </div>
//           </div>
//           <div className="flex-col justify-center items-center  m-4">
//             <p className="font-bold">Help</p>
//             <p>
//               Help Center, Disputes & Reports, Buyer Protection, Report IPR
//               infringement, Regulated Information, Integrity Compliance,
//               Transparency Center, Submit report (non-registered users)
//             </p>
//           </div>
//           <div className="flex-col  m-4">
//             <p className="font-bold">Browse by Category</p>
//             <p>
//               All Popular, Product, Promotion, Low Price, Great Value, Reviews
//             </p>
//           </div>
//         </div>
//         <div>
//           <div className="flex m-4">
//             <div>
//               <p className="font-bold">Pay with</p>
//               <p>Pay with</p>
//             </div>

//             <div>
//               <p className="font-bold">Stay connected</p>
//               <div className="flex">
//                 <div>
//                   <FaInstagram />
//                 </div>
//                 <div>
//                   <FaFacebookSquare />
//                 </div>
//                 <div>
//                   <FaTwitter />
//                 </div>
//                 <div>
//                   <FaFacebookMessenger />
//                 </div>
//                 <div>
//                   <IoLogoWhatsapp />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="m-4">
//             <p className="font-bold">AliExpress Multi-Language Sites</p>
//             <p>
//               Russian, Portuguese, Spanish, French, German, Italian, Dutch,
//               Turkish, Japanese, Korean, Thai, Vietnamese, Arabic, Hebrew,
//               Polish
//             </p>
//           </div>
//           <div className="m-4">
//             <p className="font-bold">Alibaba Group</p>
//             <p>
//               Alibaba Group Website, AliExpress, Alimama, Alipay, Fliggy,
//               Alibaba Cloud, Alibaba International, AliTelecom, DingTalk,
//               Juhuasuan, Taobao Marketplace, Tmall, Taobao Global, AliOS, 1688
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="w-full flex justify-center items-center text-xs lg:text-base px-4 lg:px-28  bg-black text-white">
//         Intellectual Property Protection - Privacy Policy - Sitemap - Terms of
//         Use - Information for EU consumers - Imprint - Transaction Services
//         Agreement for non-EU/UK Consumers - Terms and Conditions for EU/EEA/UK
//         Consumers - User Information Legal Enquiry Guide ©️2010-2024
//         AliExpress.com. All rights reserved. 增值电信业务经营许可证
//         增值电信业务经营许可证 浙B2-20120091-8 浙公网安备 浙公网安备
//         33010802002248号
//       </div>
//     </div>
//   );
// };

// export default FooterComponent;

import React from "react";
import { FaInstagram, FaFacebookSquare, FaTwitter } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

const FooterComponent = () => {
  return (
    <footer className="w-full flex flex-col items-center bg-gray-100 text-gray-700">
      {/* Main content section */}
      <div className="w-full max-w-screen-xl px-6 lg:px-16 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm">
        {/* Left Section: Customer service, Shopping with us, Collaborate */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Column 1: Customer service */}
            <div>
              <h3 className="font-bold mb-2">Customer service</h3>
              <ul className="space-y-1">
                <li>Help Center</li>
                <li>Transaction Services</li>
                <li>Agreement for non-EU/UK Consumers</li>
                <li>Terms and Conditions for EU/EEA/UK Consumers</li>
                <li>Take our feedback survey</li>
              </ul>
            </div>

            {/* Column 2: Shopping with us */}
            <div>
              <h3 className="font-bold mb-2">Shopping with us</h3>
              <ul className="space-y-1">
                <li>Making payments</li>
                <li>Delivery options</li>
                <li>Buyer Protection</li>
              </ul>
            </div>

            {/* Column 3: Collaborate with us */}
            <div>
              <h3 className="font-bold mb-2">Collaborate with us</h3>
              <ul className="space-y-1">
                <li>Partnerships</li>
                <li>Affiliate program</li>
                <li>Seller Log In</li>
                <li>Non-Chinese Seller Registration</li>
              </ul>
            </div>

            {/* Payment & Social Media */}
            <div>
              <div>
                <h3 className="font-bold mb-2">Pay with</h3>
                <p>Visa, MasterCard, PayPal, etc.</p>
              </div>
              <div className="mt-4">
                <h3 className="font-bold mb-2">Stay connected</h3>
                <div className="flex space-x-4 text-lg">
                  <FaInstagram className="cursor-pointer hover:text-gray-900" />
                  <FaFacebookSquare className="cursor-pointer hover:text-gray-900" />
                  <FaTwitter className="cursor-pointer hover:text-gray-900" />
                  <FaFacebookMessenger className="cursor-pointer hover:text-gray-900" />
                  <IoLogoWhatsapp className="cursor-pointer hover:text-gray-900" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Help, Browse by Category, AliExpress Multi-Language Sites, Alibaba Group */}
        <div className="space-y-8">
          {/* Help */}
          <div>
            <h3 className="font-bold mb-2">Help</h3>
            <p>
              Help Center, Disputes & Reports, Buyer Protection, Report IPR
              infringement, Integrity Compliance, Transparency Center.
            </p>
          </div>

          {/* Browse by Category */}
          <div>
            <h3 className="font-bold mb-2">Browse by Category</h3>
            <p>All Popular Products, Promotions, Great Value, Reviews.</p>
          </div>

          {/* AliExpress Multi-Language Sites */}
          <div>
            <h3 className="font-bold mb-2">AliExpress Multi-Language Sites</h3>
            <p>
              Russian, Portuguese, Spanish, French, German, Italian, Dutch,
              Turkish, Japanese, Korean, Thai, Vietnamese, Arabic, Hebrew,
              Polish.
            </p>
          </div>

          {/* Alibaba Group */}
          <div>
            <h3 className="font-bold mb-2">Alibaba Group</h3>
            <p>
              Alibaba Group Website, AliExpress, Alimama, Alipay, Fliggy,
              Alibaba Cloud, Taobao, etc.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-full bg-black text-white text-xs lg:text-sm py-4 flex justify-center items-center px-4 lg:px-28 text-center">
        Intellectual Property Protection - Privacy Policy - Sitemap - Terms of
        Use - Information for EU consumers - © 2010-2024 AliExpress.com. All
        rights reserved.
      </div>
    </footer>
  );
};

export default FooterComponent;

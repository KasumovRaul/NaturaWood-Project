import React, { useEffect, useState } from "react";
import imgH from "../../../public/images/collectıon4.jpg";
import imgMap from "../../../public/images/map-embawood.png";
import "./Contact.css";

const Contact = () => {

  const [searchTerm, setSearchTerm] = useState("");

    useEffect(()=>{
        window.scrollTo(0,0)
     },[]);

  const branchData = [
    {
      city: "Tbilisi",
      address: "Hualing Tbilisi Sea Plaza, Jumber Lezhava St. N22",
      phone: "(+995) 595 999 075",
      hours: "10:00-19:00",
    },
    {
      city: "Tbilisi",
      address: 'Saba Svetitsnori "Saba", Eristavi St. 5',
      phone: "(+995) 595 953 276",
      hours: "10:00-18:30",
    },
    {
      city: "Batumi",
      address: 'Gldani Mall | Adjacent to Fifth "Silk Arches" Territory',
      phone: "(+995) 595 63 45 83",
      hours: "10:00-19:00",
    },
    {
      city: "Rustavi",
      address: "Shartava St. 4",
      phone: "(+995) 599 892 663",
      hours: "10:00-19:00",
    },
    {
      city: "Marneuli",
      address: "Rustaveli St. 16",
      phone: "(+995) 591 405 432",
      hours: "09:00-18:00",
    },
  ];

  const filteredBranches = branchData.filter(
    (branch) =>
      branch.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="contact">
        <div className="contact-container">
          <div className="contact-main">
            <div className="contact-main-content">
              <div className="contact-main-left">
                <div className="contact-main-left-info">
                  <div className="contact-main-left-image">
                    <img src={imgH} alt="" />
                  </div>
                  <div className="contact-main-left-wrapp">
                    <h1>Home Office</h1>
                    <div className="contact-main-left-location">
                      <p>Georgia, Tbilisi, Guramishvili Ave. St. 19a</p>
                    </div>
                    <div className="contact-main-left-number">
                      <p>Phone: 032 2 400 001 </p>
                    </div>
                    <div className="contact-main-left-gmail">
                      <span>sales@Naturawood.ge</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-main-right">
                <div className="contact-main-right-image">
                  <img src={imgMap} alt="imgMap" />
                </div>
              </div>
            </div>
          </div>
          <div className="contact-branch">
            <div className="contact-branch-wrapper">
              <div className="contact-branch-input">
                <input
                  type="search"
                  placeholder="Search for a city or address..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <table className="branch-table">
                <thead>
                  <tr className="branch-city-name">
                    <th>City</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Working Hours</th>
                    <th>Map</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBranches.length > 0 ? (
                    filteredBranches.map((branch, index) => (
                      <tr key={index} className="tr-branch">
                        <td data-label="City">{branch.city}</td>
                        <td data-label="Address">{branch.address}</td>
                        <td data-label="Phone">{branch.phone}</td>
                        <td data-label="Working Hours">{branch.hours}</td>
                        <td data-label="Map">
                          <button>Show on Map</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          textAlign: "center",
                          padding: "2rem",
                          color: "#64748b",
                        }}
                      >
                        No branches found for "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

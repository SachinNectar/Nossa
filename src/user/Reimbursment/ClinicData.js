import React from "react";
import emergency from "../../assets/img/emergency.svg"
import blood from "../../assets/img/blood.svg"
import cancer from "../../assets/img/cancer.svg"
import operation from "../../assets/img/operation.svg"
import pharmacy from "../../assets/img/pharmacy.svg"
import outdoor from "../../assets/img/outdoor.svg"
import dr1 from "../../assets/img/dr1.jpg"
import dr2 from "../../assets/img/dr2.jpg"
import dr3 from "../../assets/img/dr3.jpg"
import dr4 from "../../assets/img/dr4.jpg"


const ClinicData = () =>{
    return(
        <div className="container-fluid">
        <div className="row d-flex align-items-center justify-content-between">
        <div className="col-12">
            <div className="heading-with-box mb-2">
                <div className="row d-flex align-items-center justify-content-between">
                    <div className="col-lg-7 col-md-6 text-left">
                        <h3>Serial No :<span className="color-green"> #02</span></h3>
                    </div>
                    <div className="col-lg-4 col-md-6 text-right">
                        <h6 className="float-left">Policy Holders : <span className="color-green">12</span></h6>
                        <h6>Ref No : <span className="color-green">N8643/CORE/I</span></h6>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="detail-box">
        <div className="detail-box-inner pl-4 pr-4 mt-4">
            <div className="row">
                <div className="col-md-3 col-sm-3 col-12">
                    <b>Clinic Name</b>
                    <p>Clínica Privada de Alvalade</p>
                </div>
                <div className="col-md-3 col-sm-3 col-12">
                    <b>Area</b>
                    <p>Namibe</p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                    <b>Hospital Type</b>
                    <p>Public</p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                    <b>Contact No</b>
                    <p>+233 987456321</p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                    <b>Opening Hours</b>
                    <p>Monday - Friday   9.00 - 20.00</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <hr className="m-0"/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mt-4">
                    <b className="mb-2 d-block">Services</b>
                    <ul className="services-li">
                        <li><span><img src={emergency} alt=""/></span> Emergency Care</li>
                        <li><span><img src={operation} alt=""/></span> Operation Theatre</li>
                        <li><span><img src={outdoor}alt=""/></span> Outdoor Checkup</li>
                        <li><span><img src={cancer} alt=""/></span> Cancer Service</li>
                        <li><span><img src={blood} alt=""/></span> Blood Test</li>
                        <li><span><img src={pharmacy} alt=""/></span> Pharmacy</li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <hr className="mt-4"/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mt-2">
                    <b className="mb-2 d-block">Our Doctors</b>
                    <ul className="services-li">
                        <li>
                            <div className="dr-photo">
                                <img src={dr1} alt=""/>
                            </div>
                            <strong>Dr. Smile Jhon</strong>
                            <span>Orthopaedics</span>
                        </li>
                        <li>
                            <div className="dr-photo">
                                <img src={dr2} alt=""/>
                            </div>
                            <strong>Dr. Jaka Alexa</strong>
                            <span>Cardiology</span>
                        </li>
                        <li>
                            <div className="dr-photo">
                                <img src={dr3} alt=""/>
                            </div>
                            <strong>Dr. Mark Jacobson</strong>
                            <span>Haematology</span>
                        </li>
                        <li>
                            <div className="dr-photo">
                                <img src={dr4} alt=""/>
                            </div>
                            <strong>Dr. Alex Davidson</strong>
                            <span>Orthopaedics</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <hr className="mt-2"/>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <b>About Hospital</b>
                    <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod libero natus vero, maxime dolores numquam dolor fuga autem nemo beatae earum delectus, cum neque tenetur fugit, at quibusdam quae pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod libero natus vero, maxime dolores numquam dolor fuga autem nemo beatae earum delectus, cum neque tenetur fugit, at quibusdam quae pariatur.</p>
                </div>
            </div>
        </div>
    </div>
    
</div>

    )
}
export default ClinicData
import React,{useState,useEffect} from "react";
import { getCardDetails } from "../../services/authentication";
import frontCard from "../../assets/img/frontCard.png"
import person from "../../assets/img/person.png"
import qrCode from "../../assets/img/qrCode.png"
import fileDownload1 from "../../assets/img/fileDownload1.png"
import print from "../../assets/img/print.png"
import {Breadcrumb} from "antd"
import GenericPdfDownloader from "../../components/atoms/PdfDownloader"







const NossaCard = () =>{

const[CardDetails,setCarddDetails]=useState('')
const loginDetailsUserId =  window.localStorage.getItem('loginDetailsUserId');
console.log("lug",loginDetailsUserId)



    const handleGetCardDetailsAPI = async (data) => {
        try {
            const data = {
                user_id:loginDetailsUserId
            }
            const resp = await getCardDetails(data); 
            console.log("card",resp)
            setCarddDetails(resp && resp.data)
           
        }
        catch(error){
            
        }
    }
    useEffect(() => {
        handleGetCardDetailsAPI()
      }, []);
      console.log("cd",CardDetails)
     
   


    return(
        <div>
        <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Nossa Card</Breadcrumb.Item>
          </Breadcrumb>
    
        <div className="row d-flex align-items-center justify-content-between" style={{padding:"10px"}}>
        <div className="col-lg-6 col-md-6 text-left">
            <h3 className="mt-3 mb-4">Our Card</h3>
        </div>
        <div className="col-12 col-lg-6 col-md-6 col-sm-12 col-xs-12 text-right">
            <div className="btn-two">
                <a href="#" className="print-card-btn" onClick={() =>{window.print()}} style={{height:"100%"}}>Print Card <img src={print} className="img-fluid" alt=""/></a>
                {/* <button className="download-card-btn" onClick={saveFile}>Download card <img src={fileDownload1} className="img-fluid" alt=""/></button> */}
                <GenericPdfDownloader 
          downloadFileName="NossaPdf" 
          rootElementId="NossaCard" 
        />
            </div>
        </div>
    </div>
 
    <div className="row" id="NossaCard">
        <div className="col-lg-6 col-md- col-12">
            <div className="nossa-card-front">
                <div className="row">
                    <div className="col-md-2 col-sm-2 col-12">
                        <img src={frontCard} alt="front-card-logo" className="img-fluid pl-3 pt-4" />
                    </div>
                    <div className="col-md-10 col-sm-10 col-12">
                        <h1 className="mt-4 mb-3">Our Card</h1>
                    </div>
                </div>
                <div className="card-back-inner">
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-12">
                            <div className="person-box mt-4 mb-4">
                                <img src={person} alt="person" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-8 col-12">
                            <div className="front-card-text mt-4">
                                <p><span>NS Account No.:</span> {CardDetails&&CardDetails.accountNo}</p>
                                <p><span>Name:</span>{CardDetails && CardDetails.firstName}</p>
                                <p className="w-50 float-left"><span>Age:</span>{CardDetails && CardDetails.dob}</p>
                                <p className="w-50 float-left"><span>Gender:</span>{CardDetails && CardDetails.gendar}</p>
                                <p><span>Address:</span>{CardDetails && CardDetails.currentAddress}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
            <div className="nossa-card-back mt-4">
                <div className="row">
                    <div className="col-12">
                        <h1 className="mt-4 mb-3">Our Insurance Account No.: 529698664235</h1>
                    </div>
                </div>
                <div className="card-back-inner">
                    <div className="row">
                        <div className="col-md-8 col-sm-8 col-12">
                            <div className="front-card-text mt-4">
                                <h2>Disclaimer</h2>
                                <p>{CardDetails && CardDetails.disclaimer}</p>
                                <h2 className="mt-4">Signature</h2>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-12">
                            <div className="person-box mt-4 mb-2">
                                <img src={qrCode} alt="person" className="img-fluid" />
                            </div>
                            <small className="text-center w-100 d-block">Printed from Nossa Member</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}
export default NossaCard

import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const GenericPdfDownloader = ({rootElementId , downloadFileName}) => {

    const downloadPdfDocument = () => {
        const input = document.getElementById(rootElementId);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'pt', 'a4', false);
                pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
                pdf.save(`${downloadFileName}.pdf`);
            })
    }

    return <button onClick={downloadPdfDocument}style={{backgroundColor:"#002E5E",color:"white", borderRadius:"5px", height:"100%", fontSize:"medium", border:"2px solid #002E5E", marginLeft:"20px"}}>Download PDF</button>

}

export default GenericPdfDownloader;
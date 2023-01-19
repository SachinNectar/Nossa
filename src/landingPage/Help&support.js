import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";

 function Help (){
return (
	<div stlye={{}}>
	<h4>How to create Accordion in ReactJS?</h4>
	<Accordion style={{ width:'400',color:'BrightGreen' }}>
		<AccordionSummary
		expandIcon={<ExpandMoreIcon />}
		aria-controls="panel1a-content"
		>
		<Typography
			style={{
			fontWeight: 10,
			}}
		>
			Accordion Demo
		</Typography>
		</AccordionSummary>
		<AccordionDetails>
		<Typography>Greetings of the day :)</Typography>
		</AccordionDetails>
	</Accordion>
	</div>
);
}
export default Help

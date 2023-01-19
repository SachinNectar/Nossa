import React from "react";
import { Grid } from "@material-ui/core";
//import Table from "../components/atoms/table";

function Dashboardpage() {
  return (
    <div>
      <div>Nagasai</div>
      <Grid item xs={12} style={{ marginLeft: "250px", marginTop: "100px" }}>
        <Grid container spacing={2}>
          {[
            {
              lable: "TODAYS EARNINGS",
              value: "Kz 20,200",
              info: "Since last months",
            },
            {
              lable: "TODAYS EARNINGS",
              value: "Kz 20,200",
              info: "Since last months",
            },
            {
              lable: "TODAYS EARNINGS",
              value: "Kz 20,200",
              info: "Since last months",
            },
            {
              lable: "TODAYS EARNINGS",
              value: "Kz 20,200",
              info: "Since last months",
            },
          ]}
        </Grid>
      </Grid>
    </div>
  );
}
export default Dashboardpage;

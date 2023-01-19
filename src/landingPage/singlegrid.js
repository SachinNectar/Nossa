import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import colors from "../components/atoms/colors"

const useStyles = makeStyles({
  title: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  value: {
    fontWeight: "bold",
  },
  pos: {
    marginBottom: 12,
  },
  footer: {
    background: "#EFEFEF",
    justifyContent: "space-between",
  },
  quantity: {
    fontSize: "10px",
    color: colors.blue,
  },
});

function Singlegrid ()  {
  const classes = useStyles();
  return (
    <Card>
      <CardActions className={classes.footer}>
        <Typography className={classes.title} gutterBottom>
          Today Book Sold
        </Typography>
        <Typography className={classes.quantity} gutterBottom>
          600 Books
        </Typography>
      </CardActions>
      <CardContent></CardContent>
    </Card>
  );
};
export default Singlegrid

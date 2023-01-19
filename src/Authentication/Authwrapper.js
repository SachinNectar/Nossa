import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../components/atoms/colors"
import { InputField } from "../components/atoms/InputField";
import { mailSvg } from "../svgs/mail"
import { lockSvg } from "../svgs/lock";
import { Link } from "react-router-dom";
import { arrowRight } from "../svgs/arrowRight";

const useStyles = makeStyles((theme) => ({
  bgImage: {
    backgroundImage: `url('/images/introBanner.png')`,
    backgroundSize: "cover",
  },
  container: {
    height: "100vh",
    background: colors.bgColor,
  },
  rightPanel: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
  },
  childPanel: {
    justifyContent: "left",
    width: "400px",
  },
  img: {
    width: "100px",
    marginBottom: "20px",
  },
  backLink: {
    position: "absolute",
    top: "20px",
    left: "20px",
  },
  arrowIcon: {
    marginRight: "5px",
  },
}));

export default ({ children, goBackLink }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.container}>
        <Grid className={classes.rightPanel} item xs={12}>
          {goBackLink && (
            <Grid className={classes.backLink} item>
              <Link to={goBackLink} color="secondary">
                <span className={classes.arrowIcon}>{arrowRight}</span>Go Back
              </Link>
            </Grid>
          )}
          <img className={classes.img} src="/images/logo.png" />
          <div className={classes.childPanel}>{children}</div>
        </Grid>
        <Grid className={classes.bgImage} item xs={6} />
      </Grid>
    </div>
  );
};

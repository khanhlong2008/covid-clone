/* eslint-disable react/react-in-jsx-scope */
import "../../App.css";
import Countup from "react-countup";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  wrapper: (props) => {
    if (props.type === "cases") return { borderLeft: "5px solid red" };
    if (props.type === "recovered") return { borderLeft: "5px solid #33CCFF " };
    else return { borderLeft: "5px solid #000000" };
  },
  title: { fontSize: 18, marginBottom: 5},
  count: { fontWeight: "bold", fontSize: 18 },
  today: (props) => {
    if (props.type === "cases") return { color: "  red" };
    if (props.type === "recovered") return { color: "  #33CCFF " };
    else return { color: "  #000000" };
  },
});
export default function HighlightCart({ title, total, type, today, ...props }) {
  const styles = useStyles({ type });

  return (
    <Grid item sm={3} xs={12} style={{ marginTop: 20 }}>
      <Card className={styles.wrapper} onClick={props.onClick}>
        <CardContent>
          <Typography component="p" variant="body2" className={styles.title}>
            {title}<Countup end={total || 0} duration={2} separator=" " />
          </Typography>
          {/* <Typography component="span" variant="body2" className={styles.total}>
            <div className="font-family-option">
              <Countup end={total || 0} duration={2} separator=" " />
            </div>
          </Typography> */}
          <Typography component="span" variant="body2" className={styles.today}>
            <div className="font-family-option">
              
              
              Today: + 
              <Countup end={today || 0} duration={2} separator=" " />
              
            </div>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

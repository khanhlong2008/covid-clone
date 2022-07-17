import React,{ useEffect,useState} from 'react'
import { Button, ButtonGroup } from "@material-ui/core";

export default function Button_Group({clickButtonGroup}) {
    const [click,setClick] = useState("active-Map")
    
    useEffect(()=>{
        clickButtonGroup(click)
    })
    
    return (
        <ButtonGroup
        variant="contained"
        aria-label=" large outlined button group"
      >
        <Button
          color={click === "active-Map" ? "secondary" : ""}
          onClick={() => setClick("active-Map")}
        >
          <h5>Live Chart</h5>
        </Button>
        <Button
          color={click === "active-table" ? "secondary" : ""}
          onClick={() => setClick("active-table")}
        >
          <h5>Table Cases</h5>
        </Button>
      </ButtonGroup>
    )
}

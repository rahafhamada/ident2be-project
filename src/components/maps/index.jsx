import { useState } from "react";
import ReactMapGl from "react-map-gl";

export default function MapS() {
   const [Viewport, setViewport] = useState({
     latitude:45.4211,
     longitude:-75.6903,
    zoom:10,
  width:"100vw",
hight:"100vh"});
  return( 
    <div>
     <ReactMapGl {...Viewport }
     mapboxApiAccessToken ={"pk.eyJ1IjoiaGFtYWRhOTQiLCJhIjoiY2t3MWdhN3JnMGFxbTJubW9yczdzbGg0eCJ9.Wtzs2wPcZIg9mB-Mvup0Mg"}>
       markers here
       </ReactMapGl>  
       
      
    </div>
    );
  }


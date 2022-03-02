import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const MapBoxModal = ({ visible, setVisible, google }) => {
  const [coords, setCoords] = useState({
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoords({
        latitude: position.coords.latitud,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  return (
    <Modal
      open={visible}
      onClose={() => {
        setVisible();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        width: "80vw",
        height: "80vh",
        margin: "auto",
      }}
    >
      {!coords.latitude && !coords.longitude ? (
        <div>Loading...</div>
      ) : (
        <Box>
          <Map
            google={google}
            zoom={14}
            initialCenter={{
              lat: 52.370216,
              lng: 52.370216,
            }}
          >
            <Marker onClick={() => {}} name={"Current location"} />

            <InfoWindow onClose={() => {}}>
              <div>{/* <h1>{this.state.selectedPlace.name}</h1> */}</div>
            </InfoWindow>
          </Map>
        </Box>
      )}
    </Modal>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyD2JoFq0qCWqdLs6bsYXU9MxRqjx32enmU",
})(MapBoxModal);

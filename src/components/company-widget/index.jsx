import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import ReactWeather, { useWeatherBit } from "react-open-weather";
import MapBoxModal from "../mapbox-modal";

// Styles Elemnts
import { mainColor } from "../../contants";
import {
  CompanyWidgetsGrid,
  CompanyWidgetsGridLeft,
  CompanyWidgetsGridLeftBox,
  CompanyWidgetsGridLeftBoxLink,
  CompanyWidgetsGridMiddle,
  CompanyWidgetsGridRight,
  CompanyWidgetsWrapper,
} from "./styles";
import GoogleMap from "../../assets/images/map.PNG";
import Settings from "../../assets/images/settings.png";

const customStyles = {
  fontFamily: "Helvetica, sans-serif",
  gradientStart: "#0181C2",
  gradientMid: "#04A7F9",
  gradientEnd: mainColor,
  locationFontColor: "#FFF",
  todayTempFontColor: "#FFF",
  todayDateFontColor: "#B5DEF4",
  todayRangeFontColor: "#B5DEF4",
  todayDescFontColor: "#B5DEF4",
  todayInfoFontColor: "#B5DEF4",
  todayIconColor: "#FFF",
  forecastBackgroundColor: "#FFF",
  forecastSeparatorColor: "#DDD",
  forecastDateColor: "#777",
  forecastDescColor: "#777",
  forecastRangeColor: "#777",
  forecastIconColor: mainColor,
  width: "100px !important",
  heightL: "100px !important",
};

const CompanyWidgets = () => {
  const [showMapModal, setShowMapModal] = useState(false);

  const { data, isLoading, errorMessage } = useWeatherBit({
    key: "2c7f13f54de44878a2982f13ed0af8cf",
    lat: 52.090736,
    lon: 5.12142,
    lang: "en",
    unit: "metric", // values are (metric, standard, imperial)
  });

  const [time, setTitme] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTitme(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="containeriii">
      <CompanyWidgetsWrapper>
        <h3>Widgets</h3>
        <CompanyWidgetsGrid>
          <CompanyWidgetsGridLeft>
            <CompanyWidgetsGridLeftBox>
              <ReactWeather
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel="Munich"
                unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
                showForecast
                theme={customStyles}
              />
            </CompanyWidgetsGridLeftBox>
          </CompanyWidgetsGridLeft>

          <CompanyWidgetsGridMiddle>
            <CompanyWidgetsGridLeftBoxLink to="/persons">
              <img
                src={Settings}
                alt=""
                style={{
                  display: "block",
                  marginRightL: 10,
                  width: 130,
                  height: 130,
                }}
              />
            </CompanyWidgetsGridLeftBoxLink>
            <CompanyWidgetsGridLeftBox>
              <img
                src={GoogleMap}
                alt=""
                onClick={() => setShowMapModal(true)}
                style={{ width: "100%", height: "100%" }}
              />
            </CompanyWidgetsGridLeftBox>

            <CompanyWidgetsGridLeftBox>
              <Clock value={time} size={100} />
            </CompanyWidgetsGridLeftBox>
          </CompanyWidgetsGridMiddle>

          <CompanyWidgetsGridRight>
            <DatePicker showNow open style={{ width: "100%" }} />
          </CompanyWidgetsGridRight>
        </CompanyWidgetsGrid>
      </CompanyWidgetsWrapper>

      <MapBoxModal visible={showMapModal} setVisible={setShowMapModal} />
    </div>
  );
};

export default CompanyWidgets;

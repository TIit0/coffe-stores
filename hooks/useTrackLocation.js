
import { useState, useContext } from 'react'
import { ACTIONS } from './reducer';
import { StoreContext } from './store-context';

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState("");
    // const [latLong, setLatLong] = useState("");
    const [isFindingLocation, setIsFindingLocation] = useState(false);
    const {dispatch} = useContext(StoreContext)

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        /* set info as required by foursquare api format to context */
        
        dispatch({
            type: ACTIONS.SET_LAT_LONG,
            payload: {
                latLong: `${latitude},${longitude}`,
            }
        });

        /* reset load/error sates */

        setLocationErrorMsg("");
        setIsFindingLocation(false);
    };

    const error = () => {
        setIsFindingLocation(false);
        setLocationErrorMsg("Unable to retrieve your location");
    };

    const handleTrackLocation = () => {
        setIsFindingLocation(true);

        if (!navigator.geolocation) {
            setLocationErrorMsg("Geolocation is not supported by your browser");
            setIsFindingLocation(false);
        } else {
            // status.textContent = "Locating…";
            navigator.geolocation.getCurrentPosition(success, error);
        }
    };

    return {
        //latLong,
        handleTrackLocation,
        locationErrorMsg,
        isFindingLocation
    };
};

export default useTrackLocation;



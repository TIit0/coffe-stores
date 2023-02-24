
export default function useTrackLocation() {

    const success = () => {

    }

    const error = () => {

    }

    function handleTrackLocation() {
        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        } else {
            status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return {

    }
}
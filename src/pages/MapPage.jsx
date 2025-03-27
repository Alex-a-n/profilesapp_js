import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder';
import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
import { useTranslation } from 'react-i18next';

class GeoPlaces {
    constructor(client, map) {
        this.client = client;
        this.map = map;
    }

    async forwardGeocode(config) {
        const center = this.map.getCenter();
        const request = {
            QueryText: config.query,
            BiasPosition: [center.lng, center.lat],   // Bias results towards the center of the map
            Language: "en"
        };
        const command = new window.amazonLocationClient.places.SearchTextCommand(request);
        const response = await this.client.send(command);
        return {
            features: response?.ResultItems.map(result => this.convertResultToViewObject(result)) || [],
        };
    }

    async reverseGeocode(config) {
        const request = {
            QueryPosition: config.query,
            MaxResults: config.click ? 1 : 15,
            Language: "en"
        };
        const command = config.click
            ? new window.amazonLocationClient.places.ReverseGeocodeCommand(request)
            : new window.amazonLocationClient.places.SearchNearbyCommand(request);
        const response = await this.client.send(command);
        return {
            features: response?.ResultItems.map(result => this.convertResultToViewObject(result)) || [],
        };
    }

    async searchByPlaceId(placeId) {
        const request = {
            Language: "en",
            PlaceId: placeId
        };
        const command = new window.amazonLocationClient.places.GetPlaceCommand(request);
        const response = await this.client.send(command);
        return {
            features: response ? [this.convertResultToViewObject(response)] : []
        };
    }

    convertResultToViewObject(result) {
        return result.SuggestResultItemType === "Query"
            ? this.convertQueryToViewObject(result)
            : this.convertPlaceToViewObject(result);
    }

    convertQueryToViewObject(result) {
        return {
            geometry: { type: "NA", coordinates: [] },
            result_type: "Query",
            place_name: result.Title || "",
            properties: result.Query || "",
            place_type: result.Query?.QueryType || "",
            id: result.Query?.QueryId || ""
        };
    }

    convertPlaceToViewObject(result) {
        return {
            center: result.Position || [],
            result_type: "Place",
            geometry: {
                type: "point",
                coordinates: result.Position || []
            },
            id: result.PlaceId || "",
            text: result.Title,
            place_name: result.Address?.Label || "",
            place_type: result.PlaceType || "",
            properties: result
        };
    }
}

function MapPage() {
    const mapContainerRef = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        const loadMap = async () => {
            // Dynamically load Amazon Location SDK
            const amazonLocationScript = document.createElement('script');
            amazonLocationScript.src = 'https://cdn.jsdelivr.net/npm/@aws/amazon-location-client@1.2';
            amazonLocationScript.async = true;

            const authHelperScript = document.createElement('script');
            authHelperScript.src = 'https://cdn.jsdelivr.net/npm/@aws/amazon-location-utilities-auth-helper@1';
            authHelperScript.async = true;

            document.body.appendChild(amazonLocationScript);
            document.body.appendChild(authHelperScript);

            // Wait for SDK to load
            await new Promise((resolve) => {
                const checkSDK = () => {
                    if (window.amazonLocationClient) {
                        resolve();
                    } else {
                        setTimeout(checkSDK, 100);
                    }
                };
                checkSDK();
            });

            // Configuration
            const API_KEY = "v1.public.eyJqdGkiOiI2NWQ5MjhiYy0wNjhmLTRkYWMtYWVhNC1lYmI5NTQ4NTQ0NGMifWivgrfIg0u1PkW7B9XIEC6O5iXTrGIXD6hyFlCI0_31AWJbDo9_wcDFDL6rDZfInbcBET8Aka0_HCNeqB5P_6v91_gdiarPkQ6gUxa9pbKpmDmkgfejqkc4wXG882oMZgOKvrpU7p25_OxKNhhsY24KpgTiG1L2o2ufhvPNRyQBYn0DVbKopl4avXlEO_1ncxoWYrkO3AuNyW5rJuZApc8nh-CAPXDEJ4IuZ901p0twFv57eD6r0-cbhC4oP2sM1wRjaN5WXrfoBz4BMGISG2A6fmyWv8TRuUvoI6PykQwMIleFF2SdQGa0Vq-iqpnbE8hqN7L6hOsuAG-L8gg-nWQ.ZWU0ZWIzMTktMWRhNi00Mzg0LTllMzYtNzlmMDU3MjRmYTkx"; // Your API Key
            const AWS_REGION = "us-east-1";

            // Initialize map
            const styleUrl = `https://maps.geo.${AWS_REGION}.amazonaws.com/v2/styles/Standard/descriptor?key=${API_KEY}&color-scheme=Light`;
            const map = new maplibregl.Map({
                container: mapContainerRef.current,
                style: styleUrl,
                center: [103.7737, 1.3043], // NUS coordinates
                zoom: 12
            });

            // Add navigation controls
            map.addControl(new maplibregl.NavigationControl(), 'top-right');

            // Initialize Amazon Location client
            const authHelper = window.amazonLocationClient.withAPIKey(API_KEY, AWS_REGION);
            const locationClient = new window.amazonLocationClient.GeoPlacesClient(authHelper.getClientConfig());
            const geoPlaces = new GeoPlaces(locationClient, map);


            // Create and configure geocoder control
            const geocoder = new MaplibreGeocoder(geoPlaces, {
                maplibregl,
                showResultsWhileTyping: true,
                debounceSearch: 300,
                limit: 30,
                placeholder: "Search text",
                reverseGeocode: true,
                zoom: 14,
                popuprender: (feature) => `
                    <div class="popup-content">
                        <span class="${feature.place_type.toLowerCase()} badge">${feature.place_type}</span><br>
                        ${feature.place_name}
                    </div>`
            });

            // Add geocoder to map
            map.addControl(geocoder, 'top-left');

            // Handle geocoder result selection
            geocoder.on('result', async (event) => {
                const { id, result_type } = event.result;
                if (result_type === "Place") {
                    const placeResults = await geoPlaces.searchByPlaceId(id);
                    if (placeResults.features.length) {
                        const feature = placeResults.features[0];
                        new maplibregl.Popup({ offset: 30 })
                            .setLngLat(feature.geometry.coordinates)
                            .setHTML(`
                                <div class="popup-content">
                                    <span class="${feature.place_type.toLowerCase()} badge">${feature.place_type}</span><br>
                                    ${feature.place_name}
                                </div>`)
                            .addTo(map);
                    }
                }
            });

            // Handle map click for reverse geocoding
            map.on('click', async (e) => {
                const response = await geoPlaces.reverseGeocode({
                    query: [e.lngLat.lng, e.lngLat.lat],
                    click: true
                });

                if (response.features.length > 0) {
                    const feature = response.features[0];
                    new maplibregl.Marker({ color: "orange" })
                        .setLngLat(feature.geometry.coordinates)
                        .setPopup(new maplibregl.Popup({ offset: 30 })
                            .setHTML(`
                                <div class="popup-content">
                                    <span class="${feature.place_type.toLowerCase()} badge">${feature.place_type}</span><br>
                                    ${feature.place_name}
                                </div>`))
                        .addTo(map);
                }
            });

            return () => {
                map.remove();
                document.body.removeChild(amazonLocationScript);
                document.body.removeChild(authHelperScript);
            };
        };

        loadMap();
    }, [t]);


    return (
        <div className="map-page-container" style={{ width: '100%', height: 'calc(100vh - 60px)' }}>
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}

export default MapPage;
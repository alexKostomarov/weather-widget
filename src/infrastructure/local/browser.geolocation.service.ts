import {GeoLocationServiceInterface} from "@/domain/city/geo.location.service.interface";


export class BrowserGeolocationService implements GeoLocationServiceInterface{
    getCurrentIpLocation(): Promise<{ latitude: number; longitude: number }> {
        return new Promise((resolve, reject) => {

            if (typeof navigator === 'undefined' || !navigator.geolocation) {
                return reject(new Error("Browser geolocation is not supported."));
            }
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(new Error(`Geolocation error (${error.code}): ${error.message}`));
                },
                { enableHighAccuracy: true, timeout: 5000 }
            );
        });
    }
}
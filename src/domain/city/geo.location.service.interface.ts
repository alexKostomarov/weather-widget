export interface GeoLocationServiceInterface {
    getCurrentIpLocation(): Promise<{ latitude: number, longitude: number }>;
}
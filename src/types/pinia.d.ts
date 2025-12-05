import 'pinia'
import type { WeatherStoreDependencies } from '@/presentaition/store/weather.store.dependencies';

declare module 'pinia' {
    export interface PiniaCustomProperties {
        root: WeatherStoreDependencies
    }
}

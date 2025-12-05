export const windDirection = (deg: number): string => {

    const angle = ((deg % 360) + 360) % 360;// нормализуем угол в диапазон 0–360

    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];// массив направлений (каждые 45°)

    const index = Math.round(angle / 45) % 8;// вычисляем индекс

    return directions[index];
}
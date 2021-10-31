import {CarIndicatorsDto} from "../modules/car/dto/carIndicatorsDto";
import {StorageIndicatorsDto} from "../modules/storage/dto/storageIndicatorsDto";

export const getRegisterDate = () => {
    return Date.now()
}

export const getRandomStorageIndicators = (): StorageIndicatorsDto => {
    const maxTemperature = 30
    const minTemperature = -20
    const maxHumidity = 120
    const minHumidity = 0
    return {
        temperature: Math.floor(
            Math.random() * (maxTemperature - minTemperature) + minTemperature,
        ),
        humidity: Math.floor(
            Math.random() * (maxHumidity - minHumidity) + minHumidity,
        ),
        measurementDate: getRegisterDate(),
    }
}

export const getRandomCarIndicators = (): CarIndicatorsDto => {
    const maxEngineHeating = 300
    const minEngineHeating = 0
    const maxInflationOfTires = 100
    const mixInflationOfTires = 0
    const maxTightnessOfBolts = 150
    const mixTightnessOfBolts = 60
    return {
        engineHeating: Math.floor(
            Math.random() * (maxEngineHeating - minEngineHeating) + minEngineHeating,
        ),
        inflationOfTires: Math.floor(Math.random() * (maxInflationOfTires - mixInflationOfTires) + mixInflationOfTires),
        tightnessOfBolts: Math.floor(
            Math.random() * (maxTightnessOfBolts - mixTightnessOfBolts) + mixTightnessOfBolts,
        ),
        measurementDate: getRegisterDate(),
    }
}

import { PixelRatio } from "react-native"

export function scale(value) {
    return PixelRatio.getPixelSizeForLayoutSize(value)
}

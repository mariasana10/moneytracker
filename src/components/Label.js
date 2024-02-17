import React from "react";
import { Text } from "react-native";

const Label = (props) => {
    const { text, bold, size, fontWeight } = props
    return (
        <Text style={{ fontWeight: bold ? 'bold' : fontWeight ? fontWeight : '400', fontSize:size ? size : 12 }}>{text}</Text>

    )
}

export default Label
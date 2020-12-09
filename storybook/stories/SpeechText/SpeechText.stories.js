import React from "react";
import SpeechText from "../../../src/components/SpeechText";

import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";

storiesOf("SpeechText", module).add("Default", () => <SpeechText />);

export default {
  component: SpeechText,
  title: "SpeechText",
};

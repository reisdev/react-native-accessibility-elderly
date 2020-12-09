import React from "react";
import TouchZoom from "../../../src/components/TouchZoom";

import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";

storiesOf("TouchZoom", module).add("Default", () => <TouchZoom />);

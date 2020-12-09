import PinchZoom from "../../../src/components/PinchZoom";

import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";

storiesOf("PinchZoom", module).add("Default", () => <PinchZoom />);

export default {
  component: PinchZoom,
  title: "PinchZoom",
};

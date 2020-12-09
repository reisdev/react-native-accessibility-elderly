import SeekBarZoom from "../../../src/components/SeekBarZoom";

import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";

storiesOf("SeekBarZoom", module).add("Default", () => <SeekBarZoom />);

export default {
  title: "SeekBarZoom",
  component: SeekBarZoom,
};

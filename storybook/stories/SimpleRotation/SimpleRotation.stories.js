import SimpleRotation from "../../../src/components/SimpleRotation";

import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";

storiesOf("SimpleRotation", module).add("Default", () => <SimpleRotation />);

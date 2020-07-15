import React from "react";

import { storiesOf } from "@storybook/react";

import RatioImage from "@e-group/material/RatioImage";

storiesOf("RatioImage", module)
  .add("default", () => {
    return (
      <div style={{ maxWidth: 800 }}>
        <RatioImage src="/thumb.jpg" ratio="5:4" alt="thumb" />
      </div>
    );
  })
  .add("with cover centralized", () => {
    return (
      <div style={{ maxWidth: 800 }}>
        <RatioImage src="/thumb.jpg" fit="cover" ratio="16:5" alt="thumb" />
      </div>
    );
  });

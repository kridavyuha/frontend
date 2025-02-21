import React, { useEffect } from "react";
import { useStores } from "../../logic/Providers/StoreProviders";
import FeedbackIndex from "./FeedbackIndex";

function FeedBackScreenIndex() {
  const stores = useStores();

  return (
    <div style={{ margin: "30px" }}>
      <FeedbackIndex />
    </div>
  );
}

export default FeedBackScreenIndex;
import { useState, useEffect } from "react";
import "@tago-io/custom-widget";
import "@tago-io/custom-widget/dist/custom-widget.css";
import { parseEverything } from "./Helpers/parseEverything";
import { PieChart } from "./Widget";
import { ParsedData } from "./types";

/**
 * Widget view component.
 *
 * Responsible for managing state and synchronizing the internal state for the custom widget's
 * data with TagoIO (Admin and RUN), and also for providing callbacks for the presentational
 * component to use the functions from the Custom Widget Library.
 *
 * This separation of concerns makes it easier to test the widget and leaving some state (e.g. UI state, etc.)
 * in the presentational component and its sub-components.
 */
function WidgetView() {
  const [data, setData] = useState<ParsedData[] | null>(null);

  useEffect(() => {
    // Start communication with TagoIO Admin/RUN.
    window.TagoIO.ready();

    // Receive the widget's data and realtime data updates.
    // For more control over updating the state, the callback passed to `onRealtime` can check if
    // the data has changed before updating the state to avoid re-rendering unnecessarily.
    window.TagoIO.onRealtime((data) => {
      const parsedData = parseEverything(data);
      setData(parsedData);
    });
  }, []);
  if (!data) return null;

  return <PieChart data={data} />;
}

export { WidgetView };

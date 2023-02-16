import { useState, useMemo, ChangeEvent } from "react";

import { isVariableData } from "./Helpers";

import "./Widget.css";

type WidgetProps = {
  /**
   * Widget's data resolved from the API according to the widget's configuration.
   *
   * Will be `null` while loading or if somehow the communication with Admin/RUN has failed.
   */
  data: WidgetData[] | null;
  /**
   * Widget's configuration object.
   *
   * Will be `null` while loading or if somehow the communication with Admin/RUN has failed.
   */
  widget: Widget | null;
  /**
   * Callback function to use the post data API.
   *
   * @param newData Data to be sent to the API.
   * @param callbackFn Callback function called after the data is sent.
   */
  onSendData: (newData: any, callbackFn?: (response: any) => void) => void;
};

/**
 * Widget presentational component.
 *
 * Responsible for displaying the custom widget's interface, making use of the widget's configuration object and
 * the widget's data from variables/resources, as well as using the handlers passed from the view component to interact
 * with the Custom Widget and TagoIO's APIs.
 *
 * This component can be easily tested with mocks for data and especially for the callback functions to mimic
 * interactions and checking if they call the handlers for some APIs (e.g. sending data to a device).
 */
// ? Most of the code here aside from the props destructuring and the example for filtering widget's data to extract
// ? only values from variables should be replaced when developing a custom widget using this template.
function Widget(props: WidgetProps) {
  const { data, widget, onSendData } = props;

  /**
   * Memoized data from the widget, but filtered to include only the data items from variables (excluding resources).
   */
  const variableData = useMemo(() => {
    return data?.filter(isVariableData) || [];
  }, [data]);

  if (!data || !widget) {
    return (
      <div className="container">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="container">
      <div>
        <h5>Widget title: {widget.label || "<no title>"}</h5>

        {variableData.map((dataItem) => {
          return (
            <VariableControl
              key={`variable-${dataItem.data.origin}-${JSON.stringify(dataItem.data.variables)}`}
              item={dataItem}
            />
          );
        })}

        <VariablePostDataControl widget={widget} onSendData={onSendData} />
      </div>
    </div>
  );
}

/**
 * Simple component to show information about the widget's data settings and the amount of records returned from
 * the widget's data after resolving with the API.
 */
// ! Remove this component when working with a new custom widget.
function VariableControl(props: { item: WidgetVariableData }) {
  const {
    item: { data, result },
  } = props;

  const formattedVariableNames = data.variables.join(", ");

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", padding: "5px", gap: "5px" }}>
        <span style={{ display: "block" }}>Device ID: {data.origin}</span>
        <span style={{ display: "block" }}>Variables: {formattedVariableNames}</span>
        <span style={{ display: "block" }}>Data records: {result.length}</span>
      </div>
    </div>
  );
}

/**
 * Simple component to send data to one of the variables configured on the custom widget.
 */
// ! Remove this component when working with a new custom widget.
function VariablePostDataControl(props: { widget: Widget; onSendData: WidgetProps["onSendData"] }) {
  const { widget, onSendData } = props;

  const [variable, setVariable] = useState<string | null>(null);
  const [valueToSend, setValueToSend] = useState("");
  const [response, setResponse] = useState("");

  /**
   * Clear the return message after sending data to the API..
   */
  function clearResponse() {
    setTimeout(() => {
      setResponse("");
    }, 3000);
  }

  /**
   * Handle sending data to the API.
   */
  async function handleSendData() {
    const targetVariable = getVariableByKey(variable);

    if (!targetVariable) {
      return;
    }

    const {
      variable: variableName,
      origin: { id: deviceId },
    } = targetVariable;

    const payload = {
      variable: variableName,
      origin: deviceId,
      value: valueToSend,
    };

    onSendData(payload, (response) => {
      if (!response) {
        // eslint-disable-next-line no-console
        console.error("Error sending data!");
      }

      if (response.status) {
        setResponse("Data sent successfully!");
      } else {
        setResponse(response.message);
      }

      clearResponse();
    });
  }

  /**
   * Get a key from a variable object in the widget's display settings when ID is not available.
   *
   * @param variable Variable.
   */
  function getVariableKey(variable: VariableSettings) {
    return `${variable.origin.id}-${variable.variable}`;
  }

  /**
   * Get a variable from the widget's display variables by using the variable key (see `getVariableKey`) as identifier.
   *
   * @param variableKey Key from the options.
   *
   * @returns Variable object from the widget's display or `null` if it couldn't be found.
   */
  function getVariableByKey(variableKey: string | null) {
    const [originId, variableName] = (variableKey || "").split("-");

    if (originId && variableName) {
      return (
        widget.display.variables.find(
          (variable) => variable.variable === variableName && variable.origin.id === originId
        ) || null
      );
    }

    return null;
  }

  /**
   * Handle selecting a different option on the selector.
   *
   * @param event Event.
   */
  function handleSelectVariable(event: ChangeEvent<HTMLSelectElement>) {
    const variableKey = event.target.value || "";
    const targetVariable = getVariableByKey(variableKey);

    if (targetVariable) {
      setVariable(variableKey);
    }
  }

  const hasVariables = widget.display.variables.length > 0;

  return (
    <fieldset disabled={!hasVariables}>
      <legend>Post Data to Variable</legend>

      <select onChange={handleSelectVariable} value={variable ?? undefined}>
        {widget.display.variables.map((variable) => (
          <option key={`option-${getVariableKey(variable)}`} value={getVariableKey(variable)}>
            {variable.variable}
          </option>
        ))}
      </select>

      <input type="text" value={valueToSend} onChange={(e) => setValueToSend(e.target.value)} />
      <button onClick={handleSendData}>Send data</button>
      {response && <div className="alert">{response}</div>}
    </fieldset>
  );
}

export { Widget };
export type { WidgetProps };

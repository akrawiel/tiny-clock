import "normalize.css";
import "./index.css";

import { h, text, app } from "hyperapp";
import { every } from "@hyperapp/time";

const UpdateTime = (state) => ({
  ...state,
  time: new Date(),
});

const digitColumn = ({ currentDigit, maxDigit }) =>
  h(
    "div",
    {
      class: "digit-column",
      style: {
        "--digits": maxDigit + 1,
        "--current-digit": currentDigit,
      },
    },
    [...Array(maxDigit + 1).keys()].map((digit) => h("div", {}, text(digit)))
  );

const dateFormatter = new Intl.DateTimeFormat("en", {
  hour12: false,
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

app({
  init: { time: new Date() },
  subscriptions: () => [every(1000, UpdateTime)],
  view: ({ time }) => {
    const timeParts = dateFormatter.formatToParts(time);

    const hour = timeParts.find(({ type }) => type === "hour")?.value;
    const minute = timeParts.find(({ type }) => type === "minute")?.value;
    const second = timeParts.find(({ type }) => type === "second")?.value;

    return h("main", {}, [
      h(
        "div",
        { class: "description-row" },
        h(
          "a",
          {
            href: "https://github.com/akrawiel/tiny-clock",
            target: "_blank",
            rel: "noopener",
          },
          text("Tiny Clock")
        )
      ),
      h("div", { class: "container" }, [
        h("div", { class: "digit-row" }, [
          digitColumn({
            currentDigit: hour.charAt(0),
            maxDigit: 2,
          }),
          digitColumn({
            currentDigit: hour.charAt(1),
            maxDigit: 9,
          }),
          h("div", { class: "digit-row-spacer" }),
          digitColumn({
            currentDigit: minute.charAt(0),
            maxDigit: 5,
          }),
          digitColumn({
            currentDigit: minute.charAt(1),
            maxDigit: 9,
          }),
          h("div", { class: "digit-row-spacer" }),
          digitColumn({
            currentDigit: second.charAt(0),
            maxDigit: 5,
          }),
          digitColumn({
            currentDigit: second.charAt(1),
            maxDigit: 9,
          }),
          h("div", { class: "digit-row-highlighter" }),
        ]),
      ]),
      h("div", { class: "description-row small" }, [
        text("by "),
        h(
          "a",
          {
            href: "https://github.com/akrawiel",
            target: "_blank",
            rel: "noopener",
          },
          text("Olek Krawiel")
        ),
      ]),
    ]);
  },
  node: document.querySelector("main"),
});

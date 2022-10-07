function formatTimestamp(timestamp) {
  const rtf1 = new Intl.RelativeTimeFormat("en", { style: "narrow" });
  const deltaTime = timestamp - Date.now();

  const factorToUnit = [
    { factor: 1000, unit: "second" },
    { factor: 60000, unit: "minute" },
    { factor: 3600000, unit: "hour" },
  ];

  const { unit: smallestUnit } = factorToUnit[0];

  const formattedTimestamp = factorToUnit.reduce(
    (currentFormat, { factor, unit }) => {
      if (-deltaTime < factor) return currentFormat;
      return rtf1.format(Math.round(deltaTime / factor), unit);
    },
    rtf1.format(-1, smallestUnit) // smallest possible timestamp
  );

  return formattedTimestamp;
}

export default formatTimestamp;

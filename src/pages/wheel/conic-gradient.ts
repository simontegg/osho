import { schemeTableau10 } from "d3-scale-chromatic";

export default function conicGradient(options) {
  const increment = Math.floor(360 / options.length);

  return options.reduce((acc, _, i) => {
    if (i === options.length - 1) {
      acc += `${schemeTableau10[i]} ${i * increment}deg)`;
    } else {
      acc += `${schemeTableau10[i]} ${i * increment}deg ${
        (i + 1) * increment
      }deg, `;
    }

    return acc;
  }, "conic-gradient(");
}

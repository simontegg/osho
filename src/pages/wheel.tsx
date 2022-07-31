import { Link, useSearchParams } from "solid-app-router";
import { createMemo, createSignal, createEffect } from "solid-js";
import conicGradient from "./wheel/conic-gradient";
import { easeCubicInOut } from "d3-ease";

const MAX_DEGREES = 360 * 5;
const ANIMATION_TIME = 3000;

const labelRotation = (count) => (i) => {
  const step = 360 / count;
  return step * i + step / 2 - 90;
};

export default function WheelPage() {
  const [params, setParams] = useSearchParams();
  const search = createMemo(() => `?options=${params.options}`);
  const options = createMemo(() =>
    params.options ? params.options.split(",") : []
  );
  const [spinning, setSpinning] = createSignal(false);
  const [startRotation, setStartRotation] = createSignal(0);
  const [rotation, setRotation] = createSignal(params.deg || 0);
  const [start, setStart] = createSignal(null);
  const [prevTimestamp, setPreviousTimestamp] = createSignal(null);
  const [target, setTarget] = createSignal(null);
  const [result, setResult] = createSignal(null);
  const refs = {};

  function step(timestamp) {
    if (!start()) {
      setStart(timestamp);
    }

    const elapsed = timestamp - (start() || timestamp);
    if (prevTimestamp !== timestamp) {
      const per = elapsed / ANIMATION_TIME;
      const eased = Math.min(1, easeCubicInOut(per));
      const degrees = eased * (target() - startRotation()) + startRotation();
      setRotation(degrees);
    }

    if (elapsed < ANIMATION_TIME) {
      setPreviousTimestamp(timestamp);
      requestAnimationFrame(step);
    } else {
      setSpinning(false);
      setStart(null);
      setPreviousTimestamp(null);
      setStartRotation(target());
      setParams({ deg: Math.round(target()) });
      setTarget(null);

      /*
       * Calculate winning option by finding the most rightward label.
       * An invisible span is added at the and of the label
       * to avoid conflict between hoverlapping labels
       */
      let maxRight = 0;
      const positions = {};
      Object.values(refs).forEach((label) => {
        const { right } = label.getBoundingClientRect();
        positions[right] = label;

        if (right > maxRight) {
          maxRight = right;
        }
      });

      const option = positions[maxRight].getAttribute("data-option");

      setResult(`Result: ${option}`);
    }
  }

  function spin() {
    setSpinning(true);
    const range = rotation() > setTarget(Math.random() * MAX_DEGREES);
    requestAnimationFrame(step);
  }

  return (
    <section class="flex flex-col items-center p-8">
      <div class="relative">
        <div style={`transform: rotate(${rotation()}deg)`}>
          <div
            class="w-96 h-96"
            style={`border-radius: 50%; background: ${conicGradient(
              options()
            )}`}
          />
          <Index each={options()}>
            {(option, i) => (
              <div
                style={`transform: rotate(${labelRotation(options().length)(
                  i
                )}deg); top: 172px`}
                class="flex absolute w-96"
              >
                <label class="p-2 w-96 text-right">{option}</label>
                <span data-option={option()} ref={refs[i]} class="invisible" />
              </div>
            )}
          </Index>
        </div>
        <IconAntDesignCaretLeftFilled
          class="absolute"
          style="top: 11.4rem; right: -1rem;"
        />
      </div>
      <div class="mt-11">
        <p
          class="min-h-8 text-center bold"
          classList={{ invisible: spinning() }}
        >
          {result()}
        </p>

        <div class="flex flex-col">
          <button
            class="inline-block min-w-52 px-6 py-2.5 bg-white text-gray-900 border-1 border-black hover:shadow-lg font-medium text-xs leading-tight uppercase rounded focus:bg-gray-100 focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out"
            onClick={spin}
          >
            Spin
          </button>
          <Link href={`/${search()}`}>
            <button class="mt-4 inline-block min-w-52 px-6 py-2.5 bg-black text-white hover:shadow-lg font-medium text-xs leading-tight uppercase rounded focus:bg-gray-100 focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

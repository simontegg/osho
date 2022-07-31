import { createStore } from 'solid-js/store';
import { Link, useSearchParams } from "solid-app-router";
import { createMemo, createEffect, createSignal } from 'solid-js'
import useOptions from '../store/use-options'

function getErrors (options) {
  return  options().reduce((acc, option) => {
    if (typeof acc[option] !== 'undefined') {
      acc[option] ++
    } else {
      acc[option] = 0
    }

    return acc
  }, {})
}

export default function Input() {
  const [params, setParams] = useSearchParams()
  const search = createMemo(() => `?options=${params.options}`)
  const options = createMemo(() => params.options ? params.options.split(',') : [])
  const count = createMemo(() => options().length)
  const errors = createMemo(() => getErrors(options))
  const hasDuplicates = createMemo(() => Object.values(errors()).find(duplicate => duplicate > 0))
  const blankOptions = createMemo(() => options().reduce((acc, option) => {
    if (option === '') {
      acc += 1
    }

    return acc
  }, 0))
  const errorMessage = createMemo(() => {
    if (blankOptions() === 1) {
      return 'Blank option not allowed'
    } 

    if (blankOptions() > 1) {
      return 'Blank options allowed'
    }

    if (hasDuplicates()) {
      return 'Duplicates not allowed'
    }

    return null
  })

  const refs = {}

  // Set default options when the search params are empty or too few
  createEffect(() => {
    if (options().length === 1) {
      setParams({ options: ['Option 1', '']})
    } else if (options().length === 0) {
      setParams({ options: ['Option 1', 'Option 2']})
    }
  })

  createEffect(() => {
    refs[count() - 1].focus()
  })

  function onInputHandler (index, e) {
    const { value } = e.target 
    const update = options().reduce((acc, option, i) => {
      if (i === index) {
        acc.push(value)
      } else {
        acc.push(option)
      }

      return acc
    }, [])

    setParams({ options: update })
  }

  function remove (index) {
    const update = options().filter((_, i) => i !== index)
    setParams({ options: update })
  }

  return (
    <section class="flex flex-col items-center p-8">
      <div class="pl-4">
        <div class="min-h-main">
          <Index each={options()}>
          {
            (option, index) => {
              return (
              <div class="flex mt-2">
                <input 
                ref={refs[index]}
                type="text" 
                class="w-52 appearance-none border border-black rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                classList={{
                  'text-gray-700': errors()[option()] === 0,
                  'text-red-700': errors()[option()] > 0,
                  'border-red-700': errors()[option()] > 0
                }}
                value={option()} 
                onInput={[onInputHandler, index]}
                />
                <button 
                  class="ml-2" 
                  classList={{ 
                    invisible: options().length < 3,
                    'text-red-700': errors()[option()] > 0,
                  }}
                  onClick={[remove, index]}
                >
                  x
                </button>
              </div>
              )
            }
          }
          </Index>
          <div class="mt-2">
            <Show when={options().length < 10}>
              <button 
                class="inline-block min-w-52 px-6 py-2.5 bg-white text-gray-900 border-1 border-black hover:shadow-lg font-medium text-xs leading-tight uppercase rounded focus:bg-gray-100 focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out"
                onClick={() => setParams({ options: [...options(), `Option ${count() + 1}`] })}
              >
                Add Option
              </button>
          </Show>
          </div>
        </div>
        <p class="min-h-6 w-52 text-center text-red-700 ">
          {errorMessage()}
        </p>
        <div class="mt-4">
          <Link
            href={`/wheel${search()}`}
          >
            <button 
              disabled={hasDuplicates() || blankOptions()}
              class="inline-block w-52 px-6 py-2.5 bg-black text-white hover:shadow-lg font-medium text-xs leading-tight uppercase rounded focus:bg-gray-100 focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out disabled:opacity-75 disabled:cursor-not-allowed"
             >
              Done
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

import {
  defineComponent,
  onBeforeMount,
  onMounted,
  ref,
  unref,
  reactive,
} from 'vue';
import { useClipboard, useCss, useDebounce, useFetch } from 'Hooks';

const Meditation = defineComponent({
  setup() {
    const input = ref<string | null>(null);
    const el = ref<HTMLElement | null>(null);

    const { isSupported, text, copy } = useClipboard();
    const color = useCss('--color', el);

    const switchColor = () => {
      if (color.value === 'red') color.value = 'blue';
      else color.value = 'red';
    };

    const [run, cancel] = useDebounce(switchColor, [500]);

    const url = ref('https://httpbin.org/get');
    const refetch = ref(false);

    const { data } = useFetch(url, { refetch }).get();
    console.log(data.value);

    // const A = await fetch(`https://api.github.com/users/weishaodaren`);
    // console.log(await A.json());

    return () => (
      <>
        {isSupported && (
          <div>
            <p ref={el} style={'--color: blue; color: var(--color)'}>
              Current copied: <code>{unref(text) ?? 'none'}</code>
            </p>
            <input v-model={input.value} type="text" />
            <button onClick={(copy(input), run)}>Copy</button>
          </div>
        )}
        {!isSupported && (
          <div> Your browser does not support Clipboard API</div>
        )}
      </>
    );
  },
});

export default Meditation;

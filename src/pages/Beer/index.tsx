import { defineComponent, Fragment, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { WrappedInput, Button } from './style';
// import { clamp } from 'lodash';
import { inRange, clamp } from '@/utils';

const List = [
  { name: 'A', aliasName: 'a' },
  { name: 'B', aliasName: 'b' },
  { name: 'C', aliasName: 'c' },
];
const Beer = defineComponent({
  name: 'Beer',
  components: { 'wrapped-input': WrappedInput, Button },
  setup() {
    const $router = useRouter();

    const sample = inRange(-10, -19, 10);
    console.log(sample, 'sample');

    const placeholder = ref<string>(`input ur GitHub userName...`);
    const inputVal = ref<string>(``);
    const inputValComputed = computed({
      get: () => inputVal.value,
      set: (value) => (inputVal.value = value),
    });

    return () => (
      <Fragment>
        <wrapped-input
          placeholder={placeholder.value}
          v-model={inputValComputed.value}
        />
        <h2>This is fuckin beer</h2>
        <div>
          {List.map((el, index) => (
            <Fragment key={index}>
              <Button
                onClick={() => {
                  if (index !== 0) return;
                  $router.push({
                    name: 'Meditation',
                    query: { github: inputValComputed.value },
                  });
                }}
              >{`${el.name} - ${el.aliasName}`}</Button>
            </Fragment>
          ))}
        </div>
      </Fragment>
    );
  },
});

export default Beer;

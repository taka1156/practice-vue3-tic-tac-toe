<template>
  <div>
    <base-btn @on-click="onClick">
      <template v-slot:btn-label>
        {{ cellValue(pieceMark) }}
      </template>
    </base-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, PropType } from 'vue';
import { PieceType } from '@/types/types.d.ts';
import BaseBtn from '../atoms/BaseBtn.vue';

export default defineComponent({
  name: 'BaseBtn',
  components: {
    'base-btn': BaseBtn
  },
  props: {
    pieceNo: Number as PropType<number>,
    pieceMark: String as PropType<PieceType>
  },
  setup(props, context: SetupContext) {
    const onClick = (): void => {
      context.emit('on-click', props.pieceNo);
    };

    const cellValue = (v: PieceType) => {
      return v !== 'n' ? v : ' ';
    };

    return { cellValue, onClick };
  }
});
</script>

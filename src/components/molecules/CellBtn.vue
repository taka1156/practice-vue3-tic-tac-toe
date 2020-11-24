<template>
  <div>
    <base-btn @btn-click="cellClick()">
      {{ cellValue(pieceMark) }}
    </base-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, PropType } from 'vue';
import { PieceType } from '@/types/types.d.ts';
import BaseBtn from '../atoms/BaseBtn.vue';

export default defineComponent({
  name: 'CellBtn',
  components: {
    'base-btn': BaseBtn
  },
  props: {
    pieceNo: Number as PropType<number>,
    pieceMark: String as PropType<PieceType>
  },
  setup(props, context: SetupContext) {
    const cellClick = (): void => {
      context.emit('cell-click', props.pieceNo);
    };

    const cellValue = (v: PieceType): PieceType | ' ' => {
      return v !== 'n' ? v : ' ';
    };

    return { cellValue, cellClick };
  }
});
</script>

<style scoped>
::v-deep() .base-btn {
  display: block;
  height: 50px;
  width: 50px;
  padding: 10px;
  border: 1px solid black;
  font-size: 30px;
}
</style>

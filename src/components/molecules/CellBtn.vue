<template>
  <div class="cell-btn">
    <base-btn @btn-click="cellClick()">
      {{ cellValue(pieceMark) }}
    </base-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, PropType } from 'vue';
import { GameStatusType, PieceType } from '@/types/types.d.ts';
import BaseBtn from '../atoms/BaseBtn.vue';

export default defineComponent({
  name: 'CellBtn',
  components: {
    'base-btn': BaseBtn
  },
  props: {
    gameStatus: String as PropType<GameStatusType>,
    pieceNo: Number as PropType<number>,
    pieceMark: String as PropType<PieceType>
  },
  setup(props, context: SetupContext) {
    const cellClick = (): void => {
      // 勝敗が決まっている、すでに値がある場合はイベントを伝えない
      if (
        props.gameStatus === 'WIN' ||
        props.gameStatus === 'DRAW' ||
        props.pieceMark !== 'n'
      )
        return;
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

.cell-btn {
  height: 50px;
  width: 50px;
}
</style>

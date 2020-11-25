<template>
  <div class="cell-btn">
    <base-btn @btn-click="cellClick()" :class="btnFontStyle">
      {{ cellValue(pieceMark) }}
    </base-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, PropType, computed } from 'vue';
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
    const btnFontStyle = computed(() => {
      if (props.pieceMark === '○') {
        return 'base-btn--red';
      } else if (props.pieceMark === '×') {
        return 'base-btn--blue';
      } else {
        return '';
      }
    });

    const cellClick = (): void => {
      // 勝敗が決まっている、すでに値がある場合はイベントを伝えない
      if (
        props.pieceNo !== -1 &&
        (props.gameStatus === 'WIN' ||
          props.gameStatus === 'DRAW' ||
          props.pieceMark !== '')
      )
        return;
      context.emit('cell-click', props.pieceNo);
    };

    const cellValue = (v: PieceType): PieceType | '' => {
      return v !== '' ? v : '';
    };

    return { btnFontStyle, cellValue, cellClick };
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

.cell-btn--red {
  color: red;
}

.cell-btn--blue {
  color: blue;
}
</style>

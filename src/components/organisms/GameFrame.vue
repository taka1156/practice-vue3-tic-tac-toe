<template>
  <div>
    <base-btn @btn-click="init()">
      Start
    </base-btn>
    <p class="game-msg" v-show="state.msg !== ''">{{ state.msg }}</p>
    <div v-if="state.pieces.length !== 0" class="game-frame">
      <div v-for="(piece, index) in state.pieces" :key="`cell_${index}`">
        <cell-btn :piece-no="index" :piece-mark="piece" @cell-click="writePlayer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { PieceType, PiecesType, GameStatusType, PlyerType } from '@/types/types';
import BaseBtn from '../atoms/BaseBtn.vue';
import CellBtn from '../molecules/CellBtn.vue';

type FieldType = {
  pieces: PiecesType;
  msg: string;
};

export default defineComponent({
  name: 'GameFrame',
  components: {
    'base-btn': BaseBtn,
    'cell-btn': CellBtn
  },
  setup() {
    const state = reactive<FieldType>({
      pieces: [],
      msg: ''
    });

    const init = (): void => {
      console.log('start');
      state.pieces = new Array(9).fill('n');
    };

    const judgeGameStatus = (piece: PieceType): GameStatusType => {
      const FILEDS: string[] = [...state.pieces];
      if (FILEDS.every(v => v !== 'n')) {
        return 'DROW'; // 盤面を全部見なくていい
      } else if (FILEDS[0] === piece && FILEDS[1] === piece && FILEDS[2] === piece) {
        return 'WIN';
      } else if (FILEDS[3] === piece && FILEDS[4] === piece && FILEDS[5] === piece) {
        return 'WIN';
      } else if (FILEDS[6] === piece && FILEDS[7] === piece && FILEDS[8] === piece) {
        return 'WIN';
      } else if (FILEDS[0] === piece && FILEDS[3] === piece && FILEDS[6] === piece) {
        return 'WIN';
      } else if (FILEDS[1] === piece && FILEDS[4] === piece && FILEDS[7] === piece) {
        return 'WIN';
      } else if (FILEDS[2] === piece && FILEDS[5] === piece && FILEDS[8] === piece) {
        return 'WIN';
      } else if (FILEDS[0] === piece && FILEDS[4] === piece && FILEDS[8] === piece) {
        return 'WIN';
      } else if (FILEDS[2] === piece && FILEDS[4] === piece && FILEDS[6] === piece) {
        return 'WIN';
      } else {
        return 'CONTINUE';
      }
    };

    const generateMsg = (result: GameStatusType, player: PlyerType): void => {
      if (result === 'CONTINUE') {
        return;
      } else if (result === 'DROW') {
        state.msg = 'DROW';
      } else {
        state.msg = `${player} WIN`;
      }
    };

    const writePiece = (
      index: number,
      piece: PieceType,
      player: PlyerType
    ): void => {
      state.pieces[index] = piece;
      const RESULT = judgeGameStatus(piece);
      generateMsg(RESULT, player);
    };

    const writeCom = (): number => {
      // 'n' => 未入力の要素の添字のみに絞り込む (あとでミニマックスに変えるかも)
      const FILEDS_INDEX: number[] = [...state.pieces].reduce(
        (arr: number[], v, i) => {
          if (v === 'n') {
            arr.push(i);
          }
          return arr;
        },
        []
      );

      // ランダムに値を返す
      return FILEDS_INDEX[Math.floor(Math.random() * FILEDS_INDEX.length)];
    };

    const writePlayer = (index: number): void => {
      writePiece(index, '○', 'USER');
      writePiece(writeCom(), '×', 'COM');
    };

    return { state, init, writePlayer };
  }
});
</script>

<style scoped>
::v-deep() .base-btn {
  display: block;
  margin: 0 auto;
  height: 50px;
  width: 150px;
  padding: 10px;
  border: 1px solid black;
  font-size: 30px;
}

.game-msg {
  color: black;
}

.game-frame {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0;
  height: 150px;
  width: 150px;
  border: 2px solid black;
}
</style>

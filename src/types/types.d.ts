type PieceType = '○' | '×' | '';

type PiecesType = PieceType[];

type GameStatusType = 'INIT' | 'CONTINUE' | 'WIN' | 'DRAW';

type PlayerType = 'USER' | 'COM';

type PlayerInfoType = {
  player: PlayerType;
  piece: PieceType;
};

export { GameStatusType, PlayerType, PieceType, PiecesType, PlayerInfoType };

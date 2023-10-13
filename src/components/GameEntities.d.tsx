export type PlayerProps = {
    x: number;
    y: number;
    size: number;
    speed: number;
    score: number;
    movingLeft: boolean;
    movingRight: boolean;
    movingUp: boolean;
    movingDown: boolean;
}

export type WallProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    hasCollision: boolean;
}

export type NPCProps = {

}
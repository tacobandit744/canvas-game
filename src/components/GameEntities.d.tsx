type AttrProps = {
    x: number;
    y: number;
    width?: number;
    height?: number;
    size: number;
    hasCollision: boolean;
}

type MovementProps = {
    speed: number;
    movingLeft: boolean;
    movingRight: boolean;
    movingUp: boolean;
    movingDown: boolean;
}

export type PlayerProps = AttrProps & MovementProps & {
    score: number;
}

export type WallProps = AttrProps & {
    width: number;
    height: number;
    isHostile: boolean;
}

export type NPCProps = AttrProps & MovementProps & {
    isHostile: boolean;
    ai: Function;
}
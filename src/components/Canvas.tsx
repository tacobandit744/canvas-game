import { useState, useRef, useEffect} from 'react';
import {NPCProps, PlayerProps} from './GameEntities.d';

interface CanvasProps {
    width: number;
    height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [player, updatePlayer] = useState<PlayerProps>(
        {
            x:width/2, 
            y:height/2, 
            size: 25, 
            speed: 7,
            score: 0,
            movingLeft: false, 
            movingRight: false, 
            movingUp: false, 
            movingDown: false,
            hasCollision: true
        }
    );
    const [npc, updateNPC] = useState<NPCProps>(
        {
            x: 25,
            y:25,
            size: 10,
            speed: 5,
            movingLeft: false, 
            movingRight: false, 
            movingUp: false, 
            movingDown: false,
            hasCollision: true,
            isHostile: true,
            ai: () => {}
        }
    )

    const handleKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>): void => {
        if (e.key === 'a') updatePlayer(oldPlayer => {return {...oldPlayer, movingLeft: true}});
        if (e.key === 'd') updatePlayer(oldPlayer => {return {...oldPlayer, movingRight: true}});
        if (e.key === 'w') updatePlayer(oldPlayer => {return {...oldPlayer, movingUp: true}});
        if (e.key === 's') updatePlayer(oldPlayer => {return {...oldPlayer, movingDown: true}});
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLCanvasElement>): void => {
        if (e.key === 'a') updatePlayer(oldPlayer => {return {...oldPlayer, movingLeft: false}});
        if (e.key === 'd') updatePlayer(oldPlayer => {return {...oldPlayer, movingRight: false}});
        if (e.key === 'w') updatePlayer(oldPlayer => {return {...oldPlayer, movingUp: false}});
        if (e.key === 's') updatePlayer(oldPlayer => {return {...oldPlayer, movingDown: false}});
    };

    const playerUpdateLogic = (canvas: HTMLCanvasElement): void => {
        // Handle Player movement and boundary collisions
        if (player.movingLeft) {
            if (player.x - player.size > 0) {
                if ((player.x - player.size) < player.speed) updatePlayer(oldPlayer => {return {...oldPlayer, x: oldPlayer.size}});
                else updatePlayer(oldPlayer => {return {...oldPlayer, x: oldPlayer.x - player.speed}});
            }
        }
        if (player.movingRight) {
            if (player.x + player.size < canvas.width) {
                if ((player.x + player.size) > canvas.width - player.speed) updatePlayer(oldPlayer => {return {...oldPlayer, x: canvas.width - oldPlayer.size}});
                else updatePlayer(oldPlayer => {return {...oldPlayer, x: oldPlayer.x + player.speed}});
            } 
        }
        if (player.movingUp) { 
            if (player.y - player.size > 0) {
                if ((player.y - player.size) < player.speed) updatePlayer(oldPlayer => {return {...oldPlayer, y: oldPlayer.size}});
                else updatePlayer(oldPlayer => {return {...oldPlayer, y: oldPlayer.y - player.speed}});
            }
        }
        if (player.movingDown) { 
            if (player.y + player.size < canvas.height){
                if ((player.y + player.size) > canvas.height - player.speed) updatePlayer(oldPlayer => {return {...oldPlayer, y: canvas.height - oldPlayer.size}});
                else updatePlayer(oldPlayer => {return {...oldPlayer, y: oldPlayer.y + player.speed}});
            }      
        }
    };

    const drawEntities = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(player.x, player.y, player.size, 0, 2 * Math.PI);
        context.fill();
    };

    const gameLogic = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context) {
                // Update Player
                playerUpdateLogic(canvas);
                // Draw Entities
                drawEntities(canvas, context);
            }
        }
    };

    // Jank way of doing 60 FPS
    useEffect(() => {
        const tick = setInterval( () => {
            gameLogic();
        }, 17);

        return () => clearInterval(tick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameLogic]);


    return (
        <div>
            <canvas tabIndex={1} ref={canvasRef} height={height} width={width} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}></canvas>
            <div>
                <p>Player X: <b>{player.x}</b> Player Y: <b>{player.y}</b></p>
            </div>
        </div>
    );
};

export default Canvas;
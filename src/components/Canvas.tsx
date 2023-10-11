function canvas(props: {width: number, height: number}){
    return (
        <canvas id="canvas" width={props.width} height={props.height}></canvas>
    );
}

export default canvas;
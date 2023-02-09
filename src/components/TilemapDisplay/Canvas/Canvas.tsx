import React from 'react';
import { PublicTilemapContext } from '../../../Context/TilemapContext';
import { renderTileMap } from '../../../render/Render';

/**
 * Tilemap's canvas
 *
 * It is responsible for rendering the tilemap in a <canvas> element.
 *
 * @internal
 */
export class Canvas extends React.PureComponent {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private bufferCanvas: HTMLCanvasElement;
  private animationFrameId?: number;

  constructor() {
    super({});

    this.canvasRef = React.createRef();
    this.bufferCanvas = document.createElement('canvas');
  }

  static contextType = PublicTilemapContext;
  context!: React.ContextType<typeof PublicTilemapContext>;

  get canvasSize() {
    return this.context.state.canvasSize;
  }

  // Render loop

  private renderLoop = (timestamp: number) => {
    const canvas = this.canvasRef.current;
    const cameraPosition = this.context.state.cameraPosition;

    if (!cameraPosition && this.canvasSize) {
      this.context.actions.centerCamera();
    }

    if (canvas && cameraPosition && this.canvasSize) {
      renderTileMap({
        canvas,
        buffer: this.bufferCanvas,
        canvasSizePx: this.canvasSize,
        spriteMap: this.context.state.spriteMap,
        schema: this.context.props.tilmapSchema,
        cameraPosition,
        tileSizePx: this.context.computed.tileSize,
        timestamp,
        backgroundColor: this.context.props.backgroundColor,
      });
    }

    this.animationFrameId = window.requestAnimationFrame(this.renderLoop);
  };

  componentDidMount() {
    this.animationFrameId = window.requestAnimationFrame(this.renderLoop);
  }

  componentWillUnmount() {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }

  render() {
    if (!this.canvasSize) {
      return null;
    }
    return (
      <canvas
        style={{
          position: 'absolute',
        }}
        width={this.canvasSize.width}
        height={this.canvasSize.height}
        ref={this.canvasRef} />
    );
  }
}

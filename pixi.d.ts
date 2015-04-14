﻿/**
 * Pixi v3 Commit History Reviewed: 12/Apr
 * 
 * https://github.com/GoodBoyDigital/pixi.js/
 * 
 * The definitions will follow the Dev Branch for now. 
 *
 */
declare class PIXI {

    static autoDetectRenderer(width: number, height: number, options?: PIXI.RendererOptions, noWebGL?: boolean): PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    static loader: PIXI.Loader;
    static VERSION: string;
    static PI_2: number;
    static RAD_TO_DEG: number;
    static DEG_TO_RAD: number;
    static RENDER_TYPE: {
        UNKNOWN: number;
        WEBGL: number;
        CANVAS: number;
    };
    static BLEND_MODES: {
        NORMAL: number;
        ADD: number;
        MULTIPLY: number;
        SCREEN: number;
        OVERLAY: number;
        DARKEN: number;
        LIGHTEN: number;
        COLOR_DODGE: number;
        COLOR_BURN: number;
        HARD_LIGHT: number;
        SOFT_LIGHT: number;
        DIFFERENCE: number;
        EXCLUSION: number;
        HUE: number;
        SATURATION: number;
        COLOR: number;
        LUMINOSITY: number;

    };
    static SCALE_MODES: {
        DEFAULT: number;
        LINEAR: number;
        NEAREST: number;
    };
    static RETINA_PREFIX: string;
    static RESOLUTION: number;
    static FILTER_RESOLUTION: number;
    static DEFAULT_RENDER_OPTIONS: {
        view: HTMLCanvasElement;
        resolution: number;
        antialias: boolean;
        forceFXAA: boolean;
        autoResize: boolean;
        transparent: boolean;
        backgroundColor: number;
        clearBeforeRender: boolean;
        preserveDrawingBuffer: boolean;
    };
    static SHAPES: {
        POLY: number;
        RECT: number;
        CIRC: number;
        ELIP: number;
        RREC: number;
    };
    static SPRITE_BATCH_SIZE: number;

}

/*export interface Document {

    on(event: 'mousemove', fn: (event: PIXI.InteractionEvent) => void, context?: any): PIXI.EventEmitter;
    on(event: string, fn: (event: PIXI.InteractionEvent) => void, context?: any): PIXI.EventEmitter;

    once(event: 'mousemove', fn: (event: PIXI.InteractionEvent) => void, context?: any): PIXI.EventEmitter;
    once(event: string, fn: (event: PIXI.InteractionEvent) => void, context?: any): PIXI.EventEmitter;

}*/

declare module PIXI {

    //https://github.com/primus/eventemitter3
    export class EventEmitter {

        listeners(event: string): Function[];
        emit(event: string, ...args: any[]): boolean;
        on(event: string, fn: Function, context?: any): EventEmitter;
        once(event: string, fn: Function, context?: any): EventEmitter;
        removeListener(event: string, fn: Function, once?: boolean): EventEmitter;
        removeAllListeners(event: string): EventEmitter;

        off(event: string, fn: Function, once?: boolean): EventEmitter;
        addListener(event: string, fn: Function, context?: any): EventEmitter;

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////CORE//////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    //display

    export class DisplayObject extends EventEmitter implements interaction.InteractiveTarget {

        private _cacheAsBitmap: boolean;
        private _originalRenderWebGL: WebGLRenderer;
        private _originalRenderCanvas: CanvasRenderer;
        private _originalUpdateTransform: boolean;
        private _originalHitTest: any;
        private _cachedSprite: any;
        private _sr: number;
        private _cr: number;
        private _bounds: Rectangle;
        private _currentBounds: Rectangle;
        private _mask: Rectangle;
        private _cachedObject: any;

        private _renderCachedWebGL(renderer: WebGLRenderer): void;
        private _initCachedDisplayObject(renderer: WebGLRenderer): void;
        private _renderCachedCanvas(renderer: CanvasRenderer): void;
        private _initCachedDisplayObjectCanvas(renderer: CanvasRenderer): void;
        private _getCachedBounds(): Rectangle;
        private _destroyCachedDisplayObject(): void;
        private updateTransform(): void;

        position: Point;
        scale: Point;
        pivot: Point;
        rotation: number;
        renderable: boolean;
        alpha: number;
        visible: boolean;
        parent: Container;
        worldAlpha: number;
        worldTransform: Matrix;
        filterArea: Rectangle;

        x: number;
        y: number;
        worldVisible: boolean;
        mask: Graphics;
        filters: AbstractFilter[];
        name: string;

        cacheAsBitmap: boolean;

        getBounds(matrix?: Matrix): Rectangle;
        getLocalBounds(): Rectangle;
        toGlobal(position: Point): Point;
        toLocal(position: Point, from?: DisplayObject): Point;
        generateTexture(renderer: CanvasRenderer | WebGLRenderer, resolution: number, scaleMode: number): Texture;
        destroy(): void;
        getChildByName(name: string): DisplayObject;
        getGlobalPosition(point: Point): Point;

        interactive: boolean;
        buttonMode: boolean;
        interactiveChildren: boolean;
        defaultCursor: string;

        on(event: 'click', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'mousedown', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'mouseout', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'mouseover', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'mouseup', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'mouseclick', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'mouseupoutside', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'rightclick', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'rightdown', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'rightup', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'rightupoutside', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'tap', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'touchend', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'touchendoutside', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'touchmove', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: 'touchstart', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        on(event: string, fn: Function, context?: any): EventEmitter;

        once(event: 'click', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'mousedown', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'mouseout', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'mouseover', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'mouseup', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'mouseclick', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'mouseupoutside', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'rightclick', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'rightdown', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'rightup', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'rightupoutside', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'tap', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'touchend', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'touchendoutside', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'touchmove', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: 'touchstart', fn: (event: InteractionEvent) => void, context?: any): EventEmitter;
        once(event: string, fn: Function, context?: any): EventEmitter;

    }
    export class Container extends DisplayObject {

        private _renderWebGL(renderer: WebGLRenderer): void;
        private _renderCanvas(renderer: CanvasRenderer): void;

        children: DisplayObject[];

        width: number;
        height: number;

        addChild(child: DisplayObject): DisplayObject;
        addChildAt(child: DisplayObject, index: number): DisplayObject;
        swapChildren(child: DisplayObject, child2: DisplayObject): void;
        getChildIndex(child: DisplayObject): number;
        setChildIndex(child: DisplayObject, index: number): void;
        getChildAt(index: number): DisplayObject;
        removeChild(child: DisplayObject): DisplayObject;
        removeChildAt(index: number): DisplayObject;
        removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[];
        destroy(destroyChildren?: boolean): void;

        renderWebGL(renderer: WebGLRenderer): void;
        renderCanvas(renderer: CanvasRenderer): void;

    }

    //graphics

    export class GraphicsData {

        constructor(lineWidth: number, lineColor: number, lineAlpha: number, fillColor: number, fillAlpha: number, fill: boolean, shape: Circle | Rectangle | Ellipse | Polygon);

        lineWidth: number;
        lineColor: number;
        lineAlpha: number;
        fillColor: number;
        fillAlpha: number;
        fill: boolean;
        shape: Circle | Rectangle | Ellipse | Polygon;
        type: number;

        clone(): GraphicsData;

        private _lineTint: number;
        private _fillTint: number;

    }
    export class Graphics extends Container {

        fillAlpha: number;
        lineWidth: number;
        lineColor: number;
        tint: number;
        blendMode: number;
        isMask: boolean;
        boundsPadding: number;

        clone(): Graphics;
        lineStyle(lineWidth?: number, color?: number, alpha?: number): Graphics;
        moveTo(x: number, y: number): Graphics;
        lineTo(x: number, y: number): Graphics;
        quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): Graphics;
        bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): Graphics;
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
        arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): Graphics;
        beginFill(color: number, alpha: number): Graphics;
        endFill(): Graphics;
        drawRect(x: number, y: number, width: number, height: number): Graphics;
        drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): Graphics;
        drawCircle(x: number, y: number, radius: number): Graphics;
        drawEllipse(x: number, y: number, width: number, height: number): Graphics;
        drawPolygon(path: Point[]): Graphics;
        clear(): Graphics;
        //todo 
        generateTexture(renderer: WebGLRenderer | CanvasRenderer, resolution?: number, scaleMode?: number): Texture;
        getBounds(matrix?: Matrix): Rectangle;
        containsPoint(point: Point): boolean;
        updateLocalBounds(): void;
        drawShape(shape: Circle | Rectangle | Ellipse | Polygon): GraphicsData;

    }
    export interface GraphicsRenderer extends ObjectRenderer {
        //yikes todo
    }
    export interface WebGLGraphicsData {
        //yikes todo!
    }

    //math

    export class Point {

        x: number;
        y: number;

        constructor(x?: number, y?: number);

        clone(): Point;
        copy(p: Point): void;
        equals(p: Point): boolean;
        set(x?: number, y?: number): void;

    }
    export class Matrix {

        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;

        fromArray(array: number[]): void;
        toArray(transpose?: boolean): number[];
        apply(pos: Point, newPos?: Point): Point;
        applyInverse(pos: Point, newPos?: Point): Point;
        translate(x: number, y: number): Matrix;
        scale(x: number, y: number): Matrix;
        rotate(angle: number): Matrix;
        append(matrix: Matrix): Matrix;
        prepend(matrix: Matrix): Matrix;
        invert(): Matrix;
        identity(): Matrix;
        clone(): Matrix;
        copy(matrix: Matrix): Matrix;

        static IDENTITY: Matrix;
        static TEMP_MATRIX: Matrix;

    }
    export class Circle {

        constructor(x?: number, y?: number, radius?: number);

        x: number;
        y: number;
        radius: number;
        type: number;

        clone(): Circle;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    }
    export class Ellipse {

        constructor(x?: number, y?: number, width?: number, height?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        type: number;

        clone(): Ellipse;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    }
    export class Polygon {

        constructor(points: Point[]);
        constructor(points: number[]);
        constructor(...points: Point[]);
        constructor(...points: number[]);

        closed: boolean;
        points: number[];
        type: number;

        clone(): Polygon;
        contains(x: number, y: number): boolean;


    }
    export class Rectangle {

        constructor(x?: number, y?: number, width?: number, height?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        type: number;

        static EMPTY: Rectangle;

        clone(): Rectangle;
        contains(x: number, y: number): boolean;

    }
    export class RoundedRectangle {

        constructor(x?: number, y?: number, width?: number, height?: number, radius?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        radius: number;
        type: number;

        static EMPTY: Rectangle;

        clone(): Rectangle;
        contains(x: number, y: number): boolean;

    }

    //particles

    export interface ParticleContainerProperties {

        scale?: any;
        position?: any;
        rotation?: number;
        uvs?: any;
        alpha?: number;
    }
    export class ParticleContainer extends Container {

        constructor(size?: number, properties?: ParticleContainerProperties);

        interactiveChildren: boolean;
        blendMode: number;
        roundPixels: boolean;

        setProperties(properties: ParticleContainerProperties): void;
        addChildAt(child: DisplayObject, index: number): DisplayObject;
        removeChildAt(index: number): DisplayObject;

    }
    export interface ParticleBuffer {

    }
    export interface ParticleRenderer {

    }
    export interface ParticleShader {

    }

    //renderers

    export interface RendererOptions {

        view?: HTMLCanvasElement;
        transparent?: boolean
        antialias?: boolean;
        resolution?: number;
        clearBeforeRendering?: boolean;
        preserveDrawingBuffer?: boolean;
        forceFXAA?: boolean;

    }
    export class SystemRenderer extends EventEmitter {

        private _backgroundColor: number;
        private _backgroundColorRgb: number[];
        private _backgroundColorString: string;
        private _tempDisplayObjectParent: any;
        private _lastObjectRendered: DisplayObject;

        constructor(system: string, width?: number, height?: number, options?: RendererOptions);

        type: number;
        width: number;
        height: number;
        view: HTMLCanvasElement;
        resolution: number;
        transparent: boolean;
        autoResize: boolean;
        blendModes: any; //todo?
        preserveDrawingBuffer: boolean;
        clearBeforeRender: boolean;
        backgroundColor: number;

        render(object: DisplayObject): void;
        resize(width: number, height: number): void;
        destroy(removeView?: boolean): void;

    }
    export class CanvasRenderer extends SystemRenderer {

        private renderDisplayObject(displayObject: DisplayObject, context: CanvasRenderingContext2D): void;
        private _mapBlendModes(): void;

        constructor(width?: number, height?: number, options?: RendererOptions);

        context: CanvasRenderingContext2D;
        refresh: boolean;
        maskManager: CanvasMaskManager;
        roundPixels: boolean;
        currentScaleMode: number;
        currentBlendMode: number;
        smoothProperty: string;

        render(object: DisplayObject): void;

    }
    export class CanvasBuffer {

        private clear(): void;

        constructor(width: number, height: number);

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;

        width: number;
        height: number;

        resize(width: number, height: number): void;
        destroy(): void;

    }
    export class CanvasGraphics {

        private static renderGraphicsMask(graphics: Graphics, context: CanvasRenderingContext2D): void;
        private static updateGraphicsTint(graphics: Graphics): void;

        static renderGraphics(graphics: Graphics, context: CanvasRenderingContext2D): void;

    }
    export class CanvasMaskManager {

        pushMask(maskData: any, renderer: WebGLRenderer | CanvasRenderer): void;
        popMask(renderer: WebGLRenderer | CanvasRenderer): void;

    }
    export class CanvasTinter {

        static getTintedTexture(sprite: DisplayObject, color: number): HTMLCanvasElement;
        static tintWithMultiply(texture: Texture, color: number, canvas: HTMLDivElement): void;
        static tintWithOverlay(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static tintWithPerPixel(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static roundColor(color: number): number;
        static cacheStepsPerColorChannel: number;
        static convertTintToImage: boolean;
        static vanUseMultiply: boolean;
        static tintMethod: Function;

    }
    export class WebGLRenderer extends SystemRenderer {

        private _useFXAA: boolean;
        private _FXAAFilter: FXAAFilter;
        private _contextOptions: {
            alpha: boolean;
            antiAlias: boolean;
            premultipliedAlpha: boolean;
            stencil: boolean;
            preseveDrawingBuffer: boolean;
        }
        private _renderTargetStack: RenderTarget[];

        private _initContext(): void;
        private handleContextLost: (event: WebGLContextEvent) => void;
        private _mapBlendModes(): void;

        constructor(width?: number, height?: number, options?: RendererOptions);

        drawCount: number;
        shaderManager: ShaderManager;
        maskManager: MaskManager;
        stencilManager: StencilManager;
        filterManager: FilterManager;
        blendModeManager: BlendModeManager;
        currentRenderTarget: RenderTarget;
        currentRenderer: ObjectRenderer;

        render(object: DisplayObject): void;
        renderDisplayObject(displayObject: DisplayObject, renderTarget: RenderTarget, clear: boolean): void;
        setObjectRenderer(objectRenderer: ObjectRenderer): void;
        setRenderTarget(renderTarget: RenderTarget): void;
        updateTexture(texture: BaseTexture | Texture): BaseTexture | Texture;
        destroyTexture(texture: BaseTexture | Texture): void;

    }
    export class AbstractFilter {

        private uniforms: any;
        private vertexSrc: string[];
        private fragmentSrc: string[];

        constructor(vertexSrc: string | string[], fragmentSrc: string | string[], uniforms: any);

        padding: number;

        getShader(renderer: WebGLRenderer): Shader;
        applyFilter(renderer: WebGLRenderer, input: RenderTarget, output: RenderTarget, clear?: boolean): void;
        syncUniform(uniform: WebGLUniformLocation): void;

    }
    export class SpriteMaskFilter extends AbstractFilter {

        constructor(sprite: Sprite);

        maskSprite: Sprite;
        maskMatrix: Matrix;

        applyFilter(renderer: WebGLRenderbuffer, input: RenderTarget, output: RenderTarget): void;
        map: Texture;
        offset: Point;

    }
    export class BlendModeManager extends WebGLManager {

        constructor(renderer: WebGLRenderer);

        setBlendMode(blendMode: number): boolean;

    }
    export class FilterManager extends WebGLManager {

        constructor(renderer: WebGLRenderer);

    }
    export class MaskManager extends WebGLManager {

        stencilStack: StencilMaskStack;
        reverse: boolean;
        count: number;
        alphaMaskPool: any[];

        pushMask(target: RenderTarget, maskData: any): void;
        popMask(target: RenderTarget, maskData: any): void;
        pushSpriteMask(target: RenderTarget, maskData: any): void;
        popSpriteMask(): void;
        pushStencilMask(target: RenderTarget, maskData: any): void;
        popStencilMask(target: RenderTarget, maskData: any): void;

    }
    export class ShaderManager extends WebGLManager {

        private _currentId: number;
        private currentShader: Shader;

        constructor(renderer: WebGLRenderer);

        maxAttibs: number;
        attribState: any[];
        tempAttribState: any[];
        stack: any[];

        setAttribs(attribs: any[]): void;
        setShader(shader: Shader): boolean;
        destroy(): void;

    }
    export class StencilManager extends WebGLManager {

        constructor(renderer: WebGLRenderer);

        setMaskStack(stencilMaskStack: StencilMaskStack): void;
        pushStencil(graphics: Graphics, webGLData: WebGLGraphicsData): void;
        bindGraphics(graphics: Graphics, webGLData: WebGLGraphicsData): void;
        popStencil(graphics: Graphics, webGLData: WebGLGraphicsData): void;
        destroy(): void;
        pushMask(maskData: any[]): void;
        popMask(maskData: any[]): void;

    }
    export class WebGLManager {

        constructor(renderer: WebGLRenderer);

        renderer: WebGLRenderer;

        onContextChange: () => void;
        destroy(): void;

    }
    export class Shader {

        private attributes: any;
        private textureCount: number;
        private uniforms: any;

        private _glCompile(type: any, src: any): Shader;

        constructor(shaderManager: ShaderManager, vertexSrc: string, fragmentSrc: string, uniforms: any, attributes: any);

        uuid: number;
        gl: WebGLRenderingContext;
        shaderManager: ShaderManager;
        program: WebGLProgram;
        vertexSrc: string;
        fragmentSrc: string;

        init(): void;
        cachUniformLocations(keys: string): void;
        cacheAttributeLocations(keys: string): void;
        compile(): WebGLProgram;
        syncUniform(uniform: any): void;
        syncUniforms(): void;
        initSampler2D(uniform: any): void;
        destroy(): void;

    }
    export class ComplexPrimitiveShader extends Shader {

        constructor(shaderManager: ShaderManager);

    }
    export class PrimitiveShader extends Shader {

        constructor(shaderManager: ShaderManager);

    }
    export class TextureShader extends Shader {

        constructor(shaderManager: ShaderManager, vertexSrc?: string, fragmentSrc?: string, customUniforms?: any, customAttributes?: any)

    }
    export interface StencilMaskStack {

        stencilStack: any[];
        reverse: boolean;
        count: number;

    }
    export class ObjectRenderer extends WebGLManager {

        start(): void;
        stop(): void;
        flush(): void;
        render(object?: any): void;

    }
    export class RenderTarget {

        constructor(gl: WebGLRenderingContext, width: number, height: number, scaleMode: number, resolution: number, root: boolean);

        gl: WebGLRenderingContext;
        frameBuffer: WebGLFramebuffer;
        texture: Texture;
        size: Rectangle;
        resolution: number;
        projectionMatrix: Matrix;
        transform: Matrix;
        frame: Rectangle;
        stencilBuffer: WebGLRenderbuffer;
        stencilMaskStack: StencilMaskStack;
        filterStack: any[];
        scaleMode: number;
        root: boolean;

        clear(bind?: boolean): void;
        attachStencilBuffer(): void;
        activate(): void;
        calculateProjection(protectionFrame: Matrix): void;
        resize(width: number, height: number): void;
        destroy(): void;

    }
    export interface Quad {

        gl: WebGLRenderingContext;
        vertices: number[];
        uvs: number[];
        colors: number[];
        indices: number[];
        vertexBuffer: WebGLBuffer;
        indexBuffer: WebGLBuffer;

        map(rect: Rectangle, rect2: Rectangle): void;
        upload(): void;

    }

    //sprites

    export class Sprite extends Container {

        static fromFrame(frameId: string): Sprite;
        static fromImage(imageId: string, crossorigin?: boolean, scaleMode?: number): Sprite;

        private _texture: Texture;
        private _width: number;
        private _height: number;
        private cachedTint: number;

        private _onTextureUpdate(): void;

        constructor(texture?: Texture);

        anchor: Point;
        tint: number;
        blendMode: number;
        shader: Shader;
        texture: Texture;

        width: number;
        height: number;

        getBounds(matrix?: Matrix): Rectangle;
        getLocalBounds(): Rectangle;
        containsPoint(point: Point): boolean;
        destroy(destroyTexture?: boolean, destroyBaseTexture?: boolean): void;

    }
    export class SpriteRenderer extends ObjectRenderer {

        vertSize: number;
        vertByteSize: number;
        size: number;
        vertices: number[];
        positions: number[];
        colors: number[];
        indices: number[];
        lastIndexCount: number;
        drawing: boolean;
        currentBatchSize: number;
        currentBaseTexture: BaseTexture;
        textures: Texture[];
        blendModes: number[];
        shaders: Shader[];
        sprites: Sprite[];
        shader: Shader;

        render(sprite: Sprite): void;
        renderBatch(texture: Texture, size: number, startIndex: number): void;
        destroy(): void;

    }

    //text

    export interface TextStyle {

        font?: string;
        fill?: string | number;
        align?: string;
        stroke?: string | number;
        strokeThickness?: number;
        wordWrap?: boolean;
        wordWrapWidth?: number;
        lineHeight?: number;
        dropShadow?: boolean;
        dropShadowColor?: string;
        dropShadowAngle?: number;
        dropShadowDistance?: number;
        padding?: number;
        textBaseline?: string;
        lineJoin?: string;
        miterLimit?: number;

    }
    export class Text extends Sprite {

        private static fontPropertiesCache: any;
        private static fontPropertiesCanvas: HTMLCanvasElement;
        private static fontPropertiesContext: CanvasRenderingContext2D;

        private _text: string;
        private _style: TextStyle;

        private updateText(): void;
        private updateTexture(): void;
        private determineFontProperties(fontStyle: TextStyle): TextStyle;
        private wordWrap(text: string): boolean;

        constructor(text?: string, style?: TextStyle, resolution?: number);

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        resolution: number;
        text: string;
        style: TextStyle;

        width: number;
        height: number;

    }

    //textures

    export class BaseTexture extends EventEmitter {

        static fromImage(imageUrl: string, crossorigin?: boolean, scaleMode?: number): BaseTexture;
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: number): BaseTexture;

        private _glTextures: any[];

        private _sourceLoaded(): void;

        constructor(source: HTMLImageElement | HTMLCanvasElement, scaleMode?: number, resolution?: number);

        uuid: number;
        resolution: number;
        width: number;
        height: number;
        realWidth: number;
        realHeight: number;
        scaleMode: number;
        hasLoaded: boolean;
        isLoading: boolean;
        source: HTMLImageElement | HTMLCanvasElement;
        premultipliedAlpha: boolean;
        imageUrl: string;
        isPowerOfTwo: boolean;
        mipmap: boolean;

        update(): void;
        loadSource(source: HTMLImageElement | HTMLCanvasElement): void;
        destroy(): void;
        dispose(): void;
        updateSourceImage(newSrc: string): void;

        on(event: 'dispose', fn: (baseTexture: BaseTexture) => void, context?: any): EventEmitter;
        on(event: 'error', fn: (baseTexture: BaseTexture) => void, context?: any): EventEmitter;
        on(event: 'loaded', fn: (baseTexture: BaseTexture) => void, context?: any): EventEmitter;
        on(event: 'update', fn: (baseTexture: BaseTexture) => void, context?: any): EventEmitter;
        on(event: string, fn: Function, context?: any): EventEmitter;

        once(event: 'dispose', fn: (baseTexture: BaseTexture) => void, context?: any): EventEmitter;
        once(event: 'error', fn: (baseTexture: BaseTexture) => void, context?: any): EventEmitter;
        once(event: 'loaded', fn: (baseTexture: BaseTexture) => void, context?: any): EventEmitter;
        once(event: 'update', fn: (baseTexture: BaseTexture) => void, context?: any): EventEmitter;
        once(event: string, fn: Function, context?: any): EventEmitter;

    }
    export class RenderTexture extends Texture {

        private renderWebGL(displayObject: DisplayObject, matrix?: Matrix, clear?: boolean, updateTransform?: boolean): void;
        private renderCanvas(displayObject: DisplayObject, matrix?: Matrix, clear?: boolean, updateTransform?: boolean): void;

        constructor(renderer: CanvasRenderer | WebGLRenderer, width?: number, height?: number, scaleMode?: number, resolution?: number);

        width: number;
        height: number;
        resolution: number;
        renderer: CanvasRenderer | WebGLRenderer;
        valid: boolean;

        resize(width: number, height: number, updateBase?: boolean): void;
        clear(): void;
        destroy(): void;
        getImage(): HTMLImageElement;
        getBase64(): string;
        getCanvas(): HTMLCanvasElement;

    }
    export class Texture extends BaseTexture {

        static fromImage(imageUrl: string, crossOrigin?: boolean, scaleMode?: number): Texture;
        static fromFrame(frameId: string): Texture;
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: number): Texture;
        static fromVideo(video: HTMLVideoElement, scaleMode?: number): Texture;
        static fromVideoUrl(videoUrl: string, scaleMode?: number): Texture;
        static addTextureToCache(texture: Texture, id: string): void;
        static removeTextureFromCache(id: string): Texture;
        static EMPTY: Texture;

        private _frame: Rectangle;
        private _uvs: TextureUvs;

        private onBaseTextureLoaded(baseTexture: BaseTexture): void;
        private _updateUvs(): void;

        constructor(baseTexture: BaseTexture, frame?: Rectangle, crop?: Rectangle, trim?: Rectangle, rotate?: boolean);

        noFrame: boolean;
        baseTexture: BaseTexture;
        trim: Rectangle;
        valid: boolean;
        requiresUpdate: boolean;
        width: number;
        height: number;
        crop: Rectangle;
        rotate: boolean;

        frame: Rectangle;

        update(): void;
        destroy(destroyBase?: boolean): void;
        clone(): Texture;

    }
    export class TextureUvs {

        x0: number;
        y0: number;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        x3: number;
        y3: number;

        set(frame: Rectangle, baseFrame: Rectangle, rotate: boolean): void;

    }
    export class VideoBaseTexture extends BaseTexture {

        static fromVideo(video: HTMLVideoElement, scaleMode?: number): VideoBaseTexture;
        static fromUrl(videoSrc: string | any | string[]| any[]): VideoBaseTexture;

        private _loaded: boolean;

        private _onUpdate(): void;
        private _onPlayStart(): void;
        private _onPlayStop(): void;
        private _onCanPlay(): void;

        constructor(source: HTMLVideoElement, scaleMode?: number);

        autoUpdate: boolean;

        destroy(): void;

    }

    //utils

    export class utils {

        static uuid(): number;
        static hex2rgb(hex: number, out?: number[]): number[];
        static hex2String(hex: number): string;
        static rbg2hex(rgb: Number[]): number;
        static canUseNewCanvasBlendModel(): boolean;
        static getNextPowerOfTwo(number: number): number;
        static isPowerOfTwo(width: number, height: number): boolean;
        static getResolutionOfUrl(url: string): boolean;
        static sayHello(type: string): void;
        static isWebGLSupported(): boolean;
        static TextureCache: any;
        static BaseTextureCache: any;

    }
    export module utils {

        export class PolyK {

            private static _PointInTriangle(px: number, py: number, ax: number, ay: number, bx: number, by: number, cx: number, cy: number): boolean;
            private static _convex(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, sign: boolean): boolean;

            static Triangulate(p: any): number[];

        }

    }


    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////EXTRAS////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module extras {

        export interface BitmapTextStyle {

            font?: string | {

                name?: string;
                size?: number;

            };
            align?: string;
            tint?: number;

        }
        export class BitmapText extends Container {

            private _glyphs: Sprite[];
            private _font: string | {
                tint: number;
                align: string;
                name: string;
                size: number;
            }
            private _text: string;

            private updateText(): void;

            constructor(text: string, style?: BitmapTextStyle);

            textWidth: number;
            textHeight: number;
            maxWidth: number;
            dirty: boolean;

            tint: number;
            align: string;
            font: string | {
                tint: number;
                align: string;
                name: string;
                size: number;
            }
            text: string;

        }
        export class MovieClip extends Sprite {

            static fromFrames(frame: string[]): MovieClip;
            static fromImages(images: string[]): MovieClip;

            private _textures: Texture;

            private update(deltaTime: number): void;

            constructor(textures: Texture[]);

            animationSpeed: number;
            loop: boolean;
            onComplete: () => void;
            currentFrame: number;
            playing: boolean;

            totalFrames: number;
            textures: Texture[];

            stop(): void;
            play(): void;
            gotoAndStop(frameName: number): void;
            gotoAndPlay(frameName: number): void;
            destroy(): void;

        }
        export class Ticker extends EventEmitter {

            active: boolean;
            deltaTime: number;
            timeElapsed: number;
            lastTime: number;
            speed: number;

            start(): void;
            stop(): void;
            update(): void;

            on(event: "tick", fn: (deltaTime: number) => void, context?: any): EventEmitter;
            on(event: string, fn: Function, context?: any): EventEmitter;
            once(event: "tick", fn: (deltaTime: number) => void, context?: any): EventEmitter;
            once(event: string, fn: Function, context?: any): EventEmitter;

        }
        export class TilingSprite extends Sprite {

            //This is really unclean but is the only way :(  
            //See http://stackoverflow.com/questions/29593905/typescript-declaration-extending-class-with-static-method/29595798#29595798
            //Thanks bas!
            static fromFrame(frameId: string): Sprite;
            static fromImage(imageId: string, crossorigin?: boolean, scaleMode?: number): Sprite;

            static fromFrame(frameId: string, width?: number, height?: number): TilingSprite;
            static fromImage(imageId: string, width?: number, height?: number, crossorigin?: boolean, scaleMode?: number): TilingSprite;

            private _tileScaleOffset: Point;
            private _tilingTexture: boolean;
            private _refreshTexture: boolean;
            private _uvs: TextureUvs[];

            constructor(texture: Texture, width: number, height: number);

            tileScale: Point;
            tilePosition: Point;

            width: number;
            height: number;
            originalTexture: Texture;

            getBounds(): Rectangle;
            generateTilingTexture(renderer: WebGLRenderer | CanvasRenderer, texture: Texture, forcePowerOfTwo?: boolean): Texture;
            containsPoint(point: Point): boolean;
            destroy(): void;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////FILTERS////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export class AsciiFilter extends AbstractFilter {
        size: number;
    }
    export class BloomFilter extends AbstractFilter {

        blur: number;
        blurX: number;
        blurY: number;

    }
    export class BlurFilter extends AbstractFilter {

        blur: number;
        passes: number;
        blurX: number;
        blurY: number;

    }
    export class BlurXFilter extends AbstractFilter {

        passed: number;
        strength: number;
        blur: number;

    }
    export class BlurYFilter extends AbstractFilter {

        passed: number;
        strength: number;
        blur: number;

    }
    export class SmartBlurFilter extends AbstractFilter {

    }
    export class ColorMatrixFilter extends AbstractFilter {

        matrix: number[];

        brightness(b: number, multiply?: boolean): void;
        greyscale(scale: number, multiply?: boolean): void;
        blackAndWhite(multiply?: boolean): void;
        hue(rotation: number, multiply?: boolean): void;
        contrast(amount: number, multiply?: boolean): void;
        saturation(amount: number, multiply?: boolean): void;
        desaturate(multiply?: boolean): void;
        negative(multiply?: boolean): void;
        sepia(multiply?: boolean): void;
        technicolor(multiply?: boolean): void;
        polaroid(multiply?: boolean): void;
        toBGR(multiply?: boolean): void;
        kodachrome(multiply?: boolean): void;
        browni(multiply?: boolean): void;
        vintage(multiply?: boolean): void;
        colorTone(desaturation: number, toned: number, lightColor: string, darkColor: string, multiply?: boolean): void;
        night(intensity: number, multiply?: boolean): void;
        predator(amount: number, multiply?: boolean): void;
        lsd(multiply?: boolean): void;
        reset(): void;

    }
    export class ColorStepFilter extends AbstractFilter {

        step: number;

    }
    export class ConvolutionFilter extends AbstractFilter {

        constructor(matrix: number[], width: number, height: number);

        matrix: number[];
        width: number;
        height: number;

    }
    export class CrossHatchFilter extends AbstractFilter {

    }
    export class DisplacementFilter extends AbstractFilter {

        constructor(sprite: Sprite);

        map: Texture;

    }
    export class DotScreenFilter extends AbstractFilter {

        scale: number;
        angle: number;

    }
    export class BlurYTintFilter extends AbstractFilter {

        blur: number;

    }
    export class DropShadowFilter extends AbstractFilter {

        blur: number;
        blurX: number;
        blurY: number;
        color: number;
        alpha: number;
        distance: number;
        angle: number;

    }
    export class GrayFilter extends AbstractFilter {

        gray: number;

    }
    export class InvertFilter extends AbstractFilter {

        invert: number;

    }
    export class NoiseFilter extends AbstractFilter {

        noise: number;

    }
    export class NormalMapFilter extends AbstractFilter {

        constructor(texture: Texture);

        map: Texture;
        scale: Point;
        offset: Point;

    }
    export class PixelateFilter extends AbstractFilter {

        size: Point;

    }
    export class RGBSplitFilter extends AbstractFilter {

        red: number;
        green: number;
        blue: number;

    }
    export class SepiaFilter extends AbstractFilter {

        sepia: number;

    }
    export class ShockwaveFilter extends AbstractFilter {

        center: number[];
        params: any;
        time: number;

    }
    export class TiltShiftAxisFilter extends AbstractFilter {

        blur: number;
        gradientBlur: number;
        start: number;
        end: number;

        updateDelta(): void;

    }
    export class TiltShiftFilter extends AbstractFilter {

        blur: number;
        gradientBlur: number;
        start: number;
        end: number;

    }
    export class TiltShiftXFilter extends AbstractFilter {

        updateDelta(): void;

    }
    export class TiltShiftYFilter extends AbstractFilter {

        updateDelta(): void;

    }
    export class TwistFilter extends AbstractFilter {

        offset: Point;
        radius: number;
        angle: number;

    }
    export class FXAAFilter extends AbstractFilter {

        applyFilter(renderer: WebGLRenderer, input: RenderTarget, output: RenderTarget): void;

    }
    
    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////INTERACTION///////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export interface InteractionEvent {

        stopped: boolean;
        target: any;
        type: string;
        data: InteractionData;
        stopPropagation(): void;

    }
    export interface InteractionData {

        global: Point;
        target: DisplayObject;
        originalEvent: Event;

        getLocalPosition(displayObject: DisplayObject, point?: Point, globalPos?: Point): Point;

    }
    module interaction {

        export class InteractionManager {

            private interactionDOMElement: HTMLElement;
            private eventsAdded: boolean;
            private requestID: number;
            private _tempPoint: Point;

            private setTargetElement(element: HTMLElement, resolution: number): void;
            private addEvents(): void;
            private removeEvents(): void;
            private update(): void;
            private dispatchEvent(displayObject: DisplayObject, eventString: string, eventData: any): void;
            private throttleUpdate(): boolean;
            private onMouseDown: (event: Event) => void;
            private processMouseDown: (displayObject: DisplayObject, hit: boolean) => void;
            private onMouseUp: (event: Event) => void;
            private processMouseUp: (displayObject: DisplayObject, hit: boolean) => void;
            private onMouseMove: (event: Event) => void;
            private processMouseMove: (displayObject: DisplayObject, hit: boolean) => void;
            private onMouseOut: (event: Event) => void;
            private processMouseOverOut: (displayObject: DisplayObject, hit: boolean) => void;
            private onTouchStart: (event: Event) => void;
            private processTouchStart: (DisplayObject: DisplayObject, hit: boolean) => void;
            private onTouchEnd: (event: Event) => void;
            private processTouchEnd: (displayObject: DisplayObject, hit: boolean) => void;
            private onTouchMove: (event: Event) => void;
            private processTouchMove: (displayObject: DisplayObject, hit: boolean) => void;
            private getTouchData(touchEvent: InteractionData): InteractionData;
            private returnTouchData(touchData: InteractionData): void;

            constructor(renderer: CanvasRenderer | WebGLRenderer, options?: { autoPreventDefault?: boolean; interactionFrequence?: number; });

            renderer: CanvasRenderer | WebGLRenderer;
            autoPreventDefault: boolean;
            interactionFrequency: number;
            mouse: InteractionData;
            eventData: {
                stopped: boolean;
                target: any;
                type: any;
                data: InteractionData;
            };
            interactiveDataPool: InteractionData[];
            last: number;
            currentCursorStyle: string;
            resolution: number;

            mapPositionToPoint(point: Point, x: number, y: number): void;
            processInteractive(point: Point, displayObject: DisplayObject, func: (displayObject: DisplayObject, hit: boolean) => void, hitTest: boolean, interactive: boolean): boolean;
            destroy(): void;

        }
        export interface InteractiveTarget {

            interactive: boolean;
            buttonMode: boolean;
            interactiveChildren: boolean;
            defaultCursor: string;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////LOADER/////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //https://github.com/englercj/resource-loader/blob/master/src/Loader.js

    export interface LoaderOptions {

        crossOrigin?: boolean;
        loadType?: number;
        xhrType?: string;

    }
    export class Loader extends EventEmitter {

        constructor(baseUrl?: string, concurrency?: number);

        baseUrl: string;
        progress: number;
        loading: boolean;
        resources: Resource[];

        add(name: string, url: string, options?: LoaderOptions, cb?: () => void): Loader;
        add(url: string, options?: LoaderOptions, cb?: () => void): Loader;
        //todo I am not sure of object literal notional (or its options) so just allowing any but would love to improve this 
        add(obj: any, options?: LoaderOptions, cb?: () => void): Loader;

        on(event: 'complete', fn: (loader: PIXI.Loader, object: any) => void, context?: any): EventEmitter;
        on(event: 'error', fn: (error: Error, loader: PIXI.Loader, resource: Resource) => void, context?: any): EventEmitter;
        on(event: 'load', fn: (loader: PIXI.Loader, resource: Resource) => void, context?: any): EventEmitter;
        on(event: 'progress', fn: (loader: PIXI.Loader, resource: Resource) => void, context?: any): EventEmitter;
        on(event: 'start', fn: (loader: PIXI.Loader) => void, context?: any): EventEmitter;
        on(event: string, fn: Function, context?: any): EventEmitter;

        once(event: 'complete', fn: (loader: PIXI.Loader, object: any) => void, context?: any): EventEmitter;
        once(event: 'error', fn: (error: Error, loader: PIXI.Loader, resource: Resource) => void, context?: any): EventEmitter;
        once(event: 'load', fn: (loader: PIXI.Loader, resource: Resource) => void, context?: any): EventEmitter;
        once(event: 'progress', fn: (loader: PIXI.Loader, resource: Resource) => void, context?: any): EventEmitter;
        once(event: 'start', fn: (loader: PIXI.Loader) => void, context?: any): EventEmitter;
        once(event: string, fn: Function, context?: any): EventEmitter;

        before(fn: Function): Loader;
        pre(fn: Function): Loader;

        after(fn: Function): Loader;
        use(fn: Function): Loader;

        reset(): void;

        load(cb?: (loader: PIXI.Loader, object: any) => void): Loader;

    }
    export class Resource extends EventEmitter {

        static LOAD_TYPE: {
            XHR: number;
            IMAGE: number;
            AUDIO: number;
            VIDEO: number;
        };

        static XHR_READ_STATE: {
            UNSENT: number;
            OPENED: number;
            HEADERS_RECIEVED: number;
            LOADING: number;
            DONE: number;
        };

        static XHR_RESPONSE_TYPE: {
            DEFAULT: number;
            BUFFER: number;
            BLOB: number;
            DOCUMENT: number;
            JSON: number;
            TEXT: number;
        }

        constructor(name?: string, url?: string | string[], options?: LoaderOptions)

        name: string;
        url: string;
        data: any;
        crossOrigin: string;
        loadType: number;
        xhrType: string;
        error: Error;
        xhr: XMLHttpRequest;

        complete(): void;
        load(cb?: () => void): void;

    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////MESH///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module mesh {

        export class Mesh extends Container {

            static DRAW_MODES: {
                TRIANGLE_MESH: number;
                TRIANGLES: number;
            }

            constructor(texture: Texture, vertices?: number[], uvs?: number[], indices?: number[], drawMode?: number);

            texture: Texture;
            uvs: number[];
            vertices: number[];
            indices: number[];
            dirty: boolean;
            blendMode: number;
            canvasPadding: number;
            drawMode: number;

            getBounds(matrix?: Matrix): Rectangle;

            private _renderCanvasTriangleMesh(context: CanvasRenderingContext2D): void;
            private _renderCanvasTriangles(context: CanvasRenderingContext2D): void;
            private _renderCanvasDrawTriangle(context: CanvasRenderingContext2D, vertices: number, uvs: number, index0: number, index1: number, index2: number): void;
            private renderMeshFlat(Mesh: Mesh): void;
            private onTextureUpdate(): void;

        }
        export class Rope extends Mesh {

            constructor(texture: Texture, points: Point[]);

            points: Point[];
            colors: number[];

            refresh(): void;

        }
        export interface MeshRenderer extends ObjectRenderer {

            indices: number[];

            render(mesh: Mesh): void;
            flush(): void;
            start(): void;
            destroy(): void;

        }
        export interface StripShader extends Shader {
        }

    }

}
import React, { useEffect, useRef } from 'react';

// Since Matter.js is loaded from a CDN, we need to declare it for TypeScript
declare const Matter: any;

interface QualitiesProps {
    isDarkMode: boolean;
}

const Qualities: React.FC<QualitiesProps> = ({ isDarkMode }) => {
    // FIX: Corrected typo in the type from HTMLDivElenent to HTMLDivElement.
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<any>(null);
    const renderRef = useRef<any>(null);
    const runnerRef = useRef<any>(null);
    const lastWidthRef = useRef<number>(0);

    useEffect(() => {
        const { Engine, Render, Runner, Bodies, Composite, Events, Mouse, MouseConstraint, Constraint } = Matter;

        const cleanup = () => {
            if (runnerRef.current) Runner.stop(runnerRef.current);
            if (renderRef.current) {
                Render.stop(renderRef.current);
                if (renderRef.current.canvas) {
                  renderRef.current.canvas.remove();
                }
                renderRef.current.textures = {};
            }
            if (engineRef.current) Engine.clear(engineRef.current);
        };

        const initialize = () => {
            cleanup();

            const container = sceneRef.current;
            if (!container) return;

            const width = container.clientWidth;
            const height = container.clientHeight;
            lastWidthRef.current = width;
            const isMobile = width <= 768;

            const engine = Engine.create();
            engine.world.gravity.y = 0.1;
            engineRef.current = engine;

            const render = Render.create({
                element: container,
                engine: engine,
                options: {
                    width: width,
                    height: height,
                    wireframes: false,
                    background: 'transparent'
                }
            });
            renderRef.current = render;

            const bubbleColor = '#FFC107';
            const ropeColor = '#FFC107';

            // Define text colors for clarity
            const bubbleTextColor = '#0B1B34'; // Navy, for text inside gold bubbles (always dark)
            const hangingTitleColorLight = '#0B1B34'; // Navy, for hanging text in light mode
            const hangingTitleColorDark = '#FFFFFF';   // White, for hanging text in dark mode
            
            // Set the active colors based on the theme
            const bodyTextColor = bubbleTextColor; 
            const titleTextColor = isDarkMode ? hangingTitleColorDark : hangingTitleColorLight;


            const wallThickness = 100;
            const walls = [
                Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true, render: { visible: false } }),
                Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true, render: { visible: false } }),
                Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true, render: { visible: false } }),
                Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true, render: { visible: false } })
            ];

            const createBody = (x: number, y: number, text: string, options: any = {}) => {
                 const textMeasure = document.createElement('canvas').getContext('2d');
                 const font = options.font || `bold ${isMobile ? 14 : 16}px Poppins`;
                 if(textMeasure) textMeasure.font = font;
                 const textWidth = textMeasure?.measureText(text).width || 100;
                 const textHeight = parseInt(font.match(/\d+/)?.[0] || '16');

                 const bodyWidth = textWidth + (options.paddingX || (isMobile ? 30 : 40));
                 const bodyHeight = textHeight + (options.paddingY || (isMobile ? 20 : 30));

                 return Bodies.rectangle(x, y, bodyWidth, bodyHeight, {
                     chamfer: { radius: options.isTitle ? 10 : bodyHeight / 2 },
                     restitution: 0.5,
                     friction: 0.1,
                     render: { fillStyle: options.isTitle ? 'transparent' : bubbleColor },
                     customText: text,
                     customFontSize: font,
                     customFillStyle: options.customFillStyle || bodyTextColor
                 });
            };

            const keywordData = [ 'Profesional', 'Kreatif', 'Cepat', 'Terpercaya', 'Memukau', 'Sinematik', 'Berpengalaman', 'Inovatif', 'Responsif', 'Bercerita' ];
            const keywordBubbles = keywordData.map(text => createBody(
                Math.random() * (width * 0.8) + (width * 0.1),
                Math.random() * (height * 0.5) + (height * 0.4),
                text
            ));
            
            const titleOptions = { isTitle: true, paddingX: 10, paddingY: 10, customFillStyle: titleTextColor };
            const title1 = createBody(0, 0, 'Kualitas Kami', { ...titleOptions, font: `bold ${isMobile ? 24 : 40}px Poppins` });
            const title2 = createBody(0, 0, 'Dalam', { ...titleOptions, font: `bold ${isMobile ? 24 : 40}px Poppins` });
            const title3 = createBody(0, 0, 'Setiap Proyek', { ...titleOptions, font: `bold ${isMobile ? 24 : 40}px Poppins` });
            
            const allBodies = [...walls, ...keywordBubbles, title1, title2, title3];
            
            const constraints: any[] = [];
            const ropeOptions = {
                stiffness: isMobile ? 0.3 : 0.1,
                damping: 0.1,
                render: {
                    type: 'line',
                    strokeStyle: ropeColor,
                    lineWidth: 2,
                    visible: false
                },
                customIsRope: true
            };

            if(isMobile) {
                Matter.Body.setPosition(title1, { x: width / 2, y: height * 0.1 });
                Matter.Body.setPosition(title2, { x: width / 2, y: height * 0.2 });
                Matter.Body.setPosition(title3, { x: width / 2, y: height * 0.3 });

                constraints.push(Constraint.create({ bodyA: title1, pointB: { x: width / 2, y: height * 0.05 }, ...ropeOptions }));
                constraints.push(Constraint.create({ bodyA: title1, bodyB: title2, ...ropeOptions }));
                constraints.push(Constraint.create({ bodyA: title2, bodyB: title3, ...ropeOptions }));
            } else {
                const title1InitialX = width * 0.25;
                const title2InitialX = width * 0.5;
                const title3InitialX = width * 0.75;

                Matter.Body.setPosition(title1, { x: title1InitialX, y: height * 0.15 });
                Matter.Body.setPosition(title2, { x: title2InitialX, y: height * 0.35 });
                Matter.Body.setPosition(title3, { x: title3InitialX, y: height * 0.15 });
                
                // For a rectangle body, get half-width and half-height for precise anchor points
                const getBodyHalfSize = (body: any) => {
                    const bodyWidth = body.bounds.max.x - body.bounds.min.x;
                    const bodyHeight = body.bounds.max.y - body.bounds.min.y;
                    return { halfWidth: bodyWidth / 2, halfHeight: bodyHeight / 2 };
                };
                
                const { halfWidth: title1HalfWidth, halfHeight: title1HalfHeight } = getBodyHalfSize(title1);
                const { halfWidth: title2HalfWidth, halfHeight: title2HalfHeight } = getBodyHalfSize(title2);
                const { halfWidth: title3HalfWidth, halfHeight: title3HalfHeight } = getBodyHalfSize(title3);

                // "Kualitas Kami" (title1) is hung from its top-left corner.
                constraints.push(Constraint.create({
                    pointA: { x: title1InitialX - title1HalfWidth, y: 0 },
                    bodyB: title1,
                    pointB: { x: -title1HalfWidth, y: -title1HalfHeight },
                    ...ropeOptions
                }));

                // "Setiap Proyek" (title3) is hung from its top-right corner.
                constraints.push(Constraint.create({
                    pointA: { x: title3InitialX + title3HalfWidth, y: 0 },
                    bodyB: title3,
                    pointB: { x: title3HalfWidth, y: -title3HalfHeight },
                    ...ropeOptions
                }));

                // Connect bottom-right of "Kualitas Kami" (title1) to top-left of "Dalam" (title2).
                constraints.push(Constraint.create({
                    bodyA: title1,
                    pointA: { x: title1HalfWidth, y: title1HalfHeight }, // bottom-right of title1
                    bodyB: title2,
                    pointB: { x: -title2HalfWidth, y: -title2HalfHeight }, // top-left of title2
                    ...ropeOptions
                }));

                // Connect bottom-right of "Dalam" (title2) to top-left of "Setiap Proyek" (title3).
                constraints.push(Constraint.create({
                    bodyA: title2,
                    pointA: { x: title2HalfWidth, y: title2HalfHeight }, // bottom-right of title2
                    bodyB: title3,
                    pointB: { x: -title3HalfWidth, y: -title3HalfHeight }, // top-left of title3
                    ...ropeOptions
                }));
            }
            
            const mouse = Mouse.create(render.canvas);
            
            mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
            mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

            const mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: { stiffness: 0.2, render: { visible: false } }
            });

            Composite.add(engine.world, [...allBodies, ...constraints, mouseConstraint]);

            const drawWavyLine = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
                const dx = toX - fromX;
                const dy = toY - fromY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 2) return; // Don't draw if it's too short
                const angle = Math.atan2(dy, dx);
                
                const amplitude = 4;
                const zigzagWavelength = 8; // Approximate length of each V-shape in the zigzag
                const numSegments = Math.max(1, Math.floor(dist / zigzagWavelength));
                const segmentLength = dist / numSegments;
                let sign = 1;
            
                ctx.save();
                ctx.translate(fromX, fromY);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(0, 0);
            
                for (let i = 1; i <= numSegments; i++) {
                    const currentX = i * segmentLength;
                    // On the final segment, ensure it lands exactly at the end point (y=0 in this rotated context)
                    const currentY = (i === numSegments) ? 0 : sign * amplitude;
                    ctx.lineTo(currentX, currentY);
                    sign *= -1; // Alternate direction for the next peak/trough
                }
            
                ctx.stroke();
                ctx.restore();
            }

            Events.on(render, 'afterRender', () => {
                const context = render.context;
                const bodies = Composite.allBodies(engine.world);
                const allConstraints = Composite.allConstraints(engine.world);

                context.strokeStyle = ropeColor;
                context.lineWidth = 1.5;
                for(const constraint of allConstraints) {
                    if (constraint.customIsRope) {
                       let bodyA = constraint.bodyA;
                       let bodyB = constraint.bodyB;

                       // For constraints with specific points, calculate the world position of those points
                       const startPos = bodyA ? { x: bodyA.position.x + (constraint.pointA?.x || 0), y: bodyA.position.y + (constraint.pointA?.y || 0) } : constraint.pointA;
                       const endPos = bodyB ? { x: bodyB.position.x + (constraint.pointB?.x || 0), y: bodyB.position.y + (constraint.pointB?.y || 0) } : constraint.pointB;
                       
                       if (startPos && endPos) {
                           drawWavyLine(context, startPos.x, startPos.y, endPos.x, endPos.y);
                       }
                    }
                }
                
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                for (const body of bodies) {
                    if (body.customText) {
                        context.save();
                        context.translate(body.position.x, body.position.y);
                        context.rotate(body.angle);
                        context.font = body.customFontSize;
                        context.fillStyle = body.customFillStyle;
                        context.fillText(body.customText, 0, 0);
                        context.restore();
                    }
                }
            });

            Render.run(render);
            const runner = Runner.create();
            runnerRef.current = runner;
            Runner.run(runner, engine);
        };

        initialize();

        let resizeTimeout: number;
        const handleResize = () => {
             const container = sceneRef.current;
             if (container && container.clientWidth !== lastWidthRef.current) {
                 initialize();
             }
        };

        const debouncedResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(handleResize, 150);
        };

        window.addEventListener('resize', debouncedResize);

        return () => {
            window.removeEventListener('resize', debouncedResize);
            cleanup();
        };

    }, [isDarkMode]);

    return (
         <section className="py-20 bg-white dark:bg-navy overflow-hidden transition-colors duration-1000">
            <div className="container mx-auto px-6 h-[80vh] relative">
                <div className="w-full h-full" ref={sceneRef} />
            </div>
        </section>
    );
};

export default Qualities;
import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { createRef } from '@motion-canvas/core/lib/utils';
import { waitUntil, waitFor } from '@motion-canvas/core/lib/flow';
import { Line, Rect, Text } from '@motion-canvas/2d/lib/components';
import { Gradient } from '@motion-canvas/2d/lib/partials';
import { Vector2 } from '@motion-canvas/core/lib/types';

export default makeScene2D(function*(view) {
  const ItemOne = createRef<Rect>();
  const ItemTwo = createRef<Rect>();
  const ItemThree = createRef<Rect>();

  const myLine = createRef<Line>();
  const scale = 1;

  const Scene = {
    width: 1920 * scale,
    height: 1080 * scale,
    margin: 80 * scale,
    padding: 8 * scale,
  }

  yield view.add(
    <>
      <Rect
        offset={-1}
        x={-(Scene.width / 2) + (Scene.margin)}
        y={-(Scene.height / 2) + (Scene.margin)}
        height={Scene.height - (Scene.margin * 2)}
        width={Scene.width - (Scene.margin * 2)}
        layout
        direction='column'
        justifyContent='center'
        alignItems='stretch'
        clip
        gap={42}
        padding={24}
      >
        <Rect
          ref={ItemOne}
          lineWidth={4}
          stroke={new Gradient({
            type: "linear",
            stops: [
              { color: "#4B19D5", offset: 0 },
              { color: "#8F5AFF", offset: 1 },
            ],
            from: new Vector2(0, 0),
            to: new Vector2(200, 200),
            angle: 45
          })}
          fill="hsla(248, 60%, 32%, 0.2)"
          radius={24}
          padding={24}
          layout
          justifyContent="center"
          opacity={0}
        >
          <Text fontFamily="JetBrains Mono" fill="hsla(249, 100%, 90%, 1)">Item one</Text>
        </Rect>
        <Rect
          lineWidth={4}
          ref={ItemTwo}
          stroke={new Gradient({
            type: "linear",
            stops: [
              { color: "#4B19D5", offset: 0 },
              { color: "#8F5AFF", offset: 1 },
            ],
            from: new Vector2(0, 0),
            to: new Vector2(200, 200),
            angle: 45
          })}
          fill="hsla(248, 60%, 32%, 0.2)"
          radius={24}
          padding={24}
          layout
          justifyContent="center"
          opacity={0}
        >
          <Text fontFamily="JetBrains Mono" fill="hsla(249, 100%, 90%, 1)">Item two</Text>
        </Rect>
        <Rect justifyContent={'center'}>
        </Rect>
        <Rect
          lineWidth={4}
          ref={ItemThree}
          stroke={new Gradient({
            type: "linear",
            stops: [
              { color: "#4B19D5", offset: 0 },
              { color: "#8F5AFF", offset: 1 },
            ],
            from: new Vector2(0, 0),
            to: new Vector2(200, 200),
            angle: 45
          })}
          fill="hsla(248, 60%, 32%, 0.2)"
          radius={24}
          padding={[96, 24]}
          layout
          justifyContent="center"
          opacity={0}
        >
          <Text fontFamily="JetBrains Mono" fill="hsla(249, 100%, 90%, 1)">Item three</Text>
        </Rect>
      </Rect>
      <Line
        ref={myLine}
        stroke={'#8F5AFF'}
        lineWidth={8}
        endArrow
        radius={480}
        lineCap="round"
        opacity={0}
        points={[
          [ItemOne().position.x(), ItemOne().position.y() + (ItemOne().height() / 2 )],
          [ItemThree().position.x(), ItemThree().position.y() - (ItemThree().height() / 2)]
        ]}
      />
    </>,
  );

  yield* waitUntil('item_one');
  yield* ItemOne().opacity(1, 0.5);

  yield* waitUntil('item_two');
  yield* ItemTwo().opacity(1, 0.5);

  yield* waitUntil('item_three');
  yield* ItemThree().opacity(1, 0.5);

  yield* waitUntil('show_arrow');
  yield* myLine().opacity(1, 0.5);

  yield* waitUntil('item_three_grow');
  yield* ItemThree().height(400, 0.5);
  
  // does Line points={[...]} need to use signals to keep its points pinned to ItemOne and ItemThree

  yield* waitFor(3);
});


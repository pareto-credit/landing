#version 300 es
precision highp float;
precision highp int;

uniform vec2 coverScale;
uniform float anchorX;
uniform float artWidthCss;
uniform float phase;
uniform int layer;

out vec2 paperPosition;
out vec2 dotGrid;
out vec3 ink;
out float strength;
out float across;

const float tau = 6.28318530718;

// Both passes share the same 3:2 artboard and top-aligned cover crop.
vec4 project(vec2 point) {
  vec2 position = point * coverScale - vec2(anchorX * (coverScale.x - 1.0), 0.0);
  return vec4(position * vec2(2.0, -2.0) + vec2(-1.0, 1.0), 0.0, 1.0);
}

float streamY(float x, float v, float stream) {
  float family = mod(stream, 3.0);
  float bank = floor(stream / 3.0);
  float center = 0.274 + 0.56 * bank;
  float sweep = (-0.30 + 0.085 * sin(bank * 1.9)) * (x - 0.70)
              + 0.085 * sin(5.9 * x + 0.10 + bank * 1.4);
  float opening = 0.17 * (1.0 - smoothstep(0.12, 0.78, x)) + 0.024 + 0.125 * smoothstep(0.76, 1.15, x);
  float bend = (0.023 * sin(5.0 * x + phase * tau + 0.58 * family) + 0.014 * sin(8.2 * x - phase * tau + bank))
             * (1.0 - 0.53 * smoothstep(0.30, 0.85, x));
  float width = 0.087 + 0.056 * (1.0 - smoothstep(0.28, 0.79, x)) + 0.036 * smoothstep(0.75, 1.16, x);
  float twist = (0.085 * sin(5.7 * x + 1.1 * family + bank * 0.48 + 0.18 * sin(phase * tau))
               + 0.051 * cos(2.1 * x - 1.7 * family + bank)) * sin(v * 2.65);
  return center + sweep + (family - 1.0) * opening + bend + v * width + twist;
}

void main() {
  int vertex = gl_VertexID;
  if (layer == 0) {
    vec2 corner = vec2((vertex << 1) & 2, vertex & 2);
    gl_Position = vec4(2.0 * corner - 1.0, 0.0, 1.0);
    paperPosition = (vec2(corner.x, 1.0 - corner.y) + vec2(anchorX * (coverScale.x - 1.0), 0.0)) / coverScale;
    return;
  }

  // Sample the flowing surface. Fine detail is evaluated per display pixel.
  const ivec2 corners[6] = ivec2[](ivec2(0,0), ivec2(1,0), ivec2(0,1), ivec2(0,1), ivec2(1,0), ivec2(1,1));
  int cell = vertex / 6;
  float stream = float(cell / (64 * 24) - 3);
  vec2 coords = vec2(ivec2((cell / 24) % 64, cell % 24) + corners[vertex % 6]);
  float x = mix(-0.08, 1.08, coords.x / 64.0);
  across = coords.y / 12.0 - 1.0;
  float family = mod(stream, 3.0);
  float bank = floor(stream / 3.0);
  float pulse = 0.5 + 0.5 * cos(tau * (phase + 0.94 * x - 0.095 * across - 0.14 * family + 0.23 * bank));
  float front = smoothstep(-0.15, 0.82, x);
  strength = (0.42 + 0.58 * pulse) * (0.54 + 0.46 * front);
  ink = mix(vec3(0.47, 0.62, 0.55), vec3(0.16, 0.34, 0.27), 0.24 + 0.64 * strength);
  // Spacing follows the CSS size of the artboard. More screen area reveals more marks.
  dotGrid = vec2(x * artWidthCss / (2.7 + 0.15 * family) + phase * (6.0 + family),
                 across * artWidthCss / (34.0 + 2.0 * family) + 0.35 * family);
  gl_Position = project(vec2(x, streamY(x, across, stream)));
}

#version 300 es
precision highp float;
precision highp int;
uniform int layer;
uniform float deviceScale;
in vec2 paperPosition;
in vec2 dotGrid;
in vec3 ink;
in float strength;
in float across;
out vec4 color;

// Measure distance to each mark in device pixels so a bend cannot stretch it.
float stipple(float radius) {
  vec2 dx = dFdx(dotGrid), dy = dFdy(dotGrid);
  float determinant = dx.x * dy.y - dy.x * dx.y;
  float area = abs(determinant);
  if (area < 0.000001) return 0.0;
  mat2 pixels = mat2(dy.y, -dx.y, -dy.x, dx.x) / determinant;
  float distanceToDot = 1000.0;
  for (int offset = -1; offset <= 1; offset++) {
    float row = floor(dotGrid.y) + float(offset);
    float stagger = 0.5 * mod(row, 2.0) + 0.12 * sin(2.4 * row);
    vec2 delta = vec2(fract(dotGrid.x + stagger) - 0.5, dotGrid.y - row - 0.5);
    distanceToDot = min(distanceToDot, length(pixels * delta));
  }
  float widened = max(radius, 0.65);
  float coverage = (1.0 - smoothstep(widened - 0.5, widened + 0.5, distanceToDot)) * pow(radius / widened, 2.0);
  // At tightly folded edges, blend into average coverage before rows can alias.
  float footprint = max(length(vec2(dx.y, dy.y)), length(vec2(dx.x, dy.x)));
  return mix(coverage, min(0.30, 3.14159 * radius * radius * area), smoothstep(0.55, 1.15, footprint));
}

void main() {
  if (layer == 0) {
    float light = dot(paperPosition, vec2(0.35, 0.13)) + 0.10 * sin(dot(paperPosition, vec2(4.3, 2.1)));
    color = vec4(mix(vec3(0.973,0.977,0.961), vec3(0.866,0.91,0.879), light), 1.0);
    return;
  }
  float feather = 1.0 - smoothstep(0.18, 1.0, abs(across));
  // Diameters are 0.55–0.85 CSS pixels on every screen size.
  float radius = (0.275 + 0.15 * strength) * deviceScale;
  float mark = stipple(radius) * (0.50 + 0.40 * strength) * feather;
  float wash = (0.055 + 0.12 * strength) * feather;
  float alpha = wash + mark * (1.0 - wash);
  vec3 tint = vec3(0.58, 0.73, 0.65);
  color = vec4(mix(tint, ink, mark / max(alpha, 0.00001)), alpha);
}

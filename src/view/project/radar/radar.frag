precision mediump float;

varying vec2 v_position;

uniform float u_time;
uniform float u_radius;
uniform vec3 u_color;

void main() {
    // 计算两点之间的距离 d = sqrt(a * a + b * b);
    float dis = distance(vec2(0.0, 0.0), v_position);

    // 外层圆环的宽度
    float borderWidth = 5.0;
    // 雷达透明度
    float f_opacity = 0.0;

    // 显示 u_radius - borderWidth 范围之外的颜色
    if (dis > u_radius - borderWidth) {
        f_opacity = 1.0;
    }

    // 雷达扫描的显示
    if (dis < u_radius - borderWidth) {
        // 获取 -pi 到 pi 的角度
        float angle = atan(v_position.x, v_position.y);
        // 对 3.14 * 2.0 取模是为了 获取 -pi 到 pi 除以 2pi = 1/2 的大小
        float new_angle = mod(angle + u_time, 3.14 * 2.0);

        f_opacity = 1.0 - new_angle;
    }

    // 圆环之外的颜色设置为 0
    if (dis > u_radius) {
        f_opacity = 0.0;
    }

    gl_FragColor = vec4(u_color, f_opacity);
}

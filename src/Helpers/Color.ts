class Color {

    // 0xFFFFFF -> 'FFFFFF'
    static intToHexString(hex) {
        return '#' + hex.toString(16);
    }

    // 'FFFFFF' -> 0xFFFFFF
    static hexStringToInt(string) {
        return parseInt('0x' + string.replace('#', ''));
    }

    // produce a new color from (sharePercent 0.0->1.0, color1, optional color 2)
    // Accepts '#FFFFFF' color string values
    static shadeBlend(p: number, c0: any, c1: any) {
        var n = p < 0 ? p * -1 : p, u = Math.round, w = parseInt;
        var R, G, B, R1, G1, B1, t;
        var f: any;
        if (c0.length > 7) {
            f = c0.split(","), t = (c1 ? c1 : p < 0 ? "rgb(0,0,0)" : "rgb(255,255,255)").split(","), R = w(f[0].slice(4)), G = w(f[1]), B = w(f[2]);
            return "rgb(" + (u((w(t[0].slice(4)) - R) * n) + R) + "," + (u((w(t[1]) - G) * n) + G) + "," + (u((w(t[2]) - B) * n) + B) + ")";
        } else {
            f = w(c0.slice(1), 16), t = w((c1 ? c1 : p < 0 ? "#000000" : "#FFFFFF").slice(1), 16), R1 = f >> 16, G1 = f >> 8 & 0x00FF, B1 = f & 0x0000FF;
            return "#" + (0x1000000 + (u(((t >> 16) - R1) * n) + R1) * 0x10000 + (u(((t >> 8 & 0x00FF) - G1) * n) + G1) * 0x100 + (u(((t & 0x0000FF) - B1) * n) + B1)).toString(16).slice(1);
        }
    }

    // Same as above but accepts 0xFFFFFF int hex values
    static shadeBlendInt(percent: number, color1: number, color2?: number) {
        var color1Str: string = this.intToHexString(color1);
        var color2Str: string = undefined;
        if (color2) {
            color2Str = this.intToHexString(color2);
        }
        return this.hexStringToInt(this.shadeBlend(percent, color1Str, color2Str));
    }

}

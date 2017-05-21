class Falloff {

    //y=-(x/5)^2+1
    static Quadratic(distanceAway: number, maxViewDistance: number, maxReturnValue: number) {
        return Math.max(0, -Math.pow((distanceAway / maxViewDistance), 2) + maxReturnValue);
    }

    //y=( (1/sqr(x+1)) - (1/sqr(5)) ) * 3
    static QuadraticInverse(distanceAway: number, maxViewDistance: number, maxReturnValue: number) {
        return Math.min(1,
            Math.max(0,
                ((1 / Math.sqrt(distanceAway + maxReturnValue)) - (1 / Math.sqrt(maxViewDistance))) * 3
            )
        );
    }

}

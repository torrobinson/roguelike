class Random {
    seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    go() {
        // Fetches the next random number in the sequence
        let x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

    next(min: number, max: number) {
        // Fetches the next random number in the sequence, with a minimum and maximum
        return Math.floor(this.go() * (max - min + 1)) + min;
    }

    nextWeighted(min: number, max: number) {
        // Fetches the next random number in the sequence, with a minimum and maximum, and weighted
        //  towards the center.
        // This is done by generating only two numbers at half the maximum and adding them together
        return Math.floor((this.next(min, max) + this.next(min, max)) / 2);
    }

    // wasLucky(2/3) return if something was true with a 66% chance of being true
    wasLucky(numerator: number, denominator: number) {
        var percent = Math.ceil((numerator / denominator) * 100);
        return this.next(1, 100) <= percent;
    }

    wasLuckyPercent(percent: number) {
        return this.next(1, 100) <= percent;
    }
}

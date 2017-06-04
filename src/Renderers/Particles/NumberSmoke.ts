declare var PIXI: any;

class NumberSmoke {
    // Attributes
    text: string;
    color: number;
    screenLocation: Point;
    pixiContainer: any;

    startAlpha: number = 1.0;
    endAlpha: number = 0.0;
    msDuration: number = 1500;
    verticalOffset: number = 32;

    private age: number = 0;

    // Sprite
    pixiText: any = null;

    // For calculations
    private heightPerMillisecond: number;
    private alphaDeltaPerMillisecond: number;

    constructor(pixiContainer: any, text: string = '', screenLocation: Point, color: number = ColorCode.White) {
        this.text = text;
        this.color = color;
        this.screenLocation = screenLocation;
        this.pixiContainer = pixiContainer;

        this.heightPerMillisecond = -this.verticalOffset / this.msDuration;
        this.alphaDeltaPerMillisecond = (this.endAlpha - this.startAlpha) / this.msDuration;

        this.pixiText = new PIXI.Text(
            text,
            new PIXI.TextStyle({
                fontFamily: 'Courier',
                fontSize: 14,
                fill: color,
                align: 'center',
                stroke: ColorCode.Black,
                strokeThickness: 4
            })
        );
        this.pixiText.x = this.screenLocation.x;
        this.pixiText.y = this.screenLocation.y;
        this.pixiContainer.addChild(this.pixiText);
    }

    update(secondsElapsed: number) {
        let millisecondsElapsed = secondsElapsed * 1000;
        this.age += millisecondsElapsed;
        this.pixiText.x = this.screenLocation.x;
        this.pixiText.y = Math.ceil(this.getVerticalScreenLocationAt(this.age));
        this.pixiText.alpha = this.getAlphaAt(this.age);
    }

    private getVerticalScreenLocationAt(millisecondsElapsed: number): number {
        return this.screenLocation.offsetBy(
            0,
            millisecondsElapsed * this.heightPerMillisecond
        ).y;
    }

    private getAlphaAt(millisecondsElapsed: number): number {
        return this.startAlpha + (millisecondsElapsed * this.alphaDeltaPerMillisecond);
    }

    isFinished(): boolean {
        return this.age >= this.msDuration;
    }
}

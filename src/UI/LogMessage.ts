class LogMessage {
    message: string;
    color: number = ColorCode.White;
    constructor(message: string, logMessageType: LogMessageType = LogMessageType.Informational) {
        this.message = '[' +Generic.GetTimeStamp() + '] ' + message;
        var color = ColorCode.White;
        switch (logMessageType) {
            case LogMessageType.LandedAttack:
                color = ColorCode.White;
                break;

            case LogMessageType.Damaged:
                color = ColorCode.Red;
                break;

            case LogMessageType.ObtainedItem:
                color = ColorCode.Green;
                break;

            case LogMessageType.ObtainedGold:
                color = ColorCode.Yellow;
                break;

            case LogMessageType.GainedXP:
                color = ColorCode.Purple;
                break;

            case LogMessageType.LevelledUp:
                color = ColorCode.Pink;
                break;

            case LogMessageType.Informational:
                color = ColorCode.White;
                break;

            case LogMessageType.LostGold:
                color = ColorCode.Red;
                break;
        }
        this.color = color;
    }
}

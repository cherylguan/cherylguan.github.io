class ArrowImg {
    constructor() {
    }

    static GetSpriteData() {
        var str = '{"SpriteType":"Fill","Color":{"R":250,"G":0,"B":0},"X":0,"Y":0,"Width":30,"Height":30,"LineWidth":5,"Alpha":1,"RotationCW":0,"Points":[{"X":15.5,"Y":0.5},{"X":14.5,"Y":0.5},{"X":0.5,"Y":14.5},{"X":0.5,"Y":20.5},{"X":12.5,"Y":8.5},{"X":12.5,"Y":29.500000000000004},{"X":17.5,"Y":29.500000000000004},{"X":17.5,"Y":8.5},{"X":29.500000000000004,"Y":20.5},{"X":29.500000000000004,"Y":14.5}]}';
        var spriteData = JSON.parse(str);
        return spriteData;
    }
}

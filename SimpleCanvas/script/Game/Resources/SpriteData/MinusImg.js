class MinusImg {
    constructor() {
    }

    static GetSpriteData() {
        var str = '{"SpriteType":"Fill","Color":{"R":250,"G":1,"B":1},"X":0,"Y":0,"Width":20,"Height":20,"LineWidth":5,"Alpha":1,"RotationCW":0,"Points":[{"X":0.5,"Y":7.5},{"X":19.5,"Y":7.5},{"X":19.5,"Y":12.5},{"X":0.5,"Y":12.5}]}';
        var spriteData = JSON.parse(str);
        return spriteData;
    }
}

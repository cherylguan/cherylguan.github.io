class IconFrameImg {
    constructor() {
    }

    static GetSpriteData() {
        var str = '{"SpriteType":"Fill","Color":{"R":76,"G":215,"B":240},"X":0,"Y":0,"Width":40,"Height":40,"LineWidth":5,"Alpha":1,"RotationCW":0,"Points":[{"X":0.5,"Y":19.5},{"X":9.5,"Y":0.5},{"X":30.5,"Y":0.5},{"X":39.5,"Y":19.5},{"X":39.5,"Y":20.5},{"X":30.5,"Y":39.5},{"X":9.5,"Y":39.5},{"X":0.5,"Y":20.5},{"X":3.5,"Y":20.5},{"X":11.5,"Y":36.5},{"X":28.5,"Y":36.5},{"X":36.5,"Y":20.5},{"X":36.5,"Y":19.5},{"X":28.5,"Y":3.5},{"X":11.5,"Y":3.5},{"X":3.5,"Y":19.5},{"X":3.5,"Y":20.5},{"X":0.5,"Y":20.5},{"X":0.5,"Y":19.5}]}';
        var spriteData = JSON.parse(str);
        return spriteData;
    }
}

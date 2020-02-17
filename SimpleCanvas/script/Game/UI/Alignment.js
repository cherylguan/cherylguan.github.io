const ALIGN_UP = 0;
const ALIGN_DOWN = 1;
const ALIGN_RIGHT = 2;
const ALIGN_LEFT = 3;
const ALIGN_MIDDLE = 4;
const ALIGN_UPPER_LEFT = 5;
const ALIGN_UPPER_CENTER = 6;

class Alignment{
    constructor(){ }

    static AlignObjectsX(x, y, objMargin, diffX = 0, diffY = 0, alignment = ALIGN_MIDDLE, ...args) {
        var argList = new Array();
        for (var i = 0; i < args.length; i++) {
            argList.push(args[i]);
        }
        Alignment.AlignObjectListX(x, y, objMargin, argList, diffX, diffY, alignment);
    }

    static AlignObjectsY(x, y, objMargin, diffX = 0, diffY = 0, alignment = ALIGN_MIDDLE, ...args) {
        var argList = new Array();
        for (var i = 0; i < args.length; i++) {
            argList.push(args[i]);
        }
        Alignment.AlignObjectListY(x, y, objMargin, argList, diffX, diffY, alignment);
    }

    static AlignObjectListX(x, y, objMargin, args, diffX = 0, diffY = 0, alignment = ALIGN_MIDDLE) {
        if (args.length < 1) {
            return;
        }
        var totalWidth = 0;
        args.forEach((displayObject) => {
            totalWidth += displayObject.width;
        });

        totalWidth += objMargin * (args.length - 1);
        var currentX = x - totalWidth / 2;

        for (var i = 0; i < args.length; i++) {
            args[i].x = currentX + diffX;
            currentX += args[i].width + objMargin;

            if (alignment == ALIGN_MIDDLE) {
                args[i].y = y - args[i].height / 2 + diffY;
            }
            else if (alignment == ALIGN_UP) {
                args[i].y = y + diffY;
            }
            else if (alignment == ALIGN_DOWN) {
                args[i].y = y - args[i].height + diffY;
            }
        }
    }

    static AlignObjectListY(x, y, objMargin, args, diffX = 0, diffY = 0, alignment = ALIGN_MIDDLE) {
        if (args.length < 1) {
            return;
        }
        var totalHeight = 0;
        args.forEach((displayObject) => {
            totalHeight += displayObject.height;
        });

        totalHeight += objMargin * (args.length - 1);
        var currentY = y - totalHeight / 2;

        for (var i = 0; i < args.length; i++) {
            args[i].y = currentY + diffY;
            currentY += args[i].height + objMargin;

            if (alignment == ALIGN_MIDDLE) {
                args[i].x = x - args[i].width / 2 + diffX;
            }
            else if (alignment == ALIGN_LEFT) {
                args[i].x = x + diffX;
            }
            else if (alignment == ALIGN_RIGHT) {
                args[i].x = x - args[i].width + diffX;
            }
        }
    }

    //ref: DisplayObject
    static AlignObjectsYRef(ref, objMargin, diffX = 0, diffY = 0, alignment = ALIGN_MIDDLE, ...args) {
        var argList = new Array();
        for (var i = 0; i < args.length; i++) {
            argList.push(args[i]);
        }
        Alignment.AlignObjectListY(ref.x + ref.width / 2, ref.y + ref.height / 2, objMargin, argList, diffX, diffY, alignment);
    }

    static AlignObjectsXRef(ref, objMargin, diffX = 0, diffY = 0, alignment = ALIGN_MIDDLE, ...args) {
        var argList = new Array();
        for (var i = 0; i < args.length; i++) {
            argList.push(args[i]);
        }
        Alignment.AlignObjectListX(ref.x + ref.width / 2, ref.y + ref.height / 2, objMargin, argList, diffX, diffY, alignment);
    }

    //ref, args DisplayObject
    static AlignObjectListYRef(ref, objMargin, args, diffX = 0, diffY = 0, alignment = ALIGN_MIDDLE) {
        Alignment.AlignObjectListY(ref.x + ref.width / 2, ref.y + ref.height / 2, objMargin, args, diffX, diffY, alignment);
    }

    static AlignObjectListXRef(ref, objMargin, args, diffX = 0, diffY = 0, alignment = ALIGN_MIDDLE) {
        Alignment.AlignObjectListX(ref.x + ref.width / 2, ref.y + ref.height / 2, objMargin, args, diffX, diffY, alignment);
    }

    static AlignBelowRef(ref, objMargin, diffX = 0, diffY = 0, alignment = ALIGN_MIDDLE, ...args) {
        var centerX = ref.x + ref.width / 2 + diffX;
        var currentY = ref.y + ref.height + objMargin + diffY;

        for (var i = 0; i < args.length; i++) {
            args[i].y = currentY;
            currentY += args[i].height + objMargin;

            if (alignment == ALIGN_MIDDLE) {
                args[i].x = centerX - args[i].width / 2;
            }
            else if (alignment == ALIGN_LEFT) {
                args[i].x = centerX - ref.width / 2;
            }
            else if (alignment == ALIGN_RIGHT) {
                args[i].x = centerX + ref.width / 2 - args[i].width;
            }
        }
    }

    static AlignAboveRef(ref, objMargin, diffX = 0, diffY = 0, alignment = ALIGN_MIDDLE, ...args) {
        var centerX = ref.x + ref.width / 2 + diffX;
        var currentY = ref.y + diffY;

        for (var i = 0; i < args.length; i++) {
            args[i].y = currentY - objMargin - args[i].height;
            currentY = args[i].y;

            if (alignment == ALIGN_MIDDLE) {
                args[i].x = centerX - args[i].width / 2;
            }
            else if (alignment == ALIGN_LEFT) {
                args[i].x = centerX - ref.width / 2;
            }
            else if (alignment == ALIGN_RIGHT) {
                args[i].x = centerX + ref.width / 2 - args[i].width;
            }
        }
    }

    static AlignRightRef(ref, objMargin, diffX = 0, diffY = 0, alignment = ALIGN_MIDDLE, ...args) {
        var centerY = ref.y + ref.height / 2 + diffY;
        var currentX = ref.x + ref.width + objMargin + diffX;

        for (var i = 0; i < args.length; i++) {
            args[i].x = currentX;
            currentX += args[i].width + objMargin;

            if (alignment == ALIGN_MIDDLE) {
                args[i].y = centerY - args[i].height / 2;
            }
            else if (alignment == ALIGN_UP) {
                args[i].y = centerY - ref.height / 2;
            }
            else if (alignment == ALIGN_DOWN) {
                args[i].y = centerY + ref.height / 2 - args[i].height;
            }
        }
    }

    static AlignLeftRef(ref, objMargin, diffX = 0, diffY = 0, alignment = ALIGN_MIDDLE, ...args) {
        var centerY = ref.y + ref.height / 2 + diffY;
        var currentX = ref.x + diffX;

        for (var i = 0; i < args.length; i++) {
            args[i].x = currentX - objMargin - args[i].width;
            currentX = args[i].x;

            if (alignment == ALIGN_MIDDLE) {
                args[i].y = centerY - args[i].height / 2;
            }
            else if (alignment == ALIGN_UP) {
                args[i].y = centerY - ref.height / 2;
            }
            else if (alignment == ALIGN_DOWN) {
                args[i].y = centerY + ref.height / 2 - args[i].height;
            }
        }
    }
}
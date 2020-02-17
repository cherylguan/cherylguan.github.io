class Space {
    constructor() {
    }

    //Point
    static NormalizeVector(vector) {
        Validator.ValidateObject(vector, "NormalizeVector.vector", Point);

        var length = Space.GetVectorLength(vector);
        return new Point(vector.x / length, vector.y / length);
    }

    //float
    static GetVector(sourceX, sourceY, targetX, targetY) {
        return new Point(targetX - sourceX, targetY - sourceY);
    }

    //point
    static GetDifVector(source, target) {
        return new Point(target.x - source.x, target.y - source.y);
    }

    //Point
    static GetVectorLength(vector) {
        Validator.ValidateObject(vector, "GetVectorLength.vector", Point);

        var length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
        return length;
    }

    //p1, p2: Point, dist: same unit as p
    static AreNear(p1, p2, dist = 10) {
        var vector = new Point(p2.x - p1.x, p2.y - p1.y);
        var length = Space.GetVectorLength(vector);
        return length < dist;
    }

    static IsPointOnRect(point, rectCenter, rectWidth, rectHeight) {
        Validator.ValidateObject(point, "IsPointOnRect.point", Point);
        Validator.ValidateObject(rectCenter, "IsPointOnRect.rectCenter", Point);

        var rectUpperLeft = new Point(rectCenter.x - rectWidth / 2, rectCenter.y + rectHeight / 2);
        var rectLowerRight = new Point(rectCenter.x + rectWidth / 2, rectCenter.y - rectHeight / 2);

        return point.x <= rectLowerRight.x
            && point.x >= rectUpperLeft.x
            && point.y <= rectUpperLeft.y
            && point.y >= rectLowerRight.y;
    }

    // vector Point from 0,0, y+ is up, CCW radians around 0,0
    static RotateVectorCCW(vector, radians) {
        Validator.ValidateObject(vector, "RotateVectorCW.vector", Point);
        Validator.ValidateNumber(radians, "RotateVectorCW.radians");
        var cs = Math.cos(radians);
        var sn = Math.sin(radians);

        var px = vector.x * cs - vector.y * sn;
        var py = vector.x * sn + vector.y * cs;

        return new Point(px, py);
    }

    // CCW from right, world coords y+ is up
    static GetCCWRadiansFromRight(vector) {

        var angle = Math.atan2(vector.x, vector.y);

        if (angle < 0) {
            angle += 2 * Math.PI;
        }

        return angle;
    }

    // CCW from up, world coords y+ is up
    static GetCCWRadiansFromUp(vector) {
        if (vector.x == 0 && vector.y == 0) {
            vector = new Point(0, 1);
        }

        var ccwFromRight = Space.GetCCWRadiansFromRight(vector);
        var ccwFromUp = ccwFromRight - Math.PI / 2;
        if (ccwFromUp < 0) {
            ccwFromUp += 2 * Math.PI;
        }

        return ccwFromUp;
    }

    static NormalizeAngle(a) {
        var q = Math.floor(a / (2 * Math.PI));
        if (a < 0) {
            q--;
        }
        return a - (q * 2 * Math.PI);
    }

    // doesn't work
    //static GetAngleBetweenVectors(a, b) {
    //    TraceDebug(a, b);
    //    var cs = (a.x * b.x + a.y * b.y) / (Space.GetVectorLength(a) * Space.GetVectorLength(b));
    //    TraceDebug(cs);
    //    return Math.acos(cs);
    //}
}
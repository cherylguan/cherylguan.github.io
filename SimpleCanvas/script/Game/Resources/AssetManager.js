const IMG_LOADING = "Loading";
const IMG_NOTFOUND = "NotFound";
const IMG_ARROWUP = "ArrowUp";
const IMG_PLUS = "Plus";
const IMG_MINUS = "Minus";
const IMG_X = "X";

class AssetManager {
    constructor(gameController) {
        TraceInfo("AssetManager.ctor");
        Validator.ValidateObject(gameController, "MessageHandlerFactory.ctor.gameController", GameController);
        this.gameController = gameController;

        this.bitmaps = {};
        this.loadingImgCount = 0;
    }

    static LoadCompleteEventName() {
        return "LoadComplete";
    }

    Initialize() {
        TraceInfo("AssetManager.Initialize");
        var iconWidth = 50;
        var iconHeight = 50;

        this.LoadImage(IMG_NOTFOUND, "content/notfound200.png", iconWidth, iconHeight);
    }

    LoadImage(name, src, width, height) {
        Validator.ValidateString(name, "AssetManager.LoadImage.name");

        var img = new Image();
        img.style = `width:${width}px;height:${height}px;`
        var localAssetManager = this;
        img.onload = function () {
            var bitmap = CanvasBitmap.FromImage(width, height, img);
            localAssetManager.bitmaps[name] = bitmap;
            localAssetManager.loadingImgCount--;
            TraceInfo("Image loaded: " + name + " Remaining: " + localAssetManager.loadingImgCount);
            if (localAssetManager.loadingImgCount === 0) {
                TraceInfo("All images loaded. Dispatching event...");
                var event = new CustomEvent(AssetManager.LoadCompleteEventName());
                localAssetManager.gameController.eventHub.dispatchEvent(event);
            }
        }
        img.onerror = function () {
            TraceInfo("Image loading error: " + name);
        }
        this.bitmaps[name] = IMG_LOADING;
        this.loadingImgCount++;
        img.src = src;
    }

    GetOriginalBitmap(name) {
        var bitmap = this.bitmaps[name];
        if (!bitmap) {
            if (IMG_PLUS.toLowerCase() === name.toLowerCase()) {
                bitmap = PolyBitmap.FromSpriteData(PlusImg.GetSpriteData());
            }
            else if (IMG_MINUS.toLowerCase() === name.toLowerCase()) {
                bitmap = PolyBitmap.FromSpriteData(MinusImg.GetSpriteData());
            }
            else if (IMG_ARROWUP.toLowerCase() === name.toLowerCase()) {
                bitmap = PolyBitmap.FromSpriteData(ArrowImg.GetSpriteData());
            }
            else if (IMG_X.toLowerCase() === name.toLowerCase()) {
                bitmap = PolyBitmap.FromSpriteData(XImg.GetSpriteData());
            }
        }

        if (!bitmap) {
            throw "Image not found: " + name;
        }

        if (bitmap === IMG_LOADING) {
            throw "Image not loaded: " + name;
        }

        return bitmap;
    }

    // target must be CanvasBitmap, probably image
    GetRefBitmap(name, width, height) {
        Validator.ValidateString(name, "AssetManager.GetRefBitmap.name");
        Validator.ValidateNumber(width, "AssetManager.GetRefBitmap.width");
        Validator.ValidateNumber(height, "AssetManager.GetRefBitmap.height");

        var bitmap = this.GetOriginalBitmap(name);

        var ref = new RefBitmap(width, height, bitmap);
        return ref;
    }

    IsCached(name, width, height) {
        var cacheName = AssetManager.GetCacheName(name, width, height);
        var cachedBitmap = this.bitmaps[cacheName];
        return cachedBitmap ? true : false;
    }

    CacheBitmap(name, bitmap) {
        Validator.ValidateString(name, "AssetManager.CacheBitmap.name");
        Validator.ValidateValue(bitmap, "AssetManager.CacheBitmap.bitmap");
        var cacheName = AssetManager.GetCacheName(name, bitmap.width, bitmap.height);
        this.bitmaps[cacheName] = bitmap;
    }

    static GetCacheName(name, width, height) {
        Validator.ValidateString(name, "AssetManager.GetCacheName.name");
        Validator.ValidateNumber(width, "AssetManager.GetCacheName.width");
        Validator.ValidateNumber(height, "AssetManager.GetCacheName.height");

        return name + "#" + width + "#" + height;
    }

    GetCachedBitmap(name, width, height) {
        var cacheName = AssetManager.GetCacheName(name, width, height);
        var cachedBitmap = this.bitmaps[cacheName];
        if (cachedBitmap) {
            return cachedBitmap;
        }
        else {
            var bitmap = this.GetOriginalBitmap(name);
            var clone = bitmap.Clone(width, height);
            this.bitmaps[cacheName] = clone;
            return clone;
        }
    }

    GetClonedBitmap(name, width, height) {
        Validator.ValidateString(name, "AssetManager.GetClonedBitmap.name");
        Validator.ValidateNumber(width, "AssetManager.GetClonedBitmap.width");
        Validator.ValidateNumber(height, "AssetManager.GetClonedBitmap.height");

        var bitmap = this.GetOriginalBitmap(name);

        var clone = bitmap.Clone(width, height);
        return clone;
    }

    GetClonedImage(name, width, height) {
        return this.GetClonedBitmap(name, width, height).canvas;
    }

    GetCroppedBitmap(name, x, y, width, height) {
        Validator.ValidateString(name, "AssetManager.GetCroppedBitmap.name");
        Validator.ValidateNumber(x, "AssetManager.GetCroppedBitmap.x");
        Validator.ValidateNumber(y, "AssetManager.GetCroppedBitmap.y");
        Validator.ValidateNumber(width, "AssetManager.GetCroppedBitmap.width");
        Validator.ValidateNumber(height, "AssetManager.GetCroppedBitmap.height");

        var bitmap = this.GetOriginalBitmap(name);

        var cropped = bitmap.Crop(x, y, width, height);
        return cropped;
    }
}
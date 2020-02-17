class CraftUI {
    constructor(
        gameController,
        sprite) {
        TraceInfo("CraftUI.ctor");

        Validator.ValidateObject(gameController, "CraftUI.ctor.gameController", GameController);
        Validator.ValidateObject(sprite, "CraftUI.ctor.sprite", Sprite);

        this.gameController = gameController;
        this.sprite = sprite;

        this.SetPartSize(30, 30);

        this.Initialize();
    }

    SetPartSize(width, height) {
        if (width < 10) {
            this.gameController.uiController.WriteToConsole("Min width reached!");
            return;
        }

        if (width > 100) {
            this.gameController.uiController.WriteToConsole("Max width reached!");
            return;
        }

        if (height < 10) {
            this.gameController.uiController.WriteToConsole("Min height reached!");
            return;
        }

        if (height > 100) {
            this.gameController.uiController.WriteToConsole("Max height reached!");
            return;
        }

        this.partWidth = width;
        this.partHeight = height;
        this.sizeChanged = true;
    }

    InitializeCanvasSprite() {
        var canvasWidth;
        var canvasHeight;
        if (this.partWidth > this.partHeight) {
            canvasWidth = this.canvasContainer.width;
            canvasHeight = canvasWidth * this.partHeight / this.partWidth;
            this.unit = canvasWidth / this.partWidth;
        }
        else {
            canvasHeight = this.canvasContainer.width;
            canvasWidth = canvasHeight * this.partWidth / this.partHeight;
            this.unit = canvasHeight / this.partHeight;
        }

        this.canvasSprite = new Sprite(new EmptyBitmap(canvasWidth, canvasHeight));

        this.canvasContainer.DisposeSpriteChildren();
        this.canvasContainer.AddChild(this.canvasSprite);

        var localSelf = this;
        this.canvasSprite.OnClick = (event) => { localSelf.OnCanvasClick(event); };
        this.canvasBgSprite = new Sprite(new FillRectBitmap(canvasWidth, canvasHeight, Color.GetRGBString(250, 250, 250)));
        this.canvasBgSprite.hitBox = false;
        this.canvasSprite.AddChild(this.canvasBgSprite);

        this.drawingPolyBitmap = new PolyBitmap(
            SPRITE_FILL,
            this.canvasSprite.width,
            this.canvasSprite.height,
            Color.FromRandom(),
            new Array(),
            5);

        this.drawingPolySprite = new Sprite(this.drawingPolyBitmap);
        this.drawingPolySprite.hitBox = false;
        this.canvasSprite.AddChild(this.drawingPolySprite);

        var meshCanvas = CanvasUtil.CreateCanvas(canvasWidth, canvasHeight);
        var context = CanvasUtil.GetContext(meshCanvas);
        context.lineWidth = 1;
        var lightColor = Color.GetRGBString(1, 255, 1);
        var darkColor = Color.GetRGBString(1, 100, 1);

        var startY = 0;
        var endY = canvasHeight;
        var i;
        for (i = 0; i <= this.partWidth; i++) {
            var x = i * this.unit;
            context.strokeStyle = i % 10 == 0 ? darkColor : lightColor;
            context.beginPath();
            context.moveTo(x, startY);
            context.lineTo(x, endY);
            context.stroke();
        }

        var startX = 0;
        var endX = canvasWidth;
        for (i = 0; i <= this.partHeight; i++) {
            var y = i * this.unit;
            context.strokeStyle = i % 10 == 0 ? darkColor : lightColor;
            context.beginPath();
            context.moveTo(startX, y);
            context.lineTo(endX, y);
            context.stroke();
        }

        this.meshSprite = new Sprite(new CanvasBitmap(meshCanvas));
        this.meshSprite.hitBox = false;
        this.canvasSprite.AddChild(this.meshSprite);

        this.drawHereText = new TextUI(
            this.gameController,
            "Draw Here",
            this.canvasSprite.width / 2,
            50,
            "30px Arial",
            Color.GetRGBString(1, 1, 1),
            ALIGN_MIDDLE,
            ALIGN_MIDDLE);

        Alignment.AlignObjectsXRef(
            this.canvasSprite,
            BUTTON_MARGIN, 0, 0,
            ALIGN_MIDDLE,
            this.drawHereText.sprite);

        this.canvasSprite.AddChild(this.drawHereText.sprite);

        this.startPoint = new Sprite(new FillRectBitmap(5, 5, Color.GetRGBString(1, 1, 250)));
        this.startPoint.hitBox = false;
        this.canvasSprite.AddChild(this.startPoint);

        this.previewSprite.SetBitmap(new EmptyBitmap(this.partWidth, this.partHeight));
        this.previewBgSprite = new Sprite(new FillRectBitmap(this.partWidth, this.partHeight, Color.GetRGBString(250, 250, 250)));
        this.previewSprite.DisposeSpriteChildren();
        this.previewSprite.AddChild(this.previewBgSprite);
        this.previewPolyBitmap = new PolyBitmap(
            SPRITE_FILL,
            this.partWidth,
            this.partHeight,
            new Color(250, 1, 1),
            new Array(),
            2);

        this.previewPolySprite = new Sprite(this.previewPolyBitmap);
        this.previewSprite.AddChild(this.previewPolySprite);

        Alignment.AlignBelowRef(this.canvasContainer, BUTTON_MARGIN, 0, -this.previewSprite.height - this.margin, ALIGN_MIDDLE, this.previewSprite);

        this.exportCanvas = CanvasUtil.CreateCanvas(this.partWidth, this.partHeight);

        this.sizeChanged = false;
    }

    Initialize() {
        TraceInfo("CraftUI.Initialize");
        var localSelf = this;

        //this.bgBitmap = this.gameController.assetManager.GetRefBitmap(IMG_METAL, this.sprite.width, this.sprite.height);
        this.bgBitmap = new FillRectBitmap(this.sprite.width, this.sprite.height, PANEL_COLOR);
        this.bgSprite = new Sprite(this.bgBitmap);
        this.sprite.AddChild(this.bgSprite);

        this.bgFrameBitmap = new StrokeRectBitmap(this.bgSprite.width, this.bgSprite.height, 3, INPUT_FRAME_COLOR);
        this.bgFrameSprite = new Sprite(this.bgFrameBitmap);
        this.bgFrameSprite.hitBox = false;
        this.bgSprite.AddChild(this.bgFrameSprite);

        this.closeIcon = new CloseIconUI(this.gameController, () => { localSelf.Hide(); });
        this.closeIcon.sprite.x = this.sprite.width - this.closeIcon.size;
        this.closeIcon.sprite.y = 0;
        this.sprite.AddChild(this.closeIcon.sprite);

        this.margin = Math.min(this.sprite.width, this.sprite.height) / 40;
        var canvasContainerWidth = 28 * this.margin;
        var canvasContainerHeight = 36 * this.margin;
        this.canvasContainer = new Sprite(new EmptyBitmap(canvasContainerWidth, canvasContainerHeight));
        this.canvasContainer.x = 2 * this.margin;
        this.canvasContainer.y = 2 * this.margin;
        this.sprite.AddChild(this.canvasContainer);

        this.coreSprite = new Sprite(new EmptyBitmap(BUTTON_WIDTH, canvasContainerHeight));
        var iconSize = 10;

        // Width
        this.widthAdjuster = this.CreateAdjuster(
            "Width:",
            () => { localSelf.SetPartSize(localSelf.partWidth - 5, localSelf.partHeight); },
            () => { localSelf.SetPartSize(localSelf.partWidth + 5, localSelf.partHeight); });
        this.coreSprite.AddChild(this.widthAdjuster.sprite);

        // Height
        this.heightAdjuster = this.CreateAdjuster(
            "Height:",
            () => { localSelf.SetPartSize(localSelf.partWidth, localSelf.partHeight - 5); },
            () => { localSelf.SetPartSize(localSelf.partWidth, localSelf.partHeight + 5); });
        this.coreSprite.AddChild(this.heightAdjuster.sprite);

        // Red
        this.redAdjuster = this.CreateAdjuster(
            "Red:",
            () => { if (this.drawingPolyBitmap.color.colorR >= 5) { this.drawingPolyBitmap.color.colorR -= 5; } },
            () => { if (this.drawingPolyBitmap.color.colorR <= 250) { this.drawingPolyBitmap.color.colorR += 5; } });
        this.coreSprite.AddChild(this.redAdjuster.sprite);

        // Green
        this.greenAdjuster = this.CreateAdjuster(
            "Green:",
            () => { if (this.drawingPolyBitmap.color.colorG >= 5) { this.drawingPolyBitmap.color.colorG -= 5; } },
            () => { if (this.drawingPolyBitmap.color.colorG <= 250) { this.drawingPolyBitmap.color.colorG += 5; } });
        this.coreSprite.AddChild(this.greenAdjuster.sprite);

        // Blue
        this.blueAdjuster = this.CreateAdjuster(
            "Blue:",
            () => { if (this.drawingPolyBitmap.color.colorB >= 5) { this.drawingPolyBitmap.color.colorB -= 5; } },
            () => { if (this.drawingPolyBitmap.color.colorB <= 250) { this.drawingPolyBitmap.color.colorB += 5; } });
        this.coreSprite.AddChild(this.blueAdjuster.sprite);

        this.undoButton = new ButtonUI(this.gameController, () => { localSelf.OnUndoButtonClick(); }, "UNDO");
        this.coreSprite.AddChild(this.undoButton.sprite);
        this.clearButton = new ButtonUI(this.gameController, () => { localSelf.OnClearButtonClick(); }, "CLEAR");
        this.coreSprite.AddChild(this.clearButton.sprite);
        this.randomButton = new ButtonUI(this.gameController, () => { localSelf.OnRandomButtonClick(); }, "RANDOM");
        this.coreSprite.AddChild(this.randomButton.sprite);
        this.exportButton = new ButtonUI(this.gameController, () => { localSelf.OnExportButtonClick(); }, "EXPORT");
        this.coreSprite.AddChild(this.exportButton.sprite);
        this.importButton = new ButtonUI(this.gameController, () => { localSelf.OnImportButtonClick(); }, "IMPORT");
        this.coreSprite.AddChild(this.importButton.sprite);
        this.previewButton = new ButtonUI(this.gameController, () => { localSelf.OnDownloadButtonClick(); }, "PREVIEW");
        this.coreSprite.AddChild(this.previewButton.sprite);
        this.previewSprite = new Sprite();
        this.sprite.AddChild(this.previewSprite);

        Alignment.AlignObjectsYRef(
            this.coreSprite,
            BUTTON_MARGIN, 0, 0,
            ALIGN_MIDDLE,
            this.widthAdjuster.sprite,
            this.heightAdjuster.sprite,
            this.redAdjuster.sprite,
            this.greenAdjuster.sprite,
            this.blueAdjuster.sprite,
            this.undoButton.sprite,
            this.clearButton.sprite,
            this.randomButton.sprite,
            this.exportButton.sprite,
            this.importButton.sprite,
            this.previewButton.sprite);

        this.coreSprite.x = this.sprite.width - this.coreSprite.width - 2 * this.margin;
        this.coreSprite.y = 2 * this.margin;
        //Alignment.AlignRightRef(
        //    this.canvasContainer,
        //    1.5 * this.margin, 0, 0,
        //    ALIGN_MIDDLE,
        //    this.coreSprite);

        this.sprite.AddChild(this.coreSprite);

        this.InitializeCanvasSprite();

        this.Hide();
    }

    CreateAdjuster(initialText, onMinusClick, onPlusClick) {
        var adjuster = new AdjusterUI(
            this.gameController,
            BUTTON_WIDTH * 6 / 5,
            BUTTON_HEIGHT,
            onMinusClick,
            onPlusClick,
            12);

        adjuster.labelText.text = initialText;
        adjuster.labelText.font = "12px Consolas";
        adjuster.labelText.colorRGB = BUTTON_LABEL_COLOR;
        adjuster.labelText.UpdateBitmap();

        return adjuster;
    }

    OnCanvasClick(event) {
        TraceInfo("CraftUI.OnCanvasClick");

        var mousePos = new Point(event.canvasX, event.canvasY);
        var viewPos = this.canvasSprite.GetPosition();
        var localX = mousePos.x - viewPos.x;
        var localY = mousePos.y - viewPos.y;

        var unitsX = Math.floor(localX / this.unit) + 0.5;
        var unitsY = Math.floor(localY / this.unit) + 0.5;

        var midX = unitsX * this.unit;
        var midY = unitsY * this.unit;

        var point = new Point(midX, midY);
        this.drawingPolyBitmap.points.push(point);
    }

    OnUndoButtonClick() {
        TraceInfo("CraftUI.OnUndoButtonClick");

        this.UndoCanvas()
    }

    OnClearButtonClick() {
        TraceInfo("CraftUI.OnClearButtonClick");

        this.ClearCanvas();
    }

    OnRandomButtonClick() {
        TraceInfo("CraftUI.OnRandomButtonClick");

        this.drawingPolyBitmap.color = Color.FromRandom();
    }

    OnExportButtonClick() {
        TraceInfo("CraftUI.OnExportButtonClick");

        if (this.drawingPolyBitmap.points.length < 3) {
            this.gameController.uiController.WriteToConsole("At least 3 points required to craft!");
            return;
        }

        var spriteData = this.GetSpriteData();
        var spriteJson = JSUtil.Stringify(spriteData);
        prompt("Copy to clipboard: Ctrl+C", spriteJson);
    }

    OnDownloadButtonClick() {
        TraceInfo("CraftUI.OnDownloadButtonClick");

        var ctx = CanvasUtil.GetContext(this.exportCanvas);
        ctx.clearRect(0, 0, this.exportCanvas.width, this.exportCanvas.height);
        this.previewPolySprite.DrawOnContext(CanvasUtil.GetContext(this.exportCanvas));

        var w = window.open('about:blank', 'image from canvas');
        w.document.write("<img src='" + this.exportCanvas.toDataURL("image/png") + "' alt='from canvas'/>");
    }

    OnImportButtonClick() {
        TraceInfo("CraftUI.OnImportButtonClick");

        var str = prompt("Enter data:");
        try {
            var spriteData = JSUtil.Parse(str);
            var bitmap = PolyBitmap.FromSpriteData(spriteData);
            this.partWidth = bitmap.width;
            this.partHeight = bitmap.height;
            this.InitializeCanvasSprite();
            this.drawingPolyBitmap.color = bitmap.color;
            this.drawingPolyBitmap.points = [];
            bitmap.points.forEach((p) => {
                this.drawingPolyBitmap.points.push(new Point(p.x * this.unit, p.y * this.unit));
            });
        }
        catch (e) {
            this.gameController.uiController.WriteToConsole("Invalid data!");
        }
    }

    GetSpriteData() {
        TraceInfo("CraftUI.GetSpriteData");

        var points = [];
        this.previewPolyBitmap.points.forEach((p) => {
            points.push({ X: p.x, Y: p.y });
        });

        var spriteData = {
            SpriteType: this.previewPolyBitmap.spriteType,
            Color: { R: this.previewPolyBitmap.color.colorR, G: this.previewPolyBitmap.color.colorG, B: this.previewPolyBitmap.color.colorB },
            X: 0,
            Y: 0,
            Width: this.previewPolyBitmap.width,
            Height: this.previewPolyBitmap.height,
            LineWidth: this.previewPolyBitmap.lineWidth,
            Alpha: 1,
            RotationCW: 0,
            Points: points
        };

        return spriteData;
    }

    Update() {
        if (!this.sprite.visible || !this.drawingPolyBitmap) {
            return;
        }

        if (this.sizeChanged) {
            this.InitializeCanvasSprite();
        }

        if (this.drawingPolyBitmap.points.length === 0) {
            this.drawHereText.sprite.SetVisibleRecursive(true);
        }
        else {
            this.drawHereText.sprite.SetVisibleRecursive(false);
        }

        if (this.drawingPolyBitmap.points.length >= 1) {
            var p = this.drawingPolyBitmap.points[0];
            this.startPoint.x = p.x;
            this.startPoint.y = p.y;
            this.startPoint.SetVisibleRecursive(true);
        }
        else {
            this.startPoint.SetVisibleRecursive(false);
        }

        if (this.drawingPolyBitmap.points.length === 2) {
            this.drawingPolyBitmap.spriteType = SPRITE_STROKE;
        }
        else {
            this.drawingPolyBitmap.spriteType = SPRITE_FILL;
        }

        this.previewPolyBitmap.spriteType = this.drawingPolyBitmap.spriteType;
        this.previewPolyBitmap.color = this.drawingPolyBitmap.color;
        this.previewPolyBitmap.lineWidth = this.drawingPolyBitmap.lineWidth;
        this.previewPolyBitmap.points = [];
        var i;
        for (i = 0; i < this.drawingPolyBitmap.points.length; i++) {
            var p = this.drawingPolyBitmap.points[i];
            var worldX = p.x / this.unit;
            var worldY = p.y / this.unit;
            var worldPoint = new Point(worldX, worldY);
            this.previewPolyBitmap.points.push(worldPoint);
        }

        this.widthAdjuster.labelText.text = "Width: " + this.partWidth;
        this.widthAdjuster.labelText.UpdateBitmap();
        this.heightAdjuster.labelText.text = "Height: " + this.partHeight;
        this.heightAdjuster.labelText.UpdateBitmap();
        this.redAdjuster.labelText.text = "Red: " + this.drawingPolyBitmap.color.colorR;
        this.redAdjuster.labelText.UpdateBitmap();
        this.greenAdjuster.labelText.text = "Green: " + this.drawingPolyBitmap.color.colorG;
        this.greenAdjuster.labelText.UpdateBitmap();
        this.blueAdjuster.labelText.text = "Blue: " + this.drawingPolyBitmap.color.colorB;
        this.blueAdjuster.labelText.UpdateBitmap();
    }

    ClearCanvas() {
        this.drawingPolyBitmap.points = new Array();
    }

    UndoCanvas() {
        if (this.drawingPolyBitmap.points.length > 0) {
            this.drawingPolyBitmap.points.pop();
        }
    }

    Toggle() {
        if (this.sprite.visible) {
            this.Hide();
        }
        else {
            this.Display();
        }
    }

    Display() {
        this.sprite.SetVisibleRecursive(true);
        this.sprite.hitBox = true;
        this.canvasSprite.hitBox = true;
        this.undoButton.sprite.hitBox = true;
        this.clearButton.sprite.hitBox = true;
        this.randomButton.sprite.hitBox = true;
        this.exportButton.sprite.hitBox = true;
        this.importButton.sprite.hitBox = true;
        this.previewButton.sprite.hitBox = true;
        this.widthAdjuster.minusSprite.hitBox = true;
        this.widthAdjuster.plusSprite.hitBox = true;
        this.heightAdjuster.minusSprite.hitBox = true;
        this.heightAdjuster.plusSprite.hitBox = true;
        this.redAdjuster.minusSprite.hitBox = true;
        this.redAdjuster.plusSprite.hitBox = true;
        this.greenAdjuster.minusSprite.hitBox = true;
        this.greenAdjuster.plusSprite.hitBox = true;
        this.blueAdjuster.minusSprite.hitBox = true;
        this.blueAdjuster.plusSprite.hitBox = true;
        this.closeIcon.sprite.hitBox = true;
    }

    Hide() {
        this.sprite.SetVisibleRecursive(false);
        this.sprite.SetHitBoxRecursive(false);
    }
}
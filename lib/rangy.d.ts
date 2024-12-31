declare module '@brainly/rangy' {
    export interface RangyStatic {
        init(): void;
        createRange(): RangyRange;
        getSelection(win?: Window): RangySelection;

        modules: Record<string, RangyModule>;
        supported: boolean;

        createHighlighter(classApplierModule?: string): RangyHighlighter;
        createClassApplier(
            className: string,
            options?: ClassApplierOptions,
            tagNames?: string | string[]
        ): RangyClassApplier;
    }

    export interface RangyModule {
        initialized: boolean;
        supported: boolean;
    }

    export interface RangyRange {
        startContainer: Node;
        startOffset: number;
        endContainer: Node;
        endOffset: number;
        collapsed: boolean;
        commonAncestorContainer: Node;

        setStart(node: Node, offset: number): void;
        setEnd(node: Node, offset: number): void;
        setStartAndEnd(startNode: Node, startOffset: number, endNode: Node, endOffset: number): void;

        selectNode(node: Node): void;
        selectNodeContents(node: Node): void;
        collapse(toStart: boolean): void;

        deleteContents(): void;
        extractContents(): DocumentFragment;
        cloneContents(): DocumentFragment;
        insertNode(node: Node): void;
        surroundContents(node: Node): void;

        cloneRange(): RangyRange;
        detach(): void;

        isPointInRange(node: Node, offset: number): boolean;
        compareBoundaryPoints(how: number, sourceRange: RangyRange): number;
    }

    export interface RangySelection {
        rangeCount: number;
        isCollapsed: boolean;

        getRangeAt(index: number): RangyRange;
        addRange(range: RangyRange, preserveExisting?: boolean): void;
        removeRange(range: RangyRange): void;
        removeAllRanges(): void;
        collapse(node: Node, offset: number): void;

        toString(): string;
    }

    export interface RangyHighlighter {
        addClassApplier(classApplier: RangyClassApplier): void;
        removeClassApplier(classApplier: RangyClassApplier): void;
        highlightSelection(className: string, options?: HighlightOptions): Highlight[];
        unhighlightSelection(className?: string): void;
        getHighlights(): Highlight[];
        removeHighlights(highlights: Highlight[]): void;
        removeAllHighlights(): void;
        deserialize(serializedHighlights: string): Highlight[];
        serialize(): string;
        getHighlightForElement(element: GlobalEventHandlers): Highlight | null;
    }

    export interface RangyClassApplier {
        toggleClass(range: RangyRange): void;
        applyToRange(range: RangyRange): void;
        removeFromRange(range: RangyRange): void;
        isAppliedToRange(range: RangyRange): boolean;
        applyToSelection(win?: Window): void;
        removeFromSelection(win?: Window): void;
        isAppliedToSelection(win?: Window): boolean;
        undoToRange(range: RangyRange): void;
        redoToRange(range: RangyRange): void;
    }

    export interface ClassApplierOptions {
        elementTagName?: string; // Default: "span"
        elementProperties?: Partial<Omit<HTMLElement, 'style'>> & {
            style?: Partial<CSSStyleDeclaration>;
        }; // Default: {}
        elementAttributes?: Record<string, string>;
        useExistingElements?: boolean; // Default: false
        ignoreWhiteSpace?: boolean; // Default: true
        applyToEditableOnly?: boolean; // Default: false
        normalize?: boolean; // Default: true
        onElementCreate?: (element: HTMLElement, className: string, range: RangyRange) => void;
    }

    export interface CharacterRange {
        start: number;
        end: number;
    }

    export interface Highlight {
        id: string;
        className: string;
        containerElementId: string;
        range: RangyRange;
        characterRange: CharacterRange;
        getText: () => string;  
        toString(): string;
    }

    export interface HighlightOptions {
        containerElementId?: string;
        exclusive?: boolean; // Prevent overlapping highlights of the same class
    }

    const rangy: RangyStatic;
    export default rangy;
}

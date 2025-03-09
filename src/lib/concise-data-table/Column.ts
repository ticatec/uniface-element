export default interface Column {
    // Display title for column header
    title: string;
    // Field name in data object
    field: string;
    // Width in pixels
    width: number;
    // Alignment: "left", "center", "right"
    align?: "left" | "center" | "right",
    // Flex weight: 0 = fixed width, >0 = proportional scaling
    weight?: number;
    // Optional formatter function
    formatter?: (value: any) => string
    // use html instead of text when display formatter result
    escapeHTML?: boolean;
}
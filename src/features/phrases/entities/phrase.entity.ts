export class Phrase {
    readonly id: number;
    readonly text: string;
    readonly color: string;
    readonly updatedAt: Date;
    static toJson(phrase: Phrase) {
        return {
            id: phrase.id,
            text: phrase.text,
            color: phrase.color,
            updatedAt: phrase.updatedAt,
        };
    }
}

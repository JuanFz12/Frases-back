export class Phrase {
    public readonly id: number;
    public readonly text: string;
    public readonly color: string;
    static toJson(phrase: Phrase) {
        return {
            id: phrase.id,
            text: phrase.text,
            color: phrase.color,
        };
    }
}

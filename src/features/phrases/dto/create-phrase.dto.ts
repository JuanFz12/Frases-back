import { IsNotEmpty, Matches, MaxLength } from "class-validator"

export class CreatePhraseDto {
    @IsNotEmpty()
    @MaxLength(1000)
    text: string;

    @IsNotEmpty()
    @MaxLength(30)
    @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: 'Color must be a valid HEX value like #FFF or #FF00AA'
    })
    color: string;
}

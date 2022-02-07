import { Pipe, PipeTransform } from "@angular/core";
import { LoremIpsum } from "lorem-ipsum";

@Pipe({ name: 'lorem' })
export class LoremPipe implements PipeTransform {

    transform(length: number): string {
        const lorem = new LoremIpsum({
            sentencesPerParagraph: {
                max: 8,
                min: 4
            },
            wordsPerSentence: {
                max: 8,
                min: 4
            }
        });
        return lorem.generateSentences(length);
    }
}
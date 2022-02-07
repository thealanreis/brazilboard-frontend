import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'random' })
export class RandomPipe implements PipeTransform {

    transform(max: number): string {
        let num = Math.floor(Math.random() * max);
        return num.toString()
    }
}
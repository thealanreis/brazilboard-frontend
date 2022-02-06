export function removeMultipleFromArray(list: Array<any>, small_list: Array<any>, property: string) {
    for (const [index, element] of list.entries()) {

        for (const [_, small_element] of small_list.entries()) {
            if (element[property] == small_element[property]) {
                list.splice(index, 1);
                break;
            }
        }
    }
}


export function removeFromArray(list: Array<any>, object: any, property: string) {
    for (const [index, element] of list.entries()) {
        if (element[property] == object[property]) {
            list.splice(index, 1);
            break;
        }
    }
}

export function sortArray(list: Array<any>) {
    list.sort(
        (a, b) => {
            if (a.username > b.username) return 1
            else if (a.username < b.username) return -1
            else return 0
        }
    );
}

export function findInArray(list: Array<any>, property: string, value: string) {
    for (const [index, element] of list.entries()) {
        if (element[property] == value) {
            return element
        }
    }
}